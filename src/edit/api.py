from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EnJaSerializer, ProfileSerializer, ArticleSerializer, UserSerializer, FollowSerializer
from .models import EnJa, Profile,Article, Following
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

class OtherProfileDetailAPIView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Profile not found",
        }}
 
    def get_object(self, pk):
        profile = Profile.objects.get(user=User.objects.get(id=pk))
        #user = get_object_or_404(User, pk=pk)
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
    
class ProfileDetailAPIView(APIView):
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


class AllArticleListCreateAPIView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.all()


# class FollowArticleListCreateAPIView(APIView):

#     def get(self, request):
#         followersInstanceList = Following.objects.filter(user=self.request.user).values_list('followed_user', flat=True)
#         articlesList = Article.objects.filter(user=followersInstanceList)
#         return Response(articlesList)


class FollowArticleListCreateAPIView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        filter = (Following.objects.filter(user=self.request.user)).values('followed_user_id')
        filtered_articles = Article.objects.filter(user__in=filter)
        
        # requestUserArticle = Article.objects.filter(filter)
        return filtered_articles

# class ArticleListCreateAPIView(APIView):
class ArticleListCreateAPIView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        requestUserArticle = Article.objects.filter(user=self.request.user)
        return requestUserArticle
        #return self.request.user.articles.all()
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user, profile=self.request.user.profile)
        


class UsersArticlesListAPIView(APIView):
    err_msg = {
        "error": {
            "code": 404,
            "message": "Article not found",
        }}
 
    def get_object(self, userId):
        user = User.objects.get(id=userId)
        article = Article.objects.filter(user=user)
        #article = get_object_or_404(Article, user=userId)
        return article
 
    def get(self, request, userId):
        articles = self.get_object(userId)
        article_list = []
        for article in articles:
            serializer = ArticleSerializer(article)
            article_list.append(serializer.data)
        return Response(article_list)    

    
class ArticleDetailAPIView(APIView):
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


class FollowListCreateAPIView(viewsets.ModelViewSet):
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
        #return Response(serializer.data)
 
    def delete(self, request, followedId):
        follow = self.get_object(followedId)
        follow.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
