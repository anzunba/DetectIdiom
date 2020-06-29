from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EnJaSerializer, ProfileSerializer
from .models import EnJa, Profile, Language
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize
from django.contrib.auth.models import User

class EnJaViewSet(viewsets.ModelViewSet):
    queryset = EnJa.objects.all()
    serializer_class = EnJaSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def get_queryset(self):
        qs = super().get_queryset()
        word = get_lemmatizer(str(self.request.query_params.get('word')).lower())
        return qs.filter(word=word)
 
def get_lemmatizer(sentence):
    wnl = WordNetLemmatizer()
    for word, tag in pos_tag(word_tokenize(sentence)):
        wntag = tag[0].lower()
        wntag = wntag if wntag in ['a', 'r', 'n', 'v'] else None
        lemma = wnl.lemmatize(word, wntag) if wntag else word
        return lemma
    
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)
    # def get_queryset(self):
    #     return self.request.user.profile
    
class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def get_object(self):
        return self.request.user.profile
    
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)
    
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         self.perform_update(serializer)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.name = request.data.get("bio")
        instance.user = request.user
        instance.profile_img = request.data.get("profile_img")
        instance.lang = request.data.get("lang")
        instance.save()
        print(instance)
        serializer = self.get_serializer(data=instance)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
class UpdateProfile(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.name = request.data.get("bio")
        instance.user = request.user
        instance.profile_img = request.data.get("profile_img")
        instance.lang = request.data.get("lang")
        instance.save()

        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)