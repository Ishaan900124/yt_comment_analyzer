from flask import Flask,request,jsonify
from flask_cors import CORS
import googleapiclient.discovery
import pickle
import keras
import numpy as np
import re

app = Flask(__name__)
CORS(app)

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = "AIzaSyBCVfQu2wrFZ0g3PJFBxxUIJDo01X8b7GE"

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

sen_pred = keras.models.load_model('sentiment_prediction_model.keras')
with open("sentiment_tokenizer.pickle",'rb') as file:
    sen_token = pickle.load(file)

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


if __name__ == '__main__':
    app.run(port=5000,debug=True)