from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from to_do.models import ToDo
from to_do.serializer import ToDoListSerializer


class ToDoListCreateAPI(APIView):
    def get(self, request):
        todo = ToDo.objects.all()
        return_data = ToDoListSerializer(todo, many=True).data
        return Response(return_data)

    def post(self, request):
        serializer = ToDoListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        todo = ToDo.objects.create(
            title=serializer.validated_data['title'],
        )

        return_data = ToDoListSerializer(todo).data
        return Response(return_data, status=201)


class ToDoDetailAPI(APIView):
    def get(self, request, todo_id):
        todo = get_object_or_404(ToDo, id=todo_id)
        return_data = ToDoListSerializer(todo).data
        return Response(return_data, status=200)

    def patch(self, request, todo_id):
        todo = get_object_or_404(ToDo, id=todo_id)
        serializer = ToDoListSerializer(instance=todo, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def delete(self, request, todo_id):
        get_object_or_404(ToDo, id=todo_id).delete()
        return Response(status=204)
