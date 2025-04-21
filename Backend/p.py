import tensorflow as tf
import numpy as np
from transformers import BertTokenizer
import keras

sen_pred = keras.layers.TFSMLayer('./sentiment_model', call_endpoint='serving_default')
tokenizer = BertTokenizer.from_pretrained('bert-base-cased')

def prepare_data(input_text, tokenizer):
    token = tokenizer.encode_plus(
        input_text,
        max_length=256,
        truncation=True,
        padding='max_length',
        add_special_tokens=True,
        return_tensors='tf'
    )
    return {
        'input_ids': tf.cast(token.input_ids, tf.float64),
        'attention_mask': tf.cast(token.attention_mask, tf.float64)
    }

def make_prediction(model, processed_data, classes=['Negative', 'A bit negative', 'Neutral', 'A bit positive', 'Positive']):
    probs = model.predict(processed_data)[0]
    return classes[np.argmax(probs)]

input_text = input('Enter movie review here: ')
processed_data = prepare_data(input_text, tokenizer)
result = make_prediction(sen_pred, processed_data=processed_data)
print(f"Predicted Sentiment: {result}")