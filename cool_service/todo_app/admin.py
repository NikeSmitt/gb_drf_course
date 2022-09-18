from django.contrib import admin

from todo_app.models import Project, Todo

admin.site.register(Project)


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'project', 'author']
