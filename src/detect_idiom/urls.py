from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('feed.urls')),
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),
    path('', include('edit.urls')),
]
