from django.core.management.base import BaseCommand
from django.contrib.auth.management.commands import createsuperuser

from users_app.models import User


class Command(BaseCommand):
    help = 'Create a superuser and three regular users'
    
    def handle(self, *args, **options):
        # createsuperuser()
        User.objects.create_superuser('admin', email='admin@bk,ru', password='12345')
        
        users_data = [
            ('user1', 'user1@mail.ru', 'user1', 'Ivan', 'Ivanov'),
            ('user2', 'user2@mail.ru', 'user2', 'Kolya', 'Volkov'),
            ('user3', 'user3@mail.ru', 'user3', 'Petya', 'Dobriy'),
            ('user4', 'user4@mail.ru', 'user4', 'Sergey', 'Visokiy'),
        ]
        
        for username, email, password, first_name, last_name in users_data:
            User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
