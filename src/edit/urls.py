from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet, ProfileDetailAPIView, ArticleDetailAPIView, ArticleListCreateAPIView, AllArticleListCreateAPIView, OtherProfileDetailAPIView, UsersArticlesListAPIView, FollowDetailAPIView, FollowArticleListCreateAPIView, FollowListCreateAPIView

urlpatterns = [
  path('edit/getTokens', views.get_tokens),
  path("api/profile/", ProfileDetailAPIView.as_view(), name="profile-detail"),
  path("api/followArticle/", FollowArticleListCreateAPIView.as_view(), name="followe-detail"),
  path("api/profile/<int:pk>", OtherProfileDetailAPIView.as_view(), name="other-profile-detail"),
  #path("api/article/", ArticleListCreateAPIView.as_view(), name="article-detail"),
  path("api/follow/<int:followedId>", FollowDetailAPIView.as_view(), name="follow-detail"),
  path("api/article/<int:pk>", ArticleDetailAPIView.as_view(), name="article-detail"),
  path("api/userArticles/<int:userId>", UsersArticlesListAPIView.as_view(), name="users-article-list"),
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')
router.register("api/article/", ArticleListCreateAPIView, "article-detail")
router.register("api/allArticle/", AllArticleListCreateAPIView, "allArticle-detail")
#router.register("api/followArticle/", FollowArticleListCreateAPIView, "followArticle-detail")
router.register("api/follow/", FollowListCreateAPIView, "follow-detail")
urlpatterns += router.urls