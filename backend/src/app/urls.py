from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('request/send', views.SendRequest.as_view())
]