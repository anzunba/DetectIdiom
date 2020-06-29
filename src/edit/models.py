from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

# Create your models here.
class EnJa(models.Model):
  word = models.CharField(max_length=63)
  mean = models.CharField(max_length=511)

  def __str__(self):
    return self.word
  
class Article(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=63)
  content = models.TextField()
  from_lang = models.ForeignKey('Language', on_delete=models.CASCADE, related_name = "from_lang")
  to_lang = models.ForeignKey('Language', on_delete=models.CASCADE, related_name = "to_lang")
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class WordIdiomTable(models.Model):
  article = models.ForeignKey('Article', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  word = models.TextField()
  idiom = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  bio = models.CharField(max_length=255, blank=True)
  profile_img = models.ImageField(upload_to='images/profile/')
  lang = models.CharField(max_length=255, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

class Following(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name = "following_user")
  followed_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name = "followed_user")

class Notification(models.Model):
  article = models.ForeignKey('Article', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  is_favorite = models.BooleanField(default=False)
  is_like = models.BooleanField(default=False)
  is_comment = models.BooleanField(default=False)
  is_comment_like = models.BooleanField(default=False)
  is_reply = models.BooleanField(default=False)
  is_reply_like = models.BooleanField(default=False)
  is_following = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  
  
class NativeLanguage(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  lang = models.ForeignKey('Language', on_delete=models.CASCADE)
  level = models.ForeignKey('LanguageLevel', on_delete=models.CASCADE)

class LanguageLevel(models.Model):
  level = models.CharField(max_length=15)
  def __str__(self):
        return self.level

class Language(models.Model):
  lang_name = models.CharField(max_length=15)
  def __str__(self):
        return self.lang_name

class ArticleLike(models.Model):
  article = models.ForeignKey('Article', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)

class Favorite(models.Model):
  article = models.ForeignKey('Article', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)

class Comment(models.Model):
  article = models.ForeignKey('Article', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  content = models.CharField(max_length=255, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

class CommentLike(models.Model):
  comment = models.ForeignKey('Comment', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)

class Reply(models.Model):
  comment = models.ForeignKey('Comment', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  content = models.CharField(max_length=255, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

class ReplyLike(models.Model):
  reply = models.ForeignKey('Reply', on_delete=models.CASCADE)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  

  
  