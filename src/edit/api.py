from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EnJaSerializer, ProfileSerializer, ArticleSerializer, UserSerializer, FollowSerializer, CommentSerializer, ReplySerializer, ArticleLikeSerializer, CommentLikeSerializer, NotificationSerializer
from .models import EnJa, Profile,Article, Following, Comment, Reply, ArticleLike, CommentLike, Notification
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize
from django.contrib.auth.models import User


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404 # new
 

class EnJaViewSet(viewsets.ModelViewSet):
    queryset = EnJa.objects.all()
    serializer_class = EnJaSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def get_queryset(self):
        qs = super().get_queryset()
        word = get_lemmatizer(str(self.request.query_params.get('word')).lower())
        return qs.filter(word=word)
 
def get_lemmatizer(sentence):
    wnl = WordNetLemmatizer()
    for word, tag in pos_tag(word_tokenize(sentence)):
        wntag = tag[0].lower()
        wntag = wntag if wntag in ['a', 'r', 'n', 'v'] else None
        lemma = wnl.lemmatize(word, wntag) if wntag else word
        return lemma

class CustomUserProfileView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Profile not found",
        }}
 
    def get_object(self, pk):
        profile = Profile.objects.get(user=User.objects.get(id=pk))
        return profile
 
    def get(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
 
    def put(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    def delete(self, request, pk):
        profile = self.get_object(pk)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class RequestUserProfileView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Profile not found",
        }}
 
    def get_object(self, user):
        profile = get_object_or_404(Profile, user=user)
        return profile
 
    def get(self, request):
        profile = self.get_object(request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
 
    def put(self, request):
        profile = self.get_object(request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    def delete(self, request):
        profile = self.get_object(request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NotifyDetailView(APIView):
 
    def put(self, request, id):
        if Profile.objects.get(id=id).notify:
            Profile.objects.filter(id=id).update(notify=False)
        else:
            Profile.objects.filter(id=id).update(notify=True)
        profile = Profile.objects.get(id=id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
 
class AllArticleCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.all()


class FollowArticleCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        filter = (Following.objects.filter(user=self.request.user)).values('followed_user_id')
        filtered_articles = Article.objects.filter(user__in=filter)
        
        return filtered_articles

class ClassmateArticleCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        lang = Profile.objects.get(user=self.request.user).language
        articles = Article.objects.filter(language=lang)
        
        return articles

class RequestUserArticleCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        requestUserArticle = Article.objects.filter(user=self.request.user)
        return requestUserArticle
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user, profile=self.request.user.profile)
        

class CustomUserArticleView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Article not found",
        }}
 
    def get_object(self, userId):
        user = User.objects.get(id=userId)
        article = Article.objects.filter(user=user)
        return article
 
    def get(self, request, userId):
        articles = self.get_object(userId)
        article_list = []
        for article in articles:
            serializer = ArticleSerializer(article)
            article_list.append(serializer.data)
        return Response(article_list)    

    
class UpdateCustomArticleView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Article not found",
        }}
 
    def get_object(self, pk):
        article = get_object_or_404(Article, pk=pk)
        return article
 
    def get(self, request, pk):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
 
    def put(self, request, pk):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    def delete(self, request, pk):
        article = self.get_object(pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FollowCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FollowSerializer
    
    def perform_create(self, serializer):
        if not Following.objects.filter(user=self.request.user, followed_user=self.request.POST.get('followed_user')).exists():
            serializer.save(user = self.request.user)
            if not Notification.objects.filter(targetUser=User.objects.get(id=self.request.POST.get('followed_user')), is_following=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
                Notification.objects.create(targetUser=User.objects.get(id=self.request.POST.get('followed_user')), is_following=True, originUser=self.request.user, originProfile=self.request.user.profile)
    

class FollowDetailAPIView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Follow not found",
        }}
 
    def get_object(self, followedId):
        if Following.objects.filter(user=self.request.user, followed_user=User.objects.get(id=followedId)).exists():
            follow = Following.objects.get(user=self.request.user, followed_user=User.objects.get(id=followedId))
            return follow
        else:
            ''
 
    def get(self, request, followedId):
        follow = self.get_object(followedId)
        serializer = FollowSerializer(follow)
        if serializer.data['followed_user'] == None:
            return Response(False)
        else: 
            return Response(True)
 
    def delete(self, request, followedId):
        follow = self.get_object(followedId)
        follow.delete()
        if Notification.objects.filter(targetUser=follow.followed_user, is_following=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
            Notification.objects.get(targetUser=follow.followed_user, is_following=True, originUser=self.request.user, originProfile=self.request.user.profile).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        article = get_object_or_404(Article, id=self.request.POST.get('article'))
        serializer.save(user = self.request.user, article=article, profile=self.request.user.profile)
        Article.objects.filter(id=self.request.POST.get('article')).update(commentsNum=len(Comment.objects.filter(article=self.request.POST.get('article'))))
        if not Notification.objects.filter(article=article, targetUser=article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
            Notification.objects.create(article=article, targetUser=article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile)

class CommentDetailAPIView(APIView):
 
    def get_object(self, id):
        article = Article.objects.get(id=id)
        comments = Comment.objects.filter(article=article)
        return comments
    
    def get(self, request, id):
        comments= self.get_object(id)
        comment_list = []
        for comment in comments:
            serializer = CommentSerializer(comment)
            comment_list.append(serializer.data)
        return Response(comment_list)  
    
    def delete(self, request, id):
        comment = Comment.objects.get(id=id)
        comment.delete()
        article = Article.objects.filter(id=comment.article.id)
        article.update(commentsNum=len(Comment.objects.filter(article=Article.objects.get(id=comment.article.id))))
        if Notification.objects.filter(article=comment.article, targetUser=comment.article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
            Notification.objects.get(article=comment.article, targetUser=comment.article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReplyUserDetailAPIView(APIView):

    def get(self, request, id):
        comment = Comment.objects.get(id=id)
        isRepliedByRequestUser = Reply.objects.filter(comment=comment, user=self.request.user).exists()
        return Response([isRepliedByRequestUser, id])
class CommentUserDetailAPIView(APIView):

    def get(self, request, id):
        article = Article.objects.get(id=id)
        isCommentedByRequestUser = Comment.objects.filter(article=article, user=self.request.user).exists()
        return Response([isCommentedByRequestUser, id])

class ReplyCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        comment = get_object_or_404(Comment, id=self.request.POST.get('comment'))
        serializer.save(user = self.request.user, comment=comment, profile=self.request.user.profile)
        Comment.objects.filter(id=self.request.POST.get('comment')).update(replyNum=len(Reply.objects.filter(comment=self.request.POST.get('comment'))))
        if not Notification.objects.filter(article=comment.article, targetUser=comment.article.user, is_reply=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
            Notification.objects.create(article=comment.article, targetUser=comment.article.user, is_reply=True, originUser=self.request.user, originProfile=self.request.user.profile)

        

class ReplyDetailAPIView(APIView):
 
    def get_object(self, id):
        comment = Comment.objects.get(id=id)
        replys = Reply.objects.filter(comment=comment)
        return replys
    
    def get(self, request, id):
        replys= self.get_object(id)
        reply_list = []
        for reply in replys:
            serializer = ReplySerializer(reply)
            reply_list.append(serializer.data)
        return Response(reply_list)  

    def delete(self, request, id):
        reply = Reply.objects.get(id=id)
        reply.delete()
        comment = Comment.objects.filter(id=reply.comment.id)
        comment.update(replyNum=len(Reply.objects.filter(comment=Comment.objects.get(id=reply.comment.id))))
        if Notification.objects.filter(article=comment.article, targetUser=comment.article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
            Notification.objects.get(article=comment.article, targetUser=comment.article.user, is_comment=True, originUser=self.request.user, originProfile=self.request.user.profile).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ArticleLikeCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleLikeSerializer

    def perform_create(self, serializer):
        article = get_object_or_404(Article, id=self.request.POST.get('article'))
        isAlreadyLikedByRequestUser = ArticleLike.objects.filter(article=article, user=self.request.user).exists()
        if isAlreadyLikedByRequestUser:
            ArticleLike.objects.get(article=article, user=self.request.user).delete()
            if Notification.objects.filter(article=article, targetUser=article.user, is_like=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
                Notification.objects.get(article=article, targetUser=article.user, is_like=True, originUser=self.request.user, originProfile=self.request.user.profile).delete()
        else:
            serializer.save(user = self.request.user, article=article)
            if not Notification.objects.filter(article=article, targetUser=article.user, is_like=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
                Notification.objects.create(article=article, targetUser=article.user, is_like=True, originUser=self.request.user, originProfile=self.request.user.profile)
        #Comment.objects.filter(id=self.request.POST.get('comment')).update(replyNum=len(Reply.objects.filter(comment=self.request.POST.get('comment'))))

class CommentLikeCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CommentLikeSerializer

    def perform_create(self, serializer):
        comment = get_object_or_404(Comment, id=self.request.POST.get('comment'))
        isAlreadyLikedByRequestUser = CommentLike.objects.filter(comment=comment, user=self.request.user).exists()
        if isAlreadyLikedByRequestUser:
            CommentLike.objects.get(comment=comment, user=self.request.user).delete()
            if Notification.objects.filter(article=comment.article, targetUser=comment.article.user, is_comment_like=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
                Notification.objects.get(article=comment.article, targetUser=comment.article.user, is_comment_like=True, originUser=self.request.user, originProfile=self.request.user.profile).delete()
        else:
            serializer.save(user = self.request.user, comment=comment)
            if not Notification.objects.filter(article=comment.article, targetUser=comment.article.user, is_comment_like=True, originUser=self.request.user, originProfile=self.request.user.profile).exists():
                Notification.objects.create(article=comment.article, targetUser=comment.article.user, is_comment_like=True, originUser=self.request.user, originProfile=self.request.user.profile)
        #Comment.objects.filter(id=self.request.POST.get('comment')).update(replyNum=len(Reply.objects.filter(comment=self.request.POST.get('comment'))))

class ArticleLikeDetailAPIView(APIView):
    def get(self, request, id):
        article = Article.objects.get(id=id)
        articleLikes = ArticleLike.objects.filter(article=article)
        isLikedByRequestUser = ArticleLike.objects.filter(article=article, user=request.user).exists()
        return Response([len(articleLikes), isLikedByRequestUser, id])  

    
class CommentLikeDetailAPIView(APIView):
    def get(self, request, id):
        comment = Comment.objects.get(id=id)
        commentLikes = CommentLike.objects.filter(comment=comment)
        isLikedByRequestUser = CommentLike.objects.filter(comment=comment, user=request.user).exists()
        return Response([len(commentLikes), isLikedByRequestUser, id])

class NotificationDetailView(APIView):
    
    def get(self, request, id):
        notifications= Notification.objects.filter(targetUser=request.user)
        notification_list = []
        for notification in notifications:
            serializer = NotificationSerializer(notification)
            notification_list.append(serializer.data)
        return Response(notification_list)  

    def delete(self, request, id):
        notification = Notification.objects.get(id=id)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)