from rest_framework import viewsets,permissions,generics,request
from .serializers import TodoSerializer
from .models import  Todo

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('due_date')
    serializer_class = TodoSerializer
    permission_classes = (permissions.AllowAny,)


#  TODO implement bulk deletion
# class TodoBulkDelete():
    


# May use django_filters package for complex filter implementation
class TodoViewByDate(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        request_date = self.request.query_params.get('due','') 
        return queryset.filter(due_date= request_date)

class TodoViewByState(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        state = self.request.query_params.get('state','')

        if (state == 'finished'):
            return queryset.filter(is_finished = True)
        elif (state == 'in_progress'):
            return queryset.filter(in_progress = True)
        elif (state == 'not_in_progress'):
            return queryset.filter(in_progress = False)
        elif (state == 'not_finished'):
            return queryset.filter(in_progress = False)
