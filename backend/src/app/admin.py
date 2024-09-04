"""
@file admin.py
@brief Django admin configuration for the IntrestRequest model.
@details This file contains the admin interface customization for the 
         IntrestRequest model, including how the model is displayed in 
         the Django admin panel.
"""

from django.contrib import admin
from .models import IntrestRequest, Chat, ChatMessage

class IntrestRequestAdmin(admin.ModelAdmin):
    """
    @brief Admin interface for the IntrestRequest model.
    @details This class customizes the Django admin interface for the 
             IntrestRequest model, specifying which fields are displayed 
             in the list view.
    """
    
    list_display = [
        "request_from",
        "request_to",
        "status"
    ]

class ChatAdmin(admin.ModelAdmin):
    """
    @brief Admin interface for the Chat model.
    @details This class customizes the Django admin interface for the 
             Chat model, specifying which fields are displayed 
             in the list view.
    """
    
    list_display = [
        "short_id",
        "initiator",
        "acceptor",
    ]

class ChatMessageAdmin(admin.ModelAdmin):
    """
    @brief Admin interface for the ChatMessage model.
    @details This class customizes the Django admin interface for the 
             ChatMessage model, specifying which fields are displayed 
             in the list view.
    """
    
    list_display = [
        "created_at",
        "chat",
        "sender",
        "text"
    ]

"""
@brief Registers the IntrestRequest, Chat, and ChatMessage models with the Django admin.
@details These statements register the IntrestRequest, Chat, and ChatMessage models with the 
         Django admin site, using their respective admin classes for customization.
"""
admin.site.register(IntrestRequest, IntrestRequestAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
