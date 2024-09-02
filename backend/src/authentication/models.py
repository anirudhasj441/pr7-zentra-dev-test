"""
@file models.py
@brief Defines the custom user model for the application.
@details This file contains the CustomUser model, which extends Django's AbstractUser model to include additional fields like friends.
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

# --------------------------------------------------------------
# @class CustomUser
# @brief Custom user model extending Django's AbstractUser.
# @details This model adds a self-referential many-to-many relationship to represent a user's friends.
# --------------------------------------------------------------
class CustomUser(AbstractUser):
    """
    @brief A many-to-many relationship representing the user's friends.
    @details This field allows each user to have multiple friends who are also users of the system. 
             The relationship is symmetrical, meaning if user A is friends with user B, user B is also 
             friends with user A.
    """
    friends = models.ManyToManyField('self', symmetrical=True, related_name='friends_with', null=True, blank=True)
    # dob = models.DateField(null=True, blank=True)  # Uncomment to add date of birth field to the model

    """
    @brief A list of fields required during user creation.
    @details This list is empty, indicating that no additional fields are required beyond those in the AbstractUser model.
    """
    REQUIRED_FIELDS = []

    """
    @brief The custom manager for the CustomUser model.
    @details This manager overrides the default manager to provide additional functionality for managing users.
    """
    objects = UserManager()