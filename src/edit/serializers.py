from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import EnJa, Profile, Article, Following, Comment, Reply, ArticleLike, CommentLike, Notification
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
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
    

class FollowSerializer(serializers.ModelSerializer):
    user= UserSerializer(read_only=True)
    
    class Meta:
        model = Following
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    user= UserSerializer(read_only=True)
    profile=ProfileSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    comment = CommentSerializer(read_only=True)
    user= UserSerializer(read_only=True)
    profile=ProfileSerializer(read_only=True)
    
    class Meta:
        model = Reply
        fields = '__all__'

class ArticleLikeSerializer(serializers.ModelSerializer):
    user= UserSerializer(read_only=True)
    article=ArticleSerializer(read_only=True)
    
    class Meta:
        model = ArticleLike
        fields = '__all__'
        

class CommentLikeSerializer(serializers.ModelSerializer):
    user= UserSerializer(read_only=True)
    comment=CommentSerializer(read_only=True)
    
    class Meta:
        model = CommentLike
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    targetUser= UserSerializer(read_only=True)
    originUser= UserSerializer(read_only=True)
    originProfile = ProfileSerializer(read_only=True)
    
    
    class Meta:
        model = Notification
        fields = '__all__'



