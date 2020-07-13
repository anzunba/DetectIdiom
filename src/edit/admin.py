from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(EnJa)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'content', 'language', 'origin_sentence', 'translated_sentence', 'word', 'idiom', 'commentsNum')
    
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_img','language', 'notify', 'created_at')
    
class FollowingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'followed_user')

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'targetUser', 'is_like', 'is_comment', 'is_reply', 'is_following', 'originUser', 'originProfile', 'created_at')
    
class ArticleLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user')
    


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'user', 'content', 'replyNum', 'created_at')

class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user')

class ReplyAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user', 'content', 'created_at')
    
class ReplyLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'reply', 'user')

admin.site.register(Article, ArticleAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Following, FollowingAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(ArticleLike, ArticleLikeAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentLike, CommentLikeAdmin)
admin.site.register(Reply, ReplyAdmin)
admin.site.register(ReplyLike, ReplyLikeAdmin)
