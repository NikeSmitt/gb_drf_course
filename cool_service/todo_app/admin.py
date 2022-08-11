from django.contrib import admin

from todo_app.models import Project, Todo

admin.site.register(Project)
admin.site.register(Todo)
