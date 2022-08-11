import uuid

from django.db import models
from django.contrib.auth import get_user_model

user = get_user_model()


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project_name = models.CharField(max_length=64)
    git_repo = models.URLField('Ссылка на репозиторий', null=True, blank=True)
    members = models.ManyToManyField(user)
    
    def __str__(self):
        return self.project_name


class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='todos')
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    author = models.ForeignKey(user, on_delete=models.SET_NULL, null=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.project} | {self.author} | {self.content}'


