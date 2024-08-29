from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class IntrestRequest(models.Model):
    STATUS_CHOICES = (
        ("pending", "PENDING"),
        ("accept", "ACCEPT"),
        ("reject", "REJECT")
    )
    dt = models.DateTimeField(default=timezone.now)
    request_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_from")
    request_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_to")
    status = models.CharField(max_length=1000, choices=STATUS_CHOICES, default="pending")
    