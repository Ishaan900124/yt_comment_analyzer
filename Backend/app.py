from flask import Flask,request,jsonify
from flask_cors import CORS
import googleapiclient.discovery
import pickle
import keras
import numpy as np
import re
import os
from dotenv import load_dotenv
import nltk
from nltk.corpus import stopwords
from nltk.stem.lancaster import LancasterStemmer
from transformers import pipeline
from googletrans import Translator

nltk.download('stopwords')
nltk.download('punkt')

summarizer=pipeline("summarization",model='t5-base',tokenizer='t5-base')
translator = Translator()
stop = stopwords.words('english')
stemmer = LancasterStemmer()

load_dotenv()
app = Flask(__name__)
CORS(app)

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY=os.getenv("YOUTUBE_API")

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

sen_pred = keras.models.load_model('sentiment_prediction_model.keras')
with open("sentiment_tokenizer.pickle",'rb') as file:
    sen_token = pickle.load(file)

emo_pred = keras.models.load_model('emotion_prediction_model.keras')
with open("emotion_tokenizer.pickle",'rb') as file:
    emo_token = pickle.load(file)

tox_pred = keras.models.load_model('toxicity_prediction_model.keras')
with open("toxicity_tokenizer.pickle",'rb') as file:
    tox_token = pickle.load(file)

def fetch_comments(video_id):
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=200
    )
    response = request.execute()
    comments = []
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']
        comments.append([
            comment['authorDisplayName'],
            comment['textDisplay']
        ])

    return comments

def predict_sentiment(review,model):
    review = re.sub(r'http\S+', '', review)
    review = re.sub(r'[^\w\s]', '', review)
    review = re.sub(r'\s+', ' ', review)
    review = re.sub(r'\d+', '', review)
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = ' '.join([word for word in review.split() if word not in (stop)])
    sequence = sen_token.texts_to_sequences([review])
    padded_sequence = keras.preprocessing.sequence.pad_sequences(sequence, maxlen=100, truncating='post')
    prediction = model.predict(padded_sequence)
    predicted_class = np.argmax(prediction)
    if predicted_class == 0:
        return 'negative'
    elif predicted_class == 1:
        return 'neutral'
    elif predicted_class == 2:
        return 'positive'
    
def predict_toxicity(review,model):
    review = re.sub(r'http\S+', '', review)
    review = re.sub(r'[^\w\s]', '', review)
    review = re.sub(r'\s+', ' ', review)
    review = re.sub(r'\d+', '', review)
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = ' '.join([word for word in review.split() if word not in (stop)])
    review = ' '.join([stemmer.stem(word) for word in review.split()])
    sequence = tox_token.texts_to_sequences([review])
    padded_sequence = keras.preprocessing.sequence.pad_sequences(sequence, maxlen=100, truncating='post')
    prediction = model.predict(padded_sequence)
    answer=[]
    a=['toxic','severe_toxic','obscene','threat','insult','identity_hate']
    for i in range(6):
        if prediction[0][i]>=0.4:
            answer.append(a[i])
    return answer

def predict_emotion(review,model):
    review = re.sub(r'http\S+', '', review)
    review = re.sub(r'[^\w\s]', '', review)
    review = re.sub(r'\s+', ' ', review)
    review = re.sub(r'\d+', '', review)
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = ' '.join([word for word in review.split() if word not in (stop)])
    sequence = emo_token.texts_to_sequences([review])
    padded_sequence = keras.preprocessing.sequence.pad_sequences(sequence, maxlen=100)
    prediction = model.predict(padded_sequence)
    predicted_class = np.argmax(prediction)
    if predicted_class == 0:
        return 'admiration'
    elif predicted_class == 1:
        return 'amusement'
    elif predicted_class == 2:
        return 'anger'
    elif predicted_class == 3:
        return 'annoyance'
    elif predicted_class == 4:
        return 'approval'
    elif predicted_class == 5:
        return 'caring'
    elif predicted_class == 6:
        return 'confusion'
    elif predicted_class == 7:
        return 'curiosity'
    elif predicted_class == 8:
        return 'desire'
    elif predicted_class == 9:
        return 'disappointment'
    elif predicted_class == 10:
        return 'disapproval'
    elif predicted_class == 11:
        return 'disgust'
    elif predicted_class == 12:
        return 'embarrassment'
    elif predicted_class == 13:
        return 'excitement'
    elif predicted_class == 14:
        return 'fear'
    elif predicted_class == 15:
        return 'gratitude'
    elif predicted_class == 16:
        return 'grief'
    elif predicted_class == 17:
        return 'joy'
    elif predicted_class == 18:
        return 'love'
    elif predicted_class == 19:
        return 'nervousness'
    elif predicted_class == 20:
        return 'optimism'
    elif predicted_class == 21:
        return 'pride'
    elif predicted_class == 22:
        return 'realization'
    elif predicted_class == 23:
        return 'relief'
    elif predicted_class == 24:
        return 'remorse'
    elif predicted_class == 25:
        return 'sadness'
    elif predicted_class == 26:
        return 'surprise'
    elif predicted_class == 27:
        return 'neutral'

@app.route('/get_comments', methods=['POST'])
def get_comments():
    try:
        data = request.get_json(force=True)
        video_id = data.get('videoId')
        comments = fetch_comments(video_id)
        result = [{'username': comment[0], 'comment': comment[1]} for comment in comments]
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/sentiment', methods=['POST'])
def sentiment_analysis():
    try:
        ret = []
        data = request.get_json(force=True)
        for item in data:
            sentiment = predict_sentiment(item['comment'], sen_pred)
            ret.append({'username': item['username'], 'comment': item['comment'], 'sentiment': sentiment})
        return jsonify(ret)

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/emotion', methods=['POST'])
def emotion_analysis():
    try:
        ret = []
        data = request.get_json(force=True)
        for item in data:
            emotion = predict_emotion(item['comment'], emo_pred)
            ret.append({'username': item['username'], 'comment': item['comment'], 'emotion': emotion})
        return jsonify(ret)

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/toxicity', methods=['POST'])
def toxicity_analysis():
    try:
        ret = []
        data = request.get_json(force=True)
        for item in data:
            toxic = predict_toxicity(item['comment'], tox_pred)
            if toxic == []:
                continue
            ret.append({'username': item['username'], 'comment': item['comment'], 'toxicity': toxic})
        return jsonify(ret)
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/summarization', methods=['POST'])
def text_summarization():
    try:
        ret = []
        comment = ""
        data = request.get_json(force=True)
        for item in data:
            review = item['comment']
            review = re.sub(r'http\S+', '', review)
            review = re.sub(r'[^\w\s]', '', review)
            review = re.sub(r'\s+', ' ', review)
            review = re.sub(r'\d+', '', review)
            review = re.sub(r'[^a-zA-Z\s]', '', review)
            review = review.lower()
            comment = comment + review
        
        summary = summarizer(comment,max_length=300,min_length=10,do_sample=False)
        ret.append(summary[0]['summary_text'])
        return jsonify(ret)

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(port=5000,debug=True)