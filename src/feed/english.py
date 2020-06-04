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

idioms_raw_dic = {} #{"for a while":"--", "for the first time": "--"}
def getDictionary():
    with open('/Users/anna/Desktop/idiomDB.csv') as f:
        reader = csv.reader(f)
        for row in reader:
            idioms_raw_dic[row[0]] = row[1]
getDictionary()

def get_wordnet_pos(word):
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}
    return tag_dict.get(tag, wordnet.NOUN)

def get_idiom_meaning(sentence):
    sentence = sentence.lower()
    sentences_arr = TextBlob(sentence).raw_sentences
    for s in sentences_arr:
        lemmatizer = WordNetLemmatizer()
        tokens_arr = [lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in nltk.word_tokenize(s)]
        key_idiom = ''
        key_meaning = ''
        idiom_arr = []
        for key in idioms_raw_dic:
            key.replace("A's", "X")
            keys_arr = TextBlob(key).tokens
            arr = ["X", "A", "B", "C", "D", "(", ")"]
            for a in arr:
                if a in keys_arr:
                    keys_arr.remove(a)
            if len(keys_arr) != 0 and set(keys_arr) <= set(tokens_arr):
                c = collections.Counter(keys_arr)
                d = collections.Counter(tokens_arr)
                too_much = False
                for k in c:
                    idiom_dic = {}
                    if c[k] > d[k]:
                        too_much = True
                if not too_much:
                    for i, x in enumerate(keys_arr):
                        if i < len(keys_arr) - 1:
                            one = tokens_arr.index(x)
                            two = tokens_arr.index(keys_arr[i+1])
                            if one < two and two - one < 3:
                                if 'X' in key:
                                    key_idiom = key.replace("X", "A's")
                                else:
                                    key_idiom = key
                                key_meaning = idioms_raw_dic[key]
                                idiom_dic[key_idiom] = key_meaning
                                idiom_arr.append(idiom_dic)
    return idiom_arr


def detectLang(request):
    if request.method == 'POST':
        if 'input_text' in request.POST:
            input_text = request.POST['input_text']
            ###
            #detect language
            text_lang = ""
            your_lang = "ja"
            text_lang = TextBlob(input_text).detect_language()
        return HttpResponse(str(text_lang)) 
    return HttpResponse('FAIL!!!!!')

#dictionary = {}
paragraphs_ja_arr = [] 
paragraphs_en_arr = []
all_paragraphs = []
p_idioms = {}
result_paragraphs = ''
abstract_text = []
@csrf_exempt 
def get_en_text(request):
    paragraphs_ja_arr = []
    request.session['paragraphs_ja_arr'] = paragraphs_ja_arr
    paragraphs_en_arr = []
    request.session['paragraphs_en_arr'] = paragraphs_en_arr
    all_paragraphs = []
    request.session['all_paragraphs'] = all_paragraphs
    p_idioms = []
    request.session['p_idioms'] = p_idioms
    result_paragraphs = ''
    request.session['result_paragraphs'] = result_paragraphs
    abstract_text = []
    request.session['abstract_text'] = abstract_text
    getDictionary()
    #### get value in js
    if request.method == 'POST':
        if request.body:
            input_text = request.body.decode("utf-8") 
            paragraphs_arr = []
            paragraphs_arr = re.split('\n\n+', input_text)  #re.split('\n\n+', a)
            text_lang = ""
            text_lang = TextBlob(input_text).detect_language()
            p_id = 0
            result_paragraphs = ''
            #translation for each sentences 
            
            for paragraph in paragraphs_arr:
                #detect newline in paragraph
                p_blob = TextBlob(paragraph.replace('\n', ' ******. '))
                # devide paragraph into sentences 
                sentences_arr = []
                sentences_arr = p_blob.raw_sentences
                # <p id="">
                s_id = 0 
                # corrections about all sentences (of "each one" paragraph)
                result_all_sentences = '' #
                afterbr = False
                sentences_en_arr = []
                sentences_ja_arr = []
                all_sentences = []
                #input_words_arr = []
                #idioms = []               
                idiom_arr = []
                for sentence in sentences_arr:
                    #detect if sentence have idioms
                    input_words = []
                    x = sentence.replace('******.', '')
                    input_words = TextBlob(x.lower()).words
                    #translate sentence
                    if sentence != '******.':
                        s_blob = TextBlob(sentence)
                        tokens_arr = []
                        tokens_arr = s_blob.tokens
                    else:
                        tokens_arr = ['******']
                    if '******.' in sentence:
                        x =sentence.replace('******.', '')
                        noBrSentence_blob = TextBlob(x)
                    else:
                        noBrSentence_blob = TextBlob(sentence)
                    translated_sentence = ""
                    print(noBrSentence_blob)
                    try:
                        translated_sentence = noBrSentence_blob.translate(from_lang=text_lang, to='ja') 
                    except:
                        print("********Error: Fail To Translate!*********")
                    sentences_ja_arr.append(str(translated_sentence))
                    sentences_en_arr.append(str(x))
                    

                    t_id = 0 #
                    result_sentence = '' #
                    one_token = []
                    all_tokens = []

                    for token in tokens_arr:
                        if token == 'got':
                            pre_token = 'got'
                            continue
                        if token == 'ta' and pre_token=='got':
                            a = TextBlob(token)
                            if len(a.tags) != 0:
                                if token.startswith("'") or afterbr == True or (s_id==0 and t_id==0):
                                    x = ''
                                else:
                                    x = "span_margin" 
                                result_sentence += '<span class="clickable_token' + " " + x + '"' + 'id="' + "id_" + str(p_id) + '_' + str(s_id) + '_' + str(t_id) + '"' + '>' + pre_token + token + '</span>'
                                one_token = [pre_token + token, '']
                                all_tokens.append(one_token)
                                t_id += 1  
                            else:
                                if afterbr == True and token == '.':
                                    continue
                                result_sentence += token
                            continue
                        if token == '******':
                            result_sentence += '<br>'
                            afterbr = True
                            continue
                        a = TextBlob(token)
                        if len(a.tags) != 0:
                            if token.startswith("'") or afterbr == True or (s_id==0 and t_id==0):
                                x = ''
                            else:
                                x = "mr-2" 
                            result_sentence += '<span class="clickable_token' + " " + x + '"' + 'id="' + "id_" + str(p_id) + '_' + str(s_id) + '_' + str(t_id) + '"' + '>' + token + '</span>'
                            one_token = [token, '']
                            all_tokens.append(one_token)
                            t_id += 1  
                        else:
                            if afterbr == True and token == '.':
                                continue
                            result_sentence += token
                        afterbr = False
                    all_sentences.append(all_tokens)
                    result_all_sentences += '<p class="mb-0" id="' + "id_" + str(p_id) + '_' + str(s_id) + '">' + result_sentence + '</p>'
                    
                    s_id += 1
                    
                    idiom_arr.append(get_idiom_meaning(sentence))
                request.session['all_paragraphs'].append(all_sentences)
                request.session['paragraphs_ja_arr'].append(sentences_ja_arr)
                request.session['paragraphs_en_arr'].append(sentences_en_arr) 
                
                request.session['p_idioms'].append(idiom_arr)                   
                request.session['result_paragraphs'] += '<div class ="clickable" id="'+ "id_" + str(p_id) + '">' + result_all_sentences + '</div>'
                p_id += 1
            request.session['abstract_text'] = (input_text[0:500]+ '...')
            #abstract_text.append(input_text[0:500]+ '...')
            result_arr = [request.session['all_paragraphs'], request.session['result_paragraphs'], request.session['paragraphs_en_arr'], request.session['paragraphs_ja_arr'], p_idioms] #[array, string] #result_paragraphs: string #paragraph_to: array
            result_response = json.dumps(result_arr)
            return HttpResponse(result_response)
    return HttpResponse('FAIL!!!!!')

