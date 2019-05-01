from django.contrib import admin
from django.urls import path,include
from ..views import TodoViewSet
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register(r'todo', TodoViewSet, base_name='todos')

urlpatterns = router.urls
