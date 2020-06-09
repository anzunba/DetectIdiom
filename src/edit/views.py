from django.shortcuts import render
#from .models import EnJa
from django.views.decorators.csrf import csrf_exempt
import ast
from django.http import HttpResponse
import json
# Create your views here.
# @csrf_exempt 
# def index(request):
#     if request.method == 'POST':
#         if request.body:
#             word = request.body.decode("utf-8") 
#             db_lookup = En_Ja.objects.filter(word=word)
#             return HttpResponse(json.dumps(db_lookup))
#         else:
#             return request.body
#     else:
#         request