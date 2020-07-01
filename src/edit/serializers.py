from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import EnJa, Profile, Article
from rest_framework.fields import CurrentUserDefault
class EnJaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnJa
        fields = ['mean']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        #fields = ('id', 'username')
             
class ProfileSerializer(serializers.ModelSerializer):
    user= UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'
        
class ArticleSerializer(serializers.ModelSerializer):
    user= UserSerializer(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
    
    # def save(self):
    #     user = CurrentUserDefault()
    #     title = self.validated_data['title']
    #     content = self.validated_data['content']




