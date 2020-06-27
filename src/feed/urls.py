from django.urls import path, include
from . import views

urlpatterns = [
  path('feed', views.get_news),
  path('feed/getText', views.get_text),
  path('feed/lemmatizer', views.lemmatizer)
]