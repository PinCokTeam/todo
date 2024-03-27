from rest_framework.serializers import ModelSerializer

from to_do.models import ToDo


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'title', 'choice']
