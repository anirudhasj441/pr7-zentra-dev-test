from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

# Create your models here.

class CustomUser(AbstractUser):
    friends = models.ManyToManyField('self', symmetrical=True, related_name='friends_with', null=True, blank=True)
    # dob = models.DateField(null=True, blank=True)

    REQUIRED_FIELDS = []

    objects = UserManager()
