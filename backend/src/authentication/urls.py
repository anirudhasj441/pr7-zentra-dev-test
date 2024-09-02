"""
@file urls.py
@brief URL routing definitions for the authentication app.
@details This file defines the URL patterns that route requests to the appropriate views in the authentication application.
"""

from django.urls import path
from . import views

# --------------------------------------------------------------
# @var urlpatterns
# @brief URL patterns for the authentication views.
# @details Maps URL paths to the corresponding view classes in the authentication app.
# --------------------------------------------------------------
urlpatterns = [
    # --------------------------------------------------------------
    # @brief URL pattern for user signup.
    # @details Routes to the SignUpUser view which handles user registration.
    # @route /signup
    # --------------------------------------------------------------
    path('signup', views.SignUpUser.as_view()),

    # --------------------------------------------------------------
    # @brief URL pattern for user login.
    # @details Routes to the LoginUser view which handles user authentication.
    # @route /login
    # --------------------------------------------------------------
    path('login', views.LoginUser.as_view()),

    # --------------------------------------------------------------
    # @brief URL pattern to check username availability.
    # @details Routes to the UserAvailability view which checks if a username is available.
    # @route /username_availability
    # --------------------------------------------------------------
    path('username_availability', views.UserAvailability.as_view()),

    # --------------------------------------------------------------
    # @brief URL pattern to get the authenticated user's information.
    # @details Routes to the UserIsAuthenticated view which returns the currently authenticated user's data.
    # @route /get_user
    # --------------------------------------------------------------
    path('get_user', views.UserIsAuthenticated.as_view()),
]