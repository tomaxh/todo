from rest_framework import status
from articles.models import Todo
from django.test import TestCase
from rest_framework.test import APIClient


class APITests(TestCase):
    def test_API_get(self):
        response = self.client.get('/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_API_add(self):
        todo_sample={
            'title':'the add API test',
            'due_date':'2000-01-01'
        }
        response = self.client.post('/todo/',todo_sample, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.get().title, 'the add API test')

    def test_API_put(self):
        todo_sample={'title':'the add API test','due_date':'1900-01-01'}
        todo_sample_put={"title":"the put API test","due_date":"1909-01-01", "in_progress": False,"is_finished": False}

        response = self.client.post('/todo/',todo_sample, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        id = Todo.objects.all().order_by('due_date')[0:1].values('id')[0]["id"]

        client = APIClient()
        url = '/todo/'+str(id)+'/'
        response = client.put(url, todo_sample_put, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.all().order_by('due_date')[0:1].values('title')[0]["title"], todo_sample_put["title"])     

    def test_API_delete(self):
        todo_sample_delete={"title":"the delete API test","due_date":"1909-01-01", "in_progress": False,"is_finished": False}
        response = self.client.post('/todo/',todo_sample_delete, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        id = Todo.objects.all().order_by('due_date')[0:1].values('id')[0]["id"]
        
        client = APIClient()
        url = '/todo/'+str(id)+'/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT or status.HTTP_200_OK )