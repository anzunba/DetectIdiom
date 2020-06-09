from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EnJaSerializer
from .models import EnJa

class EnJaViewSet(viewsets.ModelViewSet):
    queryset = EnJa.objects.all()
    serializer_class = EnJaSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def get_queryset(self):
        qs = super().get_queryset()
        word = str(self.request.query_params.get('word')).lower()
        return qs.filter(word=word)

 