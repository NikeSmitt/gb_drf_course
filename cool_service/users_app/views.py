from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import get_user_model

from users_app.serializers import UserModelSerializer

user_model = get_user_model()


class UserModelViewSet(ModelViewSet):
    queryset = user_model.objects.all()
    serializer_class = UserModelSerializer
    