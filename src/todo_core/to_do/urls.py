from django.urls import path

from to_do.views import ToDoListCreateAPI, ToDoDetailAPI

urlpatterns = [
    path('', ToDoListCreateAPI.as_view()),
    path('/<int:todo_id>', ToDoDetailAPI.as_view())
]