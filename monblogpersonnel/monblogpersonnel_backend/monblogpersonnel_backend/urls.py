"""
URL configuration for monblogpersonnel_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Importez vos ViewSets
from articles.views import ArticleViewSet
from friends.views import FriendRequestViewSet, FriendListViewSet
from accounts.serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

router = DefaultRouter()
router.register(r'articles', ArticleViewSet) # Enregistre les URLs pour les articles
router.register(r'friend-requests', FriendRequestViewSet)
router.register(r'friends', FriendListViewSet, basename='friends')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)), # <--- Cette ligne manquait !
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
