from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('request/', views.IntrestRequestView.as_view())
]