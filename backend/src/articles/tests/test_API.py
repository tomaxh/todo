from rest_framework import status
from articles.models import Todo
from django.test import TestCase
from rest_framework.test import APIClient


class APITests(TestCase):
    def test_API_get(self):
        response = self.client.get('/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_API_add(self):
        todo_sample = {
            'title': 'the add API test',
            'due_date': '2000-01-01'
        }
        response = self.client.post('/todo/', todo_sample, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.get().title, 'the add API test')

    def test_API_put(self):
        todo_sample = {'title': 'the add API test', 'due_date': '1900-01-01'}
        todo_sample_put = {"title": "the put API test",
                           "due_date": "1909-01-01", "in_progress": False, "is_finished": False}

        response = self.client.post('/todo/', todo_sample, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        id = Todo.objects.all().order_by('due_date')[0:1].values('id')[0]['id']

        client = APIClient()
        url = '/todo/'+str(id)+'/'
        response = client.put(url, todo_sample_put, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.all().order_by('due_date')[0:1].values(
            'title')[0]["title"], todo_sample_put["title"])

    def test_API_delete(self):
        todo_sample_delete = {"title": "the delete API tester",
                              "due_date": "1909-01-01", "in_progress": False, "is_finished": False}
        response = self.client.post(
            '/todo/', todo_sample_delete, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        id = Todo.objects.all().order_by('due_date')[0:1].values('id')[0]["id"]

        client = APIClient()
        url = '/todo/'+str(id)+'/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code,
                         status.HTTP_204_NO_CONTENT or status.HTTP_200_OK)

    def test_API_filter_date(self):
        todo_sample_date = {"title": " date filter API tester",
                            "due_date": "1909-11-11", "in_progress": False, "is_finished": False}
        response = self.client.post('/todo/', todo_sample_date, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        client = APIClient()
        url = '/todo/date/?date='+'1909-11-11'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_API_bulk_delete(self):
        todo_sample_bdelete = {"title": "bulk delete API tester",
                               "due_date": "1110-12-12", "in_progress": False, "is_finished": False}
        id = []
        id_string = ''
        for i in range(1, 10):
            response = self.client.post(
                '/todo/', todo_sample_bdelete, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            id.append(str(Todo.objects.filter(title="bulk delete API tester").order_by(
                '-id')[0:1].values('id')[0]['id']))

            id_string = ','.join(id)

        client = APIClient()
        url = '/todo/bulkDel/?id=' + id_string
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
