from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import EnJa

class EnJaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnJa
        fields = ['mean']
