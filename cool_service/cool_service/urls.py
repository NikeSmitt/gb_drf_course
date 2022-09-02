
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users_app.views import UserCustomViewSet
from todo_app.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import permissions

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        'Cool Service',
        default_version='v1',
        contact=openapi.Contact(name='Astalavista'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny]
)

router = DefaultRouter()
router.register('users', UserCustomViewSet, basename='users')
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('api/users/v1/', include('users_app.urls', namespace='v1')),
    path('api/users/v2/', include('users_app.urls', namespace='v2')),
    
    path('swagger<str:format>/', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
]
