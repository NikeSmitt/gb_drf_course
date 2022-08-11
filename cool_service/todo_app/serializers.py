from rest_framework import serializers
from .models import Project, Todo
from django.contrib.auth import get_user_model

user = get_user_model()


class ProjectModelSerializer(serializers.ModelSerializer):
    members = serializers.HyperlinkedRelatedField(view_name='user-detail', many=True, queryset=user.objects.all())
    todos = serializers.SlugRelatedField(slug_field='content', read_only=True, many=True)
    
    class Meta:
        model = Project
        fields = (
            'id',
            'project_name',
            'git_repo',
            'members',
            'todos',
        )


class TodoModelSerializer(serializers.ModelSerializer):
    
    project = ProjectModelSerializer()
    author = serializers.SlugRelatedField('username', read_only=True)
    
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
        
    