from rest_framework.viewsets import ModelViewSet
from to_do.models import ToDo
from to_do.serializer import ToDoSerializer


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer


todolist = ToDoViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

todo_detail = ToDoViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})
