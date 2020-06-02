import requests
from bs4 import BeautifulSoup
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt 
def index(request):
    if request.method == 'GET':
        # WebサイトのURLを指定
        url = "https://soranews24.com/"

        # Requestsを利用してWebページを取得する
        r = requests.get(url)

        # BeautifulSoupを利用してWebページを解析する
        soup = BeautifulSoup(r.text, 'html.parser')

        # soup.find_allを利用して、ヘッドラインのタイトルを取得する
        elems = soup.find('div', {'id':'widget_realtimeranking'})
        #results = [[i for i in b.find_all('li')] for b in elems.find_all('ol')]
        
        data = []
        
        for elem in elems.find_all('li'):
            link = elem.find('a').get('href')
            text = elem.getText()
            img = elem.find('img').get('src')
            data.append([link, text, img])
            print("*****************")
            print(type(data))
        return HttpResponse(json.dumps(data))