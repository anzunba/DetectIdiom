from django.urls import path, include
from . import views, enidiom, japanese

urlpatterns = [
  path('feed', views.index),
  path('feed/getText', japanese.get_text_ja)
]