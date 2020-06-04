from textblob import TextBlob
from django.http import HttpResponse, HttpResponseRedirect
import json
import re
import csv
import ast
import nltk
from nltk.stem import WordNetLemmatizer 
from nltk.corpus import wordnet
# from .models import Word_Dictionary, Language, Article, Sentence, Word
import collections
from django.views.decorators.csrf import csrf_exempt

one_word_group = {"got":"ta", "I": "'m"}

pre_cur_tokens = []
def one_word_detect(token):
    pre_cur_tokens.pop(0) if len(pre_cur_tokens) > 1 else print("pre_cur_tokens is not enough")
    pre_cur_tokens.append(token)
    if len(pre_cur_tokens) > 1:
        if pre_cur_tokens[0] in one_word_group and pre_cur_tokens[1] == one_word_group[pre_cur_tokens[0]]:
            return True
        else:
            return False

def create_sentence_content(tokens, p, s):
    t = 0
    sentence_html = ''
    sentence_list = []
    for token in tokens:
        sentence_html += create_sentence_html(token, p, s, t)
        sentence_list.append(create_tokens_list(token))
        t += 1
    return [sentence_html, sentence_list]

def create_tokens_list(token):
    tokens_list = []
    tokens_list.append([token, ''])
    return tokens_list

def create_sentence_html(token, p, s, t):
    sentence_html = ''
    if one_word_detect(t) or s==0:
        h = "<span id='t_{}_{}_{}' class='{}'>{}</span>".format(p, s, t, "clickable_token", token)
    else:
        h = "<span id='t_{}_{}_{}' class='{}'>{}</span>".format(p, s, t, "clickable_token mr-2", token)
    sentence_html += h
    return sentence_html

def create_paragraph_html(sentence_html, p, s):
    paragraph_html = ''
    h = "<p id='s_{}_{}' class='mb-0'>{}</p>".format(p, s, sentence_html)
    paragraph_html += h
    s += 1
    return(paragraph_html)

def create_paragraphs_list(sentence_list):
    sentences_list = []
    sentences_list.append(sentence_list)
    return sentences_list

def create_paragraph_content(sentences, p):
    s = 0
    paragraph_html = ''
    paragraph_list = []
    tra_sentence = []
    for sentence in sentences:
        tra_sentence=TextBlob(text).translate(from_lang='en', to='ja')
        tokens = TextBlob(sentence).tokens
        sentence_content = create_sentence_content(tokens, p, s)
        sentence_html = sentence_content[0]
        paragraph_html += create_paragraph_html(sentence_html, p, s)
        sentence_list = sentence_content[1]
        paragraph_list += create_paragraphs_list(sentence_list)
    return [paragraph_html, paragraph_list, tra_sentence]

def create_html(paragraph_html, p):
    html = ''
    h = "<div id='p_{}'>{}</p>".format(p, paragraph_html)
    html += h
    return(html)

def create_list(paragraph_list):
    paragraphs_list = []
    paragraphs_list.append(paragraph_list)
    return paragraphs_list

def create_tra_sentence(paragraph_tra_sentence):
    tra_sentence = []
    tra_sentence = paragraph_tra_sentence
    return tra_sentence
        
text = "I gotta be smart. I gotta be smart. \n\nI'm cute."
def get_text_en(text):
    paragraphs = []
    paragraphs = re.split('\n\n+', text)
    text_lang = TextBlob(text).detect_language()
    p = 0
    for paragraph in paragraphs:
        sentences = TextBlob(paragraph).raw_sentences
        paragraph_content = create_paragraph_content(sentences, p)
        paragraph_html = paragraph_content[0]
        pragraph_list = paragraph_content[1]
        paragraph_tra_sentence = paragraph_content[2]
        html = create_html(paragraph_html, p)
        p_list = create_list(pragraph_list)
        p += 1
    print(paragraph_tra_sentence)
get_text_en(text)

