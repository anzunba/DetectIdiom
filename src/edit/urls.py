from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet

urlpatterns = [
  path('edit/getTokens', views.get_tokens)
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')

urlpatterns += router.urls