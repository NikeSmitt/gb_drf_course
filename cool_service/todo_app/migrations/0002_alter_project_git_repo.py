# Generated by Django 4.0.6 on 2022-08-11 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='git_repo',
            field=models.URLField(blank=True, null=True, verbose_name='Ссылка на репозиторий'),
        ),
    ]