from django.contrib import admin
from django.urls import path,include
from articles.views import TodoViewByDate,TodoViewByState

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('articles.api.urls')),
    path('todos/date/', TodoViewByDate.as_view(), name='todos_date_filter'),
    path('todos/state/', TodoViewByState.as_view(), name='todos_state_filter')

    
]
