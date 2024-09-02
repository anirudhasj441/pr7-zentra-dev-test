"""
@file models.py
@brief Model definitions for handling interest requests between users.
@details This file contains the model for managing interest requests, 
         including the status of requests, timestamps, and relationships 
         between users.
"""

from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.utils import timezone

User = get_user_model()

# --------------------------------------------------------------
# @class IntrestRequest
# @brief Model representing an interest request between users.
# @details This model handles the storage and management of interest requests 
#          that one user sends to another. It includes fields for the request's 
#          status, the users involved, and a timestamp.
# --------------------------------------------------------------
class IntrestRequest(models.Model):
    # @brief Choices for the status of the interest request.
    # @details Defines the possible statuses for an interest request, such as "pending", "accept", or "reject".
    STATUS_CHOICES = (
        ("pending", "PENDING"),
        ("accept", "ACCEPT"),
        ("reject", "REJECT")
    )

    # @brief Timestamp for when the interest request was created.
    # @details This field records the date and time when the interest request was made. 
    #          Defaults to the current date and time.
    dt = models.DateTimeField(default=timezone.now)
    
    # @brief The user who sends the request.
    # @details This ForeignKey links to the User model and indicates the user who initiated the interest request.
    # @param related_name A related name for reverse lookup.
    request_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_from")
    
    # @brief The user who receives the request.
    # @details This ForeignKey links to the User model and indicates the user who is the target of the interest request.
    # @param related_name A related name for reverse lookup.
    request_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_to")
    
    # @brief The current status of the interest request.
    # @details This CharField stores the status of the interest request, using the STATUS_CHOICES for validation.
    # @param max_length The maximum length of the status string.
    # @param choices Defines the allowable values for the status.
    # @param default The default status for new interest requests.
    status = models.CharField(max_length=1000, choices=STATUS_CHOICES, default="pending")
    
class Chat(models.Model):
    initiator = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="initiator_chat"
    )
    acceptor = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="acceptor_name"
    )
    short_id = models.CharField(max_length=255, default=uuid.uuid4, unique=True)


class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
