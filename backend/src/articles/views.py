from rest_framework import viewsets,permissions
from .serializers import TodoSerializer
from .models import  Todo



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('due_date')
    serializer_class = TodoSerializer
    permission_classes = (permissions.AllowAny,)
