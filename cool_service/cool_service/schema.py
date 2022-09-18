import graphene
from graphene_django import DjangoObjectType

from todo_app.models import Todo, Project
from users_app.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoMutation(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        todo_id = graphene.String(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, content, todo_id):
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            raise Todo.DoesNotExist

        todo.content = content
        todo.save()
        return cls(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


class Query(graphene.ObjectType):
    todos = graphene.List(TodoType)
    projects = graphene.List(ProjectType)
    users = graphene.List(UserType)

    projects_by_name = graphene.List(ProjectType, project_name=graphene.String(required=True))
    user_by_id = graphene.Field(UserType, user_id=graphene.Int(required=True))

    def resolve_todos(root, info):
        return Todo.objects.select_related('project', 'author').all()

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_users(root, info):
        return User.objects.all()

    def resolve_projects_by_name(root, info, project_name):
        return Project.objects.filter(project_name__contains=project_name).all()

    def resolve_user_by_id(self, info, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None


schema = graphene.Schema(query=Query, mutation=Mutation)
