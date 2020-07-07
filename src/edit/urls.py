from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet, ProfileDetailAPIView, ArticleDetailAPIView, ArticleListCreateAPIView, AllArticleListCreateAPIView, OtherProfileDetailAPIView, UsersArticlesListAPIView

urlpatterns = [
  path('edit/getTokens', views.get_tokens),
  path("api/profile/", ProfileDetailAPIView.as_view(), name="profile-detail"),
  path("api/profile/<int:pk>", OtherProfileDetailAPIView.as_view(), name="other-profile-detail"),
  #path("api/article/", ArticleListCreateAPIView.as_view(), name="article-detail"),
  #path("api/article/", ArticleListCreateAPIView, name="article-detail"),
  path("api/article/<int:pk>", ArticleDetailAPIView.as_view(), name="article-detail"),
  path("api/userArticles/<int:userId>", UsersArticlesListAPIView.as_view(), name="users-article-list"),
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')
router.register("api/article/", ArticleListCreateAPIView, "article-detail")
router.register("api/allArticle/", AllArticleListCreateAPIView, "allArticle-detail")
urlpatterns += router.urls