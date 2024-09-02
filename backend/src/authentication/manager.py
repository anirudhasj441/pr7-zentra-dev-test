"""
@file manager.py
@brief Custom user manager for handling user creation and superuser management.

This module defines a custom user manager that extends Django's `BaseUserManager`. 
It provides methods for creating regular users and superusers with additional validation and settings.

@module
"""

from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    """
    @brief Custom manager for CustomUser model.

    This class provides custom methods for creating users and superusers, including validation
    for required fields and setting default values for superuser attributes.
    """

    def create_user(self, username, password=None, **extra_fields):
        """
        @brief Creates and returns a regular user with an encrypted password.

        @param username The username for the new user.
        @param password The password for the new user (optional).
        @param extra_fields Additional fields to set for the user.

        @return User A User object with the provided username and other fields.
        
        @raise ValueError If the username is not provided.
        """
        if not username:
            raise ValueError('username is required')
        
        # Uncomment if email normalization is required
        # extra_fields['email'] = self.normalize_email(extra_fields['email'])
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def create_superuser(self, username, password=None, **extra_fields):
        """
        @brief Creates and returns a superuser with default admin permissions.

        This method sets default values for `is_staff`, `is_superuser`, and `is_active`
        fields to ensure the user has full admin privileges.

        @param username The username for the superuser.
        @param password The password for the superuser (optional).
        @param extra_fields Additional fields to set for the superuser.

        @return User A User object with superuser permissions.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(username, password, **extra_fields)