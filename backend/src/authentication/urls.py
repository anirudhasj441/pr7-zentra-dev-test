from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.SignUpUser.as_view()),
    path('login', views.LoginUser.as_view()),
    path('username_availability', views.UserAvailability.as_view()),
]