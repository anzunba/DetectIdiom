from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

# Create your models here.
class EnJa(models.Model):
  word = models.CharField(max_length=100)
  mean = models.CharField(max_length=2000)

  def __str__(self):
    return self.word
  
