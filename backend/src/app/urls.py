from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('request', views.IntrestRequestView.as_view()),
    path('list_users', views.ListUsers.as_view()),
    path('check_request_sent', views.IntrestRequestExists.as_view())
]