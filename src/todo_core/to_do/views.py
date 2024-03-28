from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from to_do.models import ToDo
from to_do.serializer import ToDoListSerializer


class LoginAPIView(APIView):
    def post(self, request):
        user_id = request.data['id']
        password = request.data['password']

        if not User.objects.filter(user_id=user_id).exists():
            return Response(status=401)

        db_user_data = User.objects.get(user_id=user_id)
        if db_user_data.password != password:
            return Response(status=401)

        token = Token.objects.create(token=random.random())

        return Response(data={'token': token})

class LogoutAPIView(APIView):
    def delete(self, request):
        token = request.query_params['token']
        Token.objects.filter(token=token).delete()
        return Response()

class ToDoListCreateAPI(APIView):
    def get(self, request):
        # token 검사로직 추가, 만약 통과하면 아래 로직 그대로 실행
        if 'token' not in request.query_params:
            return Response(status=401)
        token = request.query_params['token']
        if not Token.objects.filter(token=token).exists():
            return Response(status=401)

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
