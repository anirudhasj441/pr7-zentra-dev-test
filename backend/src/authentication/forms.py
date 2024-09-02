"""
@file forms.py
@brief Forms for managing CustomUser model.

This module defines forms for creating and changing instances of the CustomUser model.
It extends Django's built-in `UserCreationForm` and `UserChangeForm` to include additional fields 
specific to the CustomUser model.

@module
"""

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    """
    @brief Form for creating new CustomUser instances.

    This form extends the built-in UserCreationForm to include additional fields for the CustomUser model.
    """

    class Meta:
        model = CustomUser  ## The model that this form is associated with.
        fields = ('friends',) ## The fields to include in the form.

class CustomUserChangeForm(UserChangeForm):
    """
    @brief Form for changing existing CustomUser instances.

    This form extends the built-in UserChangeForm to include additional fields for the CustomUser model.
    """

    class Meta:
        model = CustomUser  ## The model that this form is associated with.
        fields = ('friends',) ## The fields to include in the form.