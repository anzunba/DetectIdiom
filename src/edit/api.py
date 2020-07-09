from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EnJaSerializer, ProfileSerializer, ArticleSerializer, UserSerializer, FollowSerializer, CommentSerializer, ReplySerializer
from .models import EnJa, Profile,Article, Following, Comment, Reply
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
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        article = get_object_or_404(Article, id=self.request.POST.get('article'))
        serializer.save(user = self.request.user, article=article, profile=self.request.user.profile)
        

class CommentDetailAPIView(APIView):
 
    def get_object(self, articleId):
        article = Article.objects.get(id=articleId)
        comments = Comment.objects.filter(article=article)
        return comments
    
    def get(self, request, articleId):
        comments= self.get_object(articleId)
        comment_list = []
        for comment in comments:
            serializer = CommentSerializer(comment)
            comment_list.append(serializer.data)
        return Response(comment_list)  
    

class ReplyCreateView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        comment = get_object_or_404(Comment, id=self.request.POST.get('comment'))
        serializer.save(user = self.request.user, comment=comment, profile=self.request.user.profile)
        

class ReplyDetailAPIView(APIView):
 
    def get_object(self, commentId):
        comment = Comment.objects.get(id=commentId)
        replys = Reply.objects.filter(comment=comment)
        return replys
    
    def get(self, request, commentId):
        replys= self.get_object(commentId)
        reply_list = []
        for reply in replys:
            serializer = ReplySerializer(reply)
            reply_list.append(serializer.data)
        return Response(reply_list)  