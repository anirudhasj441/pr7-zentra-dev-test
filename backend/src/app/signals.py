from .models import IntrestRequest
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=IntrestRequest)
def addFriend(sender, instance, **kwargs):
    print("Calling signal...")

    if(instance.status is not "accept"): return
    instance.request_to.friends.add(instance.request_from)
    instance.request_from.friends.add(instance.request_to)