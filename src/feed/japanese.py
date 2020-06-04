import requests
from django.http import HttpResponse
from bs4 import BeautifulSoup
import json
import re
import MeCab
import jaconv
import spacy
from textblob import TextBlob
from janome.tokenizer import Tokenizer
from janome.analyzer import Analyzer
from janome.tokenfilter import *
from janome.charfilter import *
from pykakasi import kakasi
from django.views.decorators.csrf import csrf_exempt
import csv

text = "こんにちは、真剣勝負ですか？？元気ですよー。。あなたは相撲に勝って勝負に負ける？"

def to_hiragana(text):
    kakasi_ = kakasi()
    kakasi_.setMode('J', 'H')  
    conv = kakasi_.getConverter()
    hiragana = conv.do(text)
    return hiragana

def get_noun(text):
    tokenizer = Tokenizer()
    nouns = []
    token_filters = [POSKeepFilter(['名詞'])]
    a = Analyzer([], tokenizer, token_filters)
    for token in a.analyze(text):
        nouns.append(str(token).split('\t')[0])
    return nouns

    
idioms_dictionary = {} #{"for a while":"--", "for the first time": "--"}
def get_idiom_dictionary():
    with open('/Users/anna/Desktop/ja_idiom.csv') as f:
        reader = csv.reader(f)
        for row in reader:
            idioms_dictionary[row[0]] = row[3]
        return idioms_dictionary
#get_idiom_dictionary()


def get_idiom_key(tokens, nouns):
    #remove_items = {'A', 'B', 'C', 'D', '', '…', '~', 'do'}
    idioms_dictionary = get_idiom_dictionary()
    filtered_idioms = {}
    regex_keys = '|'.join(nouns)
    idiom_tokens_sets = {}
    for key in idioms_dictionary:
        key = re.sub('[\(.*\)]', '', key)
        m = re.search(r'%s' % regex_keys, key)
        if m: 
            filtered_idioms[key] = idioms_dictionary[key]
    for key in filtered_idioms:
        idiom_tokens_set = set(get_tokens(key))
        if idiom_tokens_set <= set(tokens) and idiom_tokens_set:
            idiom_tokens_sets[key] = idioms_dictionary[key]  
    return idiom_tokens_sets

def get_sentence(text):
    sentences = re.findall(r'[^？|！|。]*[？|！|。]*', text)
    sentences = [a for a in sentences if a != '']
    return sentences
    
def get_tra_sentence(text):
    sentence = ''
    sentence = str(TextBlob(text).translate(from_lang='ja', to='en'))
    
def create_sentence_content(tokens, p, s):
    t = 0
    sentence_html = ''
    sentence_list = []
    for token in tokens:
        sentence_html += create_sentence_html(token, p, s, t)
        sentence_list.append([token, ''])
        t += 1
    return [sentence_html, sentence_list]

def create_sentence_html(token, p, s, t):
    sentence_html = ''
    h = "<span id='t_{}_{}_{}' class='{}'>{}</span>".format(p, s, t, "clickable_token", token)
    sentence_html += h
    return sentence_html

def create_paragraph_html(sentence_html, p, s):
    paragraph_html = ''
    h = "<p id='s_{}_{}' class='mb-0'>{}</p>".format(p, s, sentence_html)
    paragraph_html += h
    return(paragraph_html)

def create_paragraphs_list(sentence_list):
    sentences_list = []
    sentences_list.append(sentence_list)
    return sentences_list

def create_paragraph_content(sentences, p):
    paragraph_list, tra_sentence, selected_idioms = [], [], []
    s = 0
    paragraph_html = ''
    for sentence in sentences:
        tra_sentence.append(str(TextBlob(sentence).translate(from_lang='ja', to='en')))
        tokens = get_tokens(sentence)
        nouns = get_noun(sentence)
        selected_idioms.append(get_idiom_key(tokens, nouns))
        sentence_content = create_sentence_content(tokens, p, s)
        sentence_html = sentence_content[0]
        paragraph_html += create_paragraph_html(sentence_html, p, s)
        sentence_list = sentence_content[1]
        paragraph_list += create_paragraphs_list(sentence_list)
        s += 1
    return [paragraph_html, paragraph_list, tra_sentence, selected_idioms]

def create_html(paragraph_html, p):
    html = ''
    h = "<div id='p_{}'>{}</p>".format(p, paragraph_html)
    html += h
    return(html)

@csrf_exempt 
def get_text_ja(request):
    if request.method == 'POST':
        if request.body:
            text = request.body.decode("utf-8") 
            html = ''
            paragraphs, all_sentences, paragraph_tra_sentence, paragraph_list, idioms = [], [], [], [], []
            paragraphs = re.split('\n\n+', text)
            p = 0
            for paragraph in paragraphs:
                sentences = get_sentence(paragraph)
                all_sentences.append(sentences)
                paragraph_content = create_paragraph_content(sentences, p)
                paragraph_html = paragraph_content[0]
                paragraph_list.append(paragraph_content[1])
                paragraph_tra_sentence.append(paragraph_content[2])
                idioms.append(paragraph_content[3])
                html += create_html(paragraph_html, p)
                p += 1
            result = [html, paragraph_list, all_sentences, paragraph_tra_sentence, idioms]
            return HttpResponse(json.dumps(result))
            
def get_tokens(sentence):
    t = Tokenizer()
    return t.tokenize(sentence, wakati=True)
