from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from authentication.forms import CustomUserCreationForm, CustomUserChangeForm


# Register your models here.

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff',
        'is_active',
        'is_superuser'
    ]
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
    ]

admin.site.register(CustomUser, CustomUserAdmin)