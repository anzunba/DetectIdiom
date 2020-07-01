from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet, ProfileDetailAPIView, ArticleDetailAPIView, ArticleListCreateAPIView

urlpatterns = [
  path('edit/getTokens', views.get_tokens),
  path("api/profile/", ProfileDetailAPIView.as_view(), name="profile-detail"),
  #path("api/article/", ArticleListCreateAPIView.as_view(), name="article-detail"),
  #path("api/article/", ArticleListCreateAPIView, name="article-detail"),
  path("api/article/<int:pk>", ArticleDetailAPIView.as_view(), name="article-detail"),
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')
router.register("api/article/", ArticleListCreateAPIView, "article-detail")
urlpatterns += router.urls