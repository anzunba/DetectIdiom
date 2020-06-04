import requests
from bs4 import BeautifulSoup
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from textblob import TextBlob
import json
from . import english, japanese
@csrf_exempt 
def get_news(request):
    if request.method == 'GET':
        url = "https://soranews24.com/"
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        elems = soup.find('div', {'id':'widget_realtimeranking'})        
        data = []
        
        for elem in elems.find_all('li'):
            link = elem.find('a').get('href')
            text = elem.getText()
            img = elem.find('img').get('src')
            data.append([link, text, img])
            print(type(data))
        return HttpResponse(json.dumps(data))

@csrf_exempt 
def get_text(request):
    if request.method == 'POST':
        if request.body:
            text = request.body.decode("utf-8") 
            text_lang = TextBlob(text).detect_language()
            if(text_lang == 'en'):
                result = english.get_text_en(text)
            elif(text_lang == 'ja'):
                result = japanese.get_text_ja(text)
            else:
                result = 'Failed to detect text language.'
            return HttpResponse(json.dumps(result))
