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
import csv

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
    sentence_list = []
    t = 0
    for token in tokens:
        sentence_d = {}
        sentence_d['id'] = '{}_{}_{}'.format(p, s, t)
        sentence_d['token'] = token
        sentence_d['mean'] = ''
        sentence_list.append(sentence_d)
        t+=1
    return sentence_list

def create_paragraphs_list(sentence_list):
    sentences_list = []
    sentences_list.append(sentence_list)
    return sentences_list

def create_paragraph_content(sentences, p):
    paragraph_list, tra_sentence, selected_idioms, sentenceTokenLists = [], [], [], []
    s = 0
    for sentence in sentences:
        tra_sentence.append(str(TextBlob(sentence).translate(from_lang='ja', to='en')))
        tokens = get_tokens(sentence)
        nouns = get_noun(sentence)
        selected_idioms.append(get_idiom_key(tokens, nouns))
        sentence_list = create_sentence_content(tokens, p, s)
        paragraph_list.append(create_paragraphs_list(sentence_list))
        sentenceTokenLists.append(get_lemmatizer(tokens))
        s += 1
    return [paragraph_list, tra_sentence, selected_idioms, sentenceTokenLists]

def get_lemmatizer(tokens):
    lemma_sentence = ''
    for token in tokens:
        t = Tokenizer().tokenize(token)[0]
        lemma_sentence += t.base_form + ' '
    return lemma_sentence


def get_text_ja(text):
    paragraphs, all_sentences, paragraph_tra_sentence, paragraph_list, idioms, sentenceTokenLists= [], [], [], [], [], []
    paragraphs = re.split('\n\n+', text)
    text_lang = TextBlob(text).detect_language()
    p = 0
    for paragraph in paragraphs:
        sentences = get_sentence(paragraph)
        all_sentences.append(sentences)
        paragraph_content = create_paragraph_content(sentences, p)
        paragraph_list.append(paragraph_content[0])
        paragraph_tra_sentence.append(paragraph_content[1])
        idioms.append(paragraph_content[2])
        sentenceTokenLists.append(paragraph_content[2])
        p += 1
    result = [paragraph_list, all_sentences, paragraph_tra_sentence, idioms, sentenceTokenLists, text_lang]
    return result
            
def get_tokens(sentence):
    t = Tokenizer()
    return t.tokenize(sentence, wakati=True)
