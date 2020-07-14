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
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize

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
    sentence_list = []
    t = 0
    for token in tokens:
        sentence_d = {}
        sentence_d['id'] = '{}_{}_{}'.format(p, s, t)
        sentence_d['token'] = token
        sentence_d['mean'] = ''
        
        if one_word_detect(token) or re.fullmatch(r'\.|,|:|\'', token):
            sentence_d['class'] = ''
        else:
            sentence_d['class'] = 'ml-2'
        sentence_list.append(sentence_d)
        t+=1
    return sentence_list

def create_paragraphs_list(sentence_list):
    paragraphs_list = []
    paragraphs_list.append(sentence_list)
    return paragraphs_list

def create_paragraph_content(sentences, p):
    paragraph_list, tra_sentence, selected_idioms, sentenceTokenLists = [], [], [], []
    s = 0
    for sentence in sentences:
        tra_sentence.append(str(TextBlob(sentence).translate(from_lang='en', to='ja')))
        tokens = TextBlob(sentence).tokens
        selected_idioms.append(get_idiom_key(sentence))
        sentenceTokenLists.append(get_lemmatizer(sentence))
        sentence_list = create_sentence_content(tokens, p, s)
        paragraph_list.append(create_paragraphs_list(sentence_list))
        s += 1
    return [paragraph_list, tra_sentence, selected_idioms, sentenceTokenLists]

idioms_dictionary = {} #{"for a while":"--", "for the first time": "--"}
def get_idiom_dictionary():
    with open('/Users/anna/Desktop/en_idiom.csv') as f:
        reader = csv.reader(f)
        for row in reader:
            idioms_dictionary[row[0]] = row[1]
    return idioms_dictionary

remove_items = ['A', 'B', 'C', 'D', '', '…', '~', 'do']
def get_idiom_key(sentence):
    lemma_sentence = get_lemmatizer(sentence)
    idioms_dictionary = get_idiom_dictionary()
    idiom_tokens_sets = {}
    for key in idioms_dictionary:
        key = re.sub('[\(.*\)]', '', key) #()内の文字列排除
        key2 = re.sub('[[A]|[B]|[C]|[D]|[…]|[~]|[ do ]]', '', key)
        if key2 in lemma_sentence:
            idiom_tokens_sets[key] = idioms_dictionary[key]
    return idiom_tokens_sets

def get_lemmatizer(sentence):
    wnl = WordNetLemmatizer()
    lemma_sentence = ''
    for word, tag in pos_tag(word_tokenize(sentence)):
        wntag = tag[0].lower()
        wntag = wntag if wntag in ['a', 'r', 'n', 'v'] else None
        lemma = wnl.lemmatize(word, wntag) if wntag else word
        lemma_sentence += lemma + ' '
    return lemma_sentence

def get_text_en(text): 
    paragraphs, idioms, all_sentences, paragraph_tra_sentence, paragraph_list, sentenceTokenLists = [], [], [], [], [], []
    paragraphs = re.split('\n\n+', text)
    text_lang = TextBlob(text).detect_language()
    p = 0
    for paragraph in paragraphs:
        sentences = TextBlob(paragraph).raw_sentences
        all_sentences.append(sentences)
        paragraph_content = create_paragraph_content(sentences, p)
        paragraph_list.append(paragraph_content[0])
        paragraph_tra_sentence.append(paragraph_content[1])
        idioms.append(paragraph_content[2])
        sentenceTokenLists.append(paragraph_content[3])
        p += 1
    result = [paragraph_list, all_sentences, paragraph_tra_sentence, idioms, sentenceTokenLists, text_lang]
    return result