def get_en2ja_meaning(request):
    if request.method == 'POST':
        if 'clicked_word' in request.POST:
            clicked_word = request.POST['clicked_word']
            
    db_lookup = Word_Dictionary.objects.filter(word=clicked_word)
    all_meanings = ''
    for i in range(len(db_lookup)):
        all_meanings += db_lookup[i].mean
        all_meanings += ' '
    
    return HttpResponse(all_meanings) 



def save_article(request):
    if request.method == 'POST':
        if 'title' in request.POST:
            current_user = request.user
            current_user_profile = current_user.profile
            #current_user_profile = User.objects.get(username=current_user.profile)
            from_lang = Language.objects.get(lang_name="English")
            to_lang = Language.objects.get(lang_name="Japanese")
            a = Article(
                title=request.POST['title'],
                abstract=request.session['abstract_text'],
                content=request.POST['content'],
                idiom_table_arr=request.POST['idiom_table_arr'],
                word_table_arr=request.POST['word_table_arr'],
                user=current_user_profile,
                from_lang=from_lang,
                to_lang=to_lang
            )
            a.save()
            #p_num = 0
            """ for paragraph in request.session['all_paragraphs']:
                s_num = 0
                for sentence in paragraph:
                    s = Sentence(article=a, paragraph_address=p_num, sentence_address=s_num, raw_sentence=request.session['paragraphs_en_arr'][p_num][s_num], translated_sentence=request.session['paragraphs_ja_arr'][p_num][s_num])
                    #s.save()
                    w_num = 0
                    for word in sentence:
                        w = Word(sentence=s, word_address=w_num, raw_word=request.session['all_paragraphs'][p_num][s_num][w_num][0])
                        w_num += 1
                        #w.save()
                    s_num += 1
                p_num += 1 """
            message = 'Succesfully saved article'
            return HttpResponse(message)
    return HttpResponse("Failure")

def update_article(request):
    if request.method == 'POST':
        id = request.META['HTTP_REFERER'].split('/')[-1]
        if request.user.profile.id == Article.objects.get(id=id).user_id:
            current_user = request.user
            current_user_profile = current_user.profile
            from_lang = Language.objects.get(lang_name="English")
            to_lang = Language.objects.get(lang_name="Japanese")
            Article.objects.filter(id=id).update(
                title           = request.POST['title'],
                idiom_table_arr = request.POST['idiom_table_arr'],
                word_table_arr  = request.POST['word_table_arr'],
            )
            message = 'Succesfully updated article'
            return HttpResponse(message)
    return HttpResponse("Access Denied!")

def get_sentence_tokens(request):
    if request.method == 'POST':
        if 'sentence' in request.POST:
            lemmatizer = WordNetLemmatizer()
            tokens_arr = [lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in nltk.word_tokenize(request.POST['sentence'])]
    return HttpResponse(json.dumps(tokens_arr))
            