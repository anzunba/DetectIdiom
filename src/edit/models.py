from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
from django.db.models.signals import post_save

# Create your models here.
class EnJa(models.Model):
  word = models.CharField(max_length=63)
  mean = models.CharField(max_length=511)

  def __str__(self):
    return self.word
  
class Article(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
  profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name="profile", null=True)
  title = models.CharField(max_length=63)
  content = models.TextField()
  language = models.CharField(max_length=15, null=True)
  origin_sentence = models.TextField()
  translated_sentence = models.TextField()
  word = models.TextField(blank=True)
  idiom = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  bio = models.CharField(max_length=255, blank=True)
  profile_img = models.ImageField(upload_to='images/profile/')
  language = models.CharField(max_length=15, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

  post_save.connect(create_user_profile, sender=User)

class Following(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "following_user")
  followed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "followed_user")

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
  

  
  