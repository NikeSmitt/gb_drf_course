import json

from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from users_app.models import User
from .models import Project, Todo
from .views import ProjectModelViewSet
from rest_framework import status


class TestProjectsViewSet(TestCase):
    
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(username='ivan', password='12345')
        ct = ContentType.objects.get_for_model(Project)
        
        group = Group.objects.create(name='Project owners')
        group.permissions.add(Permission.objects.get(codename='view_project', content_type=ct))
        group.permissions.add(Permission.objects.get(codename='add_project', content_type=ct))
        group.permissions.add(Permission.objects.get(codename='change_project', content_type=ct))
        
        self.user.groups.add(group)
        self.user = User.objects.get(pk=self.user.pk)
    
    def tearDown(self) -> None:
        pass
    
    def test_get_project_list_user_NOT_authenticated(self):
        view = ProjectModelViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/projects/')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_project_list_user_authenticated(self):
        view = ProjectModelViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/projects/')
        force_authenticate(request, user=self.user)
        
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_add_new_project(self):
        self.client.login(username=self.user.username, password='12345')
        project = {'projectName': 'test_project', 'gitRepo': 'http://git.me',
                   'members': [f'/api/users/{self.user.id}/']}
        response = self.client.post('/api/projects/', project, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()
    
    def test_get_project_detail_user_NOT_authenticated(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_project_detail_user_authenticated(self):
        self.client.login(username=self.user.username, password='12345')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
    
    def test_get_project_edit(self):
        self.client.login(username=self.user.username, password='12345')
        project = Project.objects.create(project_name='test_project')
        response = self.client.put(f'/api/projects/{project.id}/', {'projectName': 'edited'})
        project = Project.objects.get(pk=project.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(project.project_name, 'edited')


class TestTodosViewSet(APITestCase):
    
    def setUp(self) -> None:
        self.user_data = {'username': 'admin', 'email': 'admin@me.com', 'password': 'admin'}
        self.user = User.objects.create_superuser(**self.user_data)
        project_data = {'project_name': 'test_project', 'git_repo': 'http://git.me'}
        self.test_project = Project(**project_data)
        self.test_project.save()
        self.test_project.members.set([self.user])
    
    def test_get_todos_not_authenticated(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_todos_admin_auth(self):
        self.client.login(**self.user_data)
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_todos_create_not_auth(self):
        response = self.client.post('/api/todos/', data={'project': self.test_project.id, 'author': self.user.id, 'content': 'test_content'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_todos_create_admin_auth(self):
        self.client.login(**self.user_data)
        response = self.client.post('/api/todos/', data={'project': self.test_project.id, 'author': self.user.username, 'content': 'test_content'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()
        
    def test_todos_change_admin_auth(self):
        self.client.login(**self.user_data)
        self.todo = Todo.objects.create(content='test_todo', project=self.test_project, author=self.user)
        response = self.client.put(f'/api/todos/{self.todo.id}/', {
            'content': 'test_content_changed',
            'project': self.todo.project.id,
            'author': self.todo.author.username
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(json.loads(response.content)['content'], 'test_content_changed')
