from django.urls import path, include
from . import views

urlpatterns = [
  path('feed', views.index)
]