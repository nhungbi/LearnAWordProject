from sqlite3 import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import AppUser, Word, Stem
from django.db.utils import IntegrityError
from django.core import serializers
import requests

from django.contrib.auth import authenticate, login, logout


import re

from dotenv import load_dotenv
import os
load_dotenv()



def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def signup(request):
    try:
        email = request.data['email']
        password = request.data['password']

        AppUser.objects.create_user(username=request.data['username'], password=password, email=email)
        return JsonResponse({'success': True, 'data': 'user was added'})

    except IntegrityError as e:
        return JsonResponse({'success': False, 'data': 'Username or email has already been taken.'})
    

@api_view(['POST'])
def log_in(request):

    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)

    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
                return JsonResponse({'success': True})
            except Exception as e:
                print('except')
                print(str(e))
                return JsonResponse({'success': False, 'error': str(e)})
            # Redirect to a success page.
        else:
            return JsonResponse({'success': False, 'error': 'Account not active!'})
            # Return a 'disabled account' error message
    else:
        return JsonResponse({'success': False, 'error': 'Account not found! Email or password is wrong.'})
        # Return an 'invalid login' error message.


@api_view(['POST'])
def log_out(request):
    logout(request)
    return HttpResponse('Logged you out!')


@api_view(['GET'])
def who_am_i(request):
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username', 'avatar_color', 'avatar_mood'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})


def get_subdirectory(audio):
    if re.match("^bix", audio):
        return 'bix'
    elif re.match("^gg", audio):
        return 'gg'
    elif not re.match("^[a-zA-Z]", audio): #not a letter
       return 'number'
    else:
        return audio[0]

def get_data(word):
    """
    Given a word, return a dictionary with information about the word.
    """
    data_response = requests.get(f"https://www.dictionaryapi.com/api/v3/references/collegiate/json/{word}?key={os.environ['apikey']}")

    info = data_response.json()

    speech = info[0]['fl'] #part of speech
    definition = info[0]['shortdef'][0] 

    if ' ' not in definition: #ex: word: fissionable - def is fissile
        return get_data(definition) 
    
    # "https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]"
    pronounciation = info[0]['hwi']['hw']
    audio = info[0]['hwi']['prs'][0]['sound']['audio']
    word = info[0]['meta']['id'] #in case random word is of different stem
    stems = info[0]['meta']['stems']

    subdirectory = get_subdirectory(audio)

    audio_pronounce =f"https://media.merriam-webster.com/audio/prons/en/us/mp3/{subdirectory}/{audio}.mp3"

    return {'word': word,
    'definition': definition,
    'speech': speech,
    'pronounciation': pronounciation,
    'audio': audio_pronounce,
    'stems': stems}

    #test
    # return {'word': "coyotillo",
    # 'definition': "a shrub (Karwinskia humboldtiana) of the buckthorn family of the southwestern U.S. and Mexico having poisonous berries",
    # 'speech': "noun",
    # 'pronounciation': "coy*o*til*lo",
    # 'audio': "https://media.merriam-webster.com/audio/prons/en/us/mp3/c/coyoti01.mp3",
    # 'stems': ['coyotillo', 'coyotillos']}

@api_view(['GET'])
def get_word(request):

    word_response = requests.get( "https://random-word-api.herokuapp.com/word")
    word = word_response.json()[0] #got the word

    # print('worddddd', word)

    try: #in case random word don't have valid data
        info = get_data(word)
        return JsonResponse(info)
    except:
        print('-----------------error')
        return get_word(request) #recursively get word again

@api_view(['POST'])
def save_word(request):
    info = request.data
    user = request.user
    word = Word(word = info['word'], definition = info['definition'], audio = info['audio'], pronounciation = info['pronounciation'], part_of_speech = info['speech'])
    word.save()
    word.user.add(user)
    for stem in info['stems']:
        Stem(text = stem, word = word).save()

    return HttpResponse("WORD SAVED SUCCESSFULLY!")

@api_view(['GET'])
def get_leaderboard(request):
    ranking_list = sorted(list(AppUser.objects.all()), key = lambda user: len(user.words.all()), reverse=True) #descending
    
    data = [{'user': user.username, 'words': len(user.words.all()), 'avatar_color': user.avatar_color, 'avatar_mood': user.avatar_mood} for user in ranking_list[:10]]
    
    return JsonResponse({'ranking': data})



def extract_word_info(word):
    """ Given a word object, return the a dict with word, audio, definition, 
    pronounciation, speech, stems, and date_learned as keys."""

    return {
        "word": word.word,
        "audio": word.audio,
        "definition": word.definition,
        "pronounciation": word.pronounciation,
        "speech": word.part_of_speech,
        "stems": [stem.text for stem in word.stems.all()],
        "date_learned": word.date_learned
    }


@api_view(['GET'])
def get_user_history(request):
    try: 
        return JsonResponse({'words': [extract_word_info(word) for word in request.user.words.all()]})
    except Exception as e:
        return HttpResponse(e)

@api_view(['GET'])
def get_avatar(request):
    return JsonResponse({'avatar_color': request.user.avatar_color, 'avatar_mood': request.user.avatar_mood})

@api_view(['PUT'])
def save_avatar(request):
    request.user.avatar_color = request.data['avatar_color']
    request.user.avatar_mood = request.data['avatar_mood']
    request.user.save()
    return HttpResponse('Successfully saved!')
    
@api_view(['PUT'])
def edit_profile(request):
    user = request.user
    #if '' then blank
    try: 
        if request.data['email']:
            user.email = request.data['email']
        
        if request.data['username']:
            user.username = request.data['username']
        
        if request.data['password']:
            user.set_password(request.data['password'])
    
        user.save()
        return JsonResponse({'success': True})
    except IntegrityError as e:
        return JsonResponse({'success': False, 'data': 'Username or email has already been taken.'})
    except Exception as e:

        print (e)
        return JsonResponse({'success': False, 'error': str(e)})



