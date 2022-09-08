from django.urls import path
from . import views

app_name = 'users_app'

urlpatterns = [
    path('', views.UserCustomViewSetTemp.as_view(), name='user_list'),
]