"""
@file urls.py
@brief URL routing for the application.
@details This file defines the URL patterns for the application, mapping URLs 
         to the appropriate views for handling requests.
"""

from django.urls import path
from . import views

# --------------------------------------------------------------
# @var urlpatterns
# @brief URL patterns for the application.
# @details This list maps URLs to their corresponding views, allowing the 
#          application to handle different web requests based on the URL.
# --------------------------------------------------------------
urlpatterns = [
    # @brief Home page route.
    # @details Maps the root URL ('') to the IndexView, which handles the home page.
    path('', views.IndexView.as_view(), name="index"),
    
    # @brief Route for creating an interest request.
    # @details Maps the 'request' URL to the IntrestRequestView, which handles the 
    #          creation and status updatation of interest requests.
    path('request', views.IntrestRequestView.as_view(), name="request"),
    
    # @brief Route for listing users.
    # @details Maps the 'list_users' URL to the ListUsers view, which returns a list of users.
    path('list_users', views.ListUsers.as_view(), name="list_users"),
    
    # @brief Route for checking if a request has been sent.
    # @details Maps the 'check_request_sent' URL to the IntrestRequestExists view, which checks 
    #          if an interest request has already been sent between users.
    path('check_request_sent', views.IntrestRequestExists.as_view(), name="check_request_sent"),
    
    path('chats', views.ChatsView.as_view(), name="chats"),

    path('messages', views.MessageView.as_view(), name="messages"),
]