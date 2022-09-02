from django.shortcuts import render
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from django.contrib.auth import get_user_model

from users_app.serializers import UserModelSerializer, UserModelSerializerWithServiceInfo

user_model = get_user_model()


class UserCustomViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = user_model.objects.all()
    serializer_class = UserModelSerializer
    
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerWithServiceInfo
        return UserModelSerializer


from rest_framework.generics import ListAPIView


class UserCustomViewSetTemp(ListAPIView):
    queryset = user_model.objects.all()
    serializer_class = UserModelSerializer
    
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerWithServiceInfo
        return UserModelSerializer
