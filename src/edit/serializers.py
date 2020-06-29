from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import EnJa, Profile

class EnJaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnJa
        fields = ['mean']
        
class ProfileSerializer(serializers.ModelSerializer):
    native_lang = serializers.ReadOnlyField(source='native_lang.lang_name')
    class Meta:
        model = Profile
        fields = '__all__'


