from django.test import TestCase
from rest_framework.test import APIClient

from to_do.models import ToDo


class ToDoCreateAPITest(TestCase):
    client_class: APIClient = APIClient

    @classmethod
    def setUpTestData(cls):
        cls.todo = ToDo.objects.create(
            title="제목",
            choice=False
        )

    def test_todo_목록(self):
        response = self.client.get('/to_do')
        self.assertEqual(response.status_code, 200)
        response_data: list[dict] = response.json()
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['id'], self.todo.id)
        self.assertEqual(response_data[0]['title'], self.todo.title)
        self.assertEqual(response_data[0]['choice'], self.todo.choice)
        expect_data = ['id', 'title', 'choice']
        self.assertListEqual(list(response_data[0].keys()), expect_data)

    def test_todo_상세조회(self):
        response = self.client.get(f'/to_do/{self.todo.id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(len(response_data), 3)

    def test_todo_생성(self):
        response = self.client.post('/to_do', data={
            'title': 'test_title',
            'choice': False
        })
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        self.assertEqual(response_data['title'], response_data['title'])
        self.assertEqual(response_data['choice'], response_data['choice'])
        self.assertTrue(ToDo.objects.filter(id=response_data['id']).exists())

    def test_todo_부분수정(self):
        test1 = {'title': 'test_title'}
        test2 = {'choice': True}

        with self.subTest("title 수정"):
            self.client.patch(f'/to_do/{self.todo.id}', data=test1)
            self.todo.refresh_from_db()
            self.assertEqual(self.todo.title, test1['title'])

        with self.subTest("choice 수정"):
            self.client.patch(f'/to_do/{self.todo.id}', data=test2)
            self.todo.refresh_from_db()
            self.assertEqual(self.todo.choice, test2['choice'])
        # response = self.client.patch(f'/to_do/{self.todo.id}', data=test1)
        # self.assertEqual(ToDo.objects.get(id=self.todo.id).title, test1['title'])
        #
        # response = self.client.patch(f'/to_do/{self.todo.id}', data=test2)
        # self.assertEqual(ToDo.objects.get(id=self.todo.id).choice, test2['choice'])
        #
        # response_data = response.json()
        # self.assertTrue(ToDo.objects.filter(id=self.todo.id).exists())

    def test_todo_삭제(self):
        response = self.client.delete(f'/to_do/{self.todo.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(ToDo.objects.filter(id=self.todo.id).exists())
