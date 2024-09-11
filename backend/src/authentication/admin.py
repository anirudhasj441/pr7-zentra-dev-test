"""
@file admin.py
@brief Admin configuration for CustomUser model.

This module defines the admin interface for managing the CustomUser model in the Django admin site.
It customizes the user creation and change forms, and defines how the CustomUser model should be displayed 
in the admin interface, including which fields are shown and how they are grouped.

@module
"""

from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from authentication.forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    """
    @brief Admin class for the CustomUser model.

    This class defines the forms, fieldsets, and list display settings for the CustomUser model in the
    Django admin interface.
    """
    add_form = CustomUserCreationForm  ## The form used to create a new user.
    form = CustomUserChangeForm        ## The form used to change an existing user.
    model = CustomUser                 ## The model that this admin class is managing.

    list_display = [
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff',
        'is_active',
        'is_superuser'
    ]   ## The fields to display in the list view of the admin interface.

    fieldsets = [
        [None, {'fields': ['username', 'password']}],
        [
            'Personal Info', {
                'fields': [
                    'first_name', 
                    'last_name',
                    'friends'
                ]
            }
        ],
        [
            'Permissions', {
                'fields': [
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions'
                ]
            }
        ],
        [
            'Important dates', {
                'fields': [
                    'last_login',
                    'date_joined'
                ]
            }
        ]
    ]   ## The fields and their grouping in the user detail view.

    filter_horizontal = ('friends','groups','user_permissions',)

## Register the CustomUser model with the specified admin configuration
admin.site.register(CustomUser, CustomUserAdmin)
