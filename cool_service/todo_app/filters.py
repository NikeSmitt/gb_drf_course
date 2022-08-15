from django_filters import rest_framework as filters

from todo_app.models import Project, Todo


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Project
        fields = ['project_name']


class TodoFilter(filters.FilterSet):
    project = filters.CharFilter(field_name='project__project_name', lookup_expr='contains')
    created_at__gte = filters.DateFilter(field_name='created_at', lookup_expr='gte')
    created_at__lte = filters.DateFilter(field_name='created_at', lookup_expr='lte')
    
    class Meta:
        model = Todo
        fields = ['created_at', 'project']
