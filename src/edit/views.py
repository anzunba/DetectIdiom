from django.shortcuts import render
#from .models import EnJa
from django.views.decorators.csrf import csrf_exempt
import ast
from django.http import HttpResponse
import json
from textblob import TextBlob
# Create your views here.
@csrf_exempt 
def get_tokens(request):
    if request.method == 'POST':
        if request.body:
            sentence = request.body.decode("utf-8") 
            tokens = TextBlob(sentence).tokens
            return HttpResponse(json.dumps(tokens))