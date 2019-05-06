from django.contrib import admin
from django.urls import path, include
from articles.views import TodoViewByDate, TodoViewByState, TodoBulkDelete

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/date/', TodoViewByDate.as_view(), name='todos_date_filter'),
    path('todo/state/', TodoViewByState.as_view(), name='todos_state_filter'),
    path('todo/bulkDel/', TodoBulkDelete.as_view(), name='todos_bulk_delete'),
    path('', include('articles.api.urls')),



]
