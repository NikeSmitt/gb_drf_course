from rest_framework import serializers, exceptions

from users_app.models import User
from .models import Project, Todo
from django.contrib.auth import get_user_model

user = get_user_model()


class ProjectModelSerializer(serializers.ModelSerializer):
    # members = serializers.HyperlinkedRelatedField(view_name='users-detail', many=True, queryset=user.objects.all())
    # todos = serializers.SlugRelatedField(slug_field='content', read_only=True, many=True)
    
    class Meta:
        model = Project
        fields = (
            'id',
            'project_name',
            'git_repo',
            'members',
            # 'todos',
        )


class TodoModelSerializer(serializers.ModelSerializer):
    
    # project = ProjectModelSerializer(read_only=True)
    # author = serializers.SlugRelatedField('username', queryset=User.objects.all())
    
    class Meta:
        model = Todo
        fields = (
            'id',
            'project',
            'author',
            'content',
            'active',
            'created_at',
            'updated_at',
        )
        