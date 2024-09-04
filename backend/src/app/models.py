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

class IntrestRequest(models.Model):
    """
    @class IntrestRequest
    @brief Model representing an interest request between users.
    @details This model handles the storage and management of interest requests 
             that one user sends to another. It includes fields for the request's 
             status, the users involved, and a timestamp.
    """

    STATUS_CHOICES = (
        ("pending", "PENDING"),
        ("accept", "ACCEPT"),
        ("reject", "REJECT")
    )
    """
    @brief Choices for the status of the interest request.
    @details Defines the possible statuses for an interest request, such as "pending", "accept", or "reject".
    """

    dt = models.DateTimeField(default=timezone.now)
    """
    @brief Timestamp for when the interest request was created.
    @details This field records the date and time when the interest request was made. 
             Defaults to the current date and time.
    """

    request_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_from")
    """
    @brief The user who sends the request.
    @details This ForeignKey links to the User model and indicates the user who initiated the interest request.
    @param related_name A related name for reverse lookup.
    """

    request_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_to")
    """
    @brief The user who receives the request.
    @details This ForeignKey links to the User model and indicates the user who is the target of the interest request.
    @param related_name A related name for reverse lookup.
    """

    status = models.CharField(max_length=1000, choices=STATUS_CHOICES, default="pending")
    """
    @brief The current status of the interest request.
    @details This CharField stores the status of the interest request, using the STATUS_CHOICES for validation.
    @param max_length The maximum length of the status string.
    @param choices Defines the allowable values for the status.
    @param default The default status for new interest requests.
    """

class Chat(models.Model):
    """
    @class Chat
    @brief Model representing a chat session between two users.
    @details This model defines a chat session, including the users involved and a unique identifier for the chat.
    """
    
    initiator = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="initiator_chat"
    )
    """
    @brief The user who initiates the chat.
    @details This ForeignKey links to the User model and indicates the user who started the chat session.
    @param related_name A related name for reverse lookup.
    """

    acceptor = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="acceptor_name"
    )
    """
    @brief The user who accepts the chat.
    @details This ForeignKey links to the User model and indicates the user who joins the chat session.
    @param related_name A related name for reverse lookup.
    """

    short_id = models.CharField(max_length=255, default=uuid.uuid4, unique=True)
    """
    @brief A unique identifier for the chat session.
    @details This CharField stores a unique identifier for the chat, generated using UUID.
    @param max_length The maximum length of the identifier string.
    @param default The default value, which is a generated UUID.
    @param unique Ensures the identifier is unique.
    """

class ChatMessage(models.Model):
    """
    @class ChatMessage
    @brief Model representing a message in a chat session.
    @details This model defines a message sent within a chat session, including the sender, the message text, and a timestamp.
    """

    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    """
    @brief The chat session to which the message belongs.
    @details This ForeignKey links to the Chat model and indicates the chat session the message is part of.
    @param related_name A related name for reverse lookup.
    """

    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    """
    @brief The user who sends the message.
    @details This ForeignKey links to the User model and indicates the user who sent the message.
    """

    text = models.TextField()
    """
    @brief The content of the message.
    @details This TextField stores the actual message text sent by the user.
    """

    created_at = models.DateTimeField(default=timezone.now)
    """
    @brief Timestamp for when the message was created.
    @details This field records the date and time when the message was sent. Defaults to the current date and time.
    """