from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet, ProfileViewSet, ProfileAPI, UpdateProfile

urlpatterns = [
  path('edit/getTokens', views.get_tokens),
  path('api/updateProfile', ProfileAPI.as_view({'get': 'list', 'post': 'create', 'put': 'update'}), name='profile_api')
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')
router.register('api/profile', ProfileViewSet, 'profile')

urlpatterns += router.urls