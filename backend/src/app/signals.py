"""
@file signals.py
@brief Signal handlers for IntrestRequest model.
@details This file contains the signal handlers that manage the actions triggered 
         after saving an IntrestRequest instance, such as adding users as friends 
         when a request is accepted.
"""

from .models import IntrestRequest
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Chat
from .sockets import sio
from .serializers import ChatSerializer

User = get_user_model()

@receiver(post_save, sender=IntrestRequest)
def addFriend(sender, instance, **kwargs):
    """
    @brief Adds users as friends upon accepting an IntrestRequest.
    @details This signal is triggered after an IntrestRequest instance is saved. 
             If the request status is "accept", it adds the requesting user and 
             the requested user as friends in the database.

    @param sender The model class that sent the signal (IntrestRequest).
    @param instance The actual IntrestRequest instance being saved.
    @param kwargs Additional keyword arguments passed to the signal.
    """
    # Check if the request status is "accept"
    if instance.status != "accept":
        return
    
    # Create a chat between the initiator and the acceptor
    chat = Chat.objects.create(
        initiator=instance.request_from,
        acceptor=instance.request_to
    )

    # Add both users as friends
    instance.request_to.friends.add(instance.request_from)
    instance.request_from.friends.add(instance.request_to)