from django.urls import path, include
from . import views
from rest_framework import routers
from .api import EnJaViewSet, JaEnViewSet,RequestUserProfileView, UpdateCustomArticleView, RequestUserArticleCreateView, AllArticleCreateView, CustomUserProfileView, CustomUserArticleView, FollowDetailAPIView, FollowArticleCreateView, FollowCreateView, ClassmateArticleCreateView, CommentCreateView, CommentDetailAPIView, ReplyCreateView, ReplyDetailAPIView, ArticleLikeCreateView, CommentLikeCreateView, ArticleLikeDetailAPIView, CommentLikeDetailAPIView, CommentUserDetailAPIView, ReplyUserDetailAPIView, NotificationDetailView, NotifyDetailView

urlpatterns = [
  path('edit/getTokens', views.get_tokens),
  path("api/profile/", RequestUserProfileView.as_view(), name="profile-detail"),
  path("api/isNotify/<int:id>", NotifyDetailView.as_view(), name="notify-list"),
  #path("api/followArticle/", FollowArticleCreateView.as_view(), name="followe-detail"),
  path("api/profile/<int:pk>", CustomUserProfileView.as_view(), name="other-profile-detail"),
  #path("api/article/", RequestUserArticleCreateView.as_view(), name="article-detail"),
  path("api/follow/<int:followedId>", FollowDetailAPIView.as_view(), name="follow-detail"),
  path("api/comment/<int:id>", CommentDetailAPIView.as_view(), name="comment-detail"),
  path("api/commentUser/<int:id>", CommentUserDetailAPIView.as_view(), name="commentUser-detail"),
  path("api/replyUser/<int:id>", ReplyUserDetailAPIView.as_view(), name="replyUser-detail"),
  path("api/reply/<int:id>", ReplyDetailAPIView.as_view(), name="reply-detail"),
  path("api/articleLike/<int:id>", ArticleLikeDetailAPIView.as_view(), name="articleLike-detail"),
  path("api/commentLike/<int:id>", CommentLikeDetailAPIView.as_view(), name="commentLike-detail"),
  path("api/article/<int:pk>", UpdateCustomArticleView.as_view(), name="article-detail"),
  path("api/userArticles/<int:userId>", CustomUserArticleView.as_view(), name="users-article-list"),
  path("api/notification/<int:id>", NotificationDetailView.as_view(), name="notification-list"),
  path("api/notification/", NotificationDetailView.as_view(), name="notification-list"),
]

router = routers.DefaultRouter(trailing_slash=False)
router.register('api/enja', EnJaViewSet, 'enja')
router.register('api/jaen', JaEnViewSet, 'jaen')
router.register("api/article/", RequestUserArticleCreateView, "article-detail")
router.register("api/allArticle/", AllArticleCreateView, "allArticle-detail")
router.register("api/followArticle/", FollowArticleCreateView, "followArticle-detail")
router.register("api/classmateArticle/", ClassmateArticleCreateView, "classmateArticle-detail")
router.register("api/follow/", FollowCreateView, "follow-detail")
router.register("api/comment/", CommentCreateView, "comment-detail")
router.register("api/reply/", ReplyCreateView, "reply-detail")
router.register("api/articleLike/", ArticleLikeCreateView, "articleLike-detail")
router.register("api/commentLike/", CommentLikeCreateView, "commentLike-detail")
urlpatterns += router.urls