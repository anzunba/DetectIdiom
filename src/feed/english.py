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

one_word_group = {"got":["ta"], "I": ["'m", "'ve"], "It":["'s"], "it":["'s"]}

pre_cur_tokens = []
def one_word_detect(token):
    if len(pre_cur_tokens) > 1: pre_cur_tokens.pop(0)
    pre_cur_tokens.append(token)
    if len(pre_cur_tokens) > 1:
        if pre_cur_tokens[0] in one_word_group:
            for i in one_word_group[pre_cur_tokens[0]]:
                if pre_cur_tokens[1] == i:
                    return True
            else:
                return False

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
    if re.fullmatch(r"\.|,|!|\?|\'", token):
        h = token
    elif one_word_detect(token):
        h = "<span id='t_{}_{}_{}' class='{}'>{}</span>".format(p, s, t, "clickable_token", token)
    else:
        h = "<span id='t_{}_{}_{}' class='{}'>{}</span>".format(p, s, t, "clickable_token ml-2", token)
    sentence_html += h
    return sentence_html

def create_paragraph_html(sentence_html, p, s):
    paragraph_html = ''
    h = "<p id='s_{}_{} class='mb-0'>{}</p>".format(p, s, sentence_html)
    paragraph_html += h
    return(paragraph_html)

def create_paragraphs_list(sentence_list):
    sentences_list = []
    sentences_list.append(sentence_list)
    return sentences_list

def create_paragraph_content(sentences, p):
    s = 0
    paragraph_html = ''
    paragraph_list, tra_sentence, selected_idioms = [], [], []
    for sentence in sentences:
        tra_sentence.append(str(TextBlob(sentence).translate(from_lang='en', to='ja')))
        tokens = TextBlob(sentence).tokens
        selected_idioms.append(get_idiom_key(tokens))
        sentence_content = create_sentence_content(tokens, p, s)
        sentence_html = sentence_content[0]
        paragraph_html += create_paragraph_html(sentence_html, p, s)
        sentence_list = sentence_content[1]
        paragraph_list += create_paragraphs_list(sentence_list)
        s += 1
    return [paragraph_html, paragraph_list, tra_sentence, selected_idioms]

idioms_dictionary = {} #{"for a while":"--", "for the first time": "--"}
def get_idiom_dictionary():
    with open('/Users/anna/Desktop/en_idiom.csv') as f:
        reader = csv.reader(f)
        for row in reader:
            idioms_dictionary[row[0]] = row[1]
    return idioms_dictionary

remove_items = {'A', 'B', 'C', 'D', '', '…', '~', 'do'}
def get_idiom_key(tokens):
    idioms_dictionary = get_idiom_dictionary()
    idiom_tokens_sets, selected_idioms_list = {}, []
    for key in idioms_dictionary:
        key = re.sub('[\(.*\)]', '', key)
        idiom_tokens_set = set(TextBlob(key).tokens)
        idiom_tokens_set = idiom_tokens_set - remove_items
        if idiom_tokens_set <= set(tokens) and idiom_tokens_set:
            idiom_tokens_sets[key] = idioms_dictionary[key]
    selected_idioms_list.append(idiom_tokens_sets)
    return selected_idioms_list


def get_text_en(text): 
    paragraphs, idioms, all_sentences, paragraph_tra_sentence, paragraph_list = [], [], [], [], []
    html = ''
    paragraphs = re.split('\n\n+', text)
    text_lang = TextBlob(text).detect_language()
    p = 0
    for paragraph in paragraphs:
        sentences = TextBlob(paragraph).raw_sentences
        all_sentences.append(sentences)
        paragraph_content = create_paragraph_content(sentences, p)
        paragraph_html = paragraph_content[0]
        paragraph_list.append(paragraph_content[1])
        paragraph_tra_sentence.append(paragraph_content[2])
        paragraph_idioms = paragraph_content[3]
        html += "<div id='p_{}'>{}</div>".format(p, paragraph_html)
        idioms.append(paragraph_idioms)
        p += 1
    html = "<div class='clickable'>{}</div>".format(html)
    result = [html, paragraph_list, all_sentences, paragraph_tra_sentence, idioms]
    return result
