from django.db import models


class ToDo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    choice = models.BooleanField(default=False)

    class Meta:
        app_label = 'to_do'
