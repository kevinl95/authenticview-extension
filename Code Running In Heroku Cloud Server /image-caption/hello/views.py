from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import urllib.request
import requests

import math

import tensorflow as tf

from im2txt import configuration
from im2txt import inference_wrapper
from im2txt.inference_utils import caption_generator
from im2txt.inference_utils import vocabulary


import json


from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting

import requests

# Create your views here.
def index(request):

    '''OLD_CHECKPOINT_FILE = "./tmp/model/model/train/model.ckpt-2000000"
    NEW_CHECKPOINT_FILE = "./tmp/model/model/train/model2.ckpt-2000000"
    vars_to_rename = {
    	"lstm/basic_lstm_cell/weights": "lstm/basic_lstm_cell/kernel",
    	"lstm/basic_lstm_cell/biases": "lstm/basic_lstm_cell/bias",
    }
    new_checkpoint_vars = {}
    reader = tf.train.NewCheckpointReader(OLD_CHECKPOINT_FILE)
    for old_name in reader.get_variable_to_shape_map():
    	if old_name in vars_to_rename:
    		new_name = vars_to_rename[old_name]
    	else:
    		new_name = old_name
    	new_checkpoint_vars[new_name] = tf.Variable(reader.get_tensor(old_name))

    init = tf.global_variables_initializer()
    saver = tf.train.Saver(new_checkpoint_vars)
    with tf.Session() as sess:
    	sess.run(init)
    	saver.save(sess, NEW_CHECKPOINT_FILE)'''

    class Model:
    	def __init__(self, model_path, vocab_path):
        	self.model_path = model_path
        	self.vocab_path = vocab_path
        	self.g = tf.Graph()
        	with self.g.as_default():
        		self.model = inference_wrapper.InferenceWrapper()
        		self.restore_fn = self.model.build_graph_from_config(configuration.ModelConfig(), model_path)
        	self.g.finalize()
        	self.vocab = vocabulary.Vocabulary(vocab_path)
        	self.generator = caption_generator.CaptionGenerator(self.model, self.vocab)
        	self.sess = tf.Session(graph=self.g)
        	self.restore_fn(self.sess)
        	return

    	def predict(self, imgurl):

    		results = []
    		headers = {"User-Agent": "Mozilla/5.0"}
    		try:
    			req = urllib.request.Request(imgurl, None, headers)
    			res = urllib.request.urlopen(req)
    			image = res.read()
    			image_decoded = tf.image.decode_image(image, channels=3)
    			image_jpg = tf.image.encode_jpeg(image_decoded)
    			with tf.Session():
    				image_jpg = image_jpg.eval()
    			indiv_result = []
    			captions = self.generator.beam_search(self.sess, image_jpg)
    			for i, caption in enumerate(captions):
    				sentence = [self.vocab.id_to_word(w) for w in caption.sentence[1:-1]]
    				sentence = " ".join(sentence)
    				prob = math.exp(caption.logprob)
    				indiv_result.append({
    					"prob": "%f" % prob,
    					"sentence": sentence
    				})
    			results.append({"url": imgurl, "captions": indiv_result})
    		except Exception as ex:
    			str_ex = str(ex)
    			truncated = str_ex[:75] + (str_ex[75:] and '...')
    			error_result = {
    				"prob": -1,
    				"sentence": "There was an error, unable to caption this image. stack trace: " + truncated
    				}
    			results.append({"url": imgurl, "captions": [error_result]})
    	
    		return results

    #CHECKPOINT_PATH = "./tmp/model/model/train/model.ckpt-2000000"
    CHECKPOINT_PATH = "./tmp/model/model/train/model2.ckpt-2000000"
    VOCAB_FILE = "im2txt/data/mscoco/word_counts.txt"

    # init model
    model = Model(CHECKPOINT_PATH, VOCAB_FILE)

    def make_response(code, body):
    	return {"statusCode": code, "body": json.dumps(body)}

    try:
    	result = model.predict(request.GET['imgsrc'])
    except Exception as ex:
    	error_response = {
    		'error_message': 'Unexpected Error',
    		'stack_trace': str(ex)
    	}
    	return HttpResponse(error_response)
    return HttpResponse(result)


'''def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})'''

