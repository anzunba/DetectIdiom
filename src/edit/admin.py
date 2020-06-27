from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(EnJa)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'content', 'from_lang', 'to_lang')
    
class WordIdiomTableAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user', 'word', 'idiom', 'created_at')
    
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_img', 'native_lang', 'created_at')

class FollowingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'followed_user')

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user', 'is_favorite', 'is_like', 'is_comment', 'is_reply', 'is_reply_like', 'is_following', 'created_at')
    
class NativeLanguageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'lang', 'level')

class LanguageLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'level')

class ArticleLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user')
    
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user', 'content', 'created_at')

class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user')

class ReplyAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user', 'content', 'created_at')
    
class ReplyLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'reply', 'user')

admin.site.register(Article, ArticleAdmin)
admin.site.register(WordIdiomTable, WordIdiomTableAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Following, FollowingAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(NativeLanguage, NativeLanguageAdmin)
admin.site.register(LanguageLevel, LanguageLevelAdmin)
admin.site.register(ArticleLike, ArticleLikeAdmin)
admin.site.register(Favorite, FavoriteAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentLike, CommentLikeAdmin)
admin.site.register(Reply, ReplyAdmin)
admin.site.register(ReplyLike, ReplyLikeAdmin)
