"""
@file admin.py
@brief Django admin configuration for the IntrestRequest model.
@details This file contains the admin interface customization for the 
         IntrestRequest model, including how the model is displayed in 
         the Django admin panel.
"""

from django.contrib import admin
from .models import IntrestRequest, Chat, ChatMessage

# --------------------------------------------------------------
# @class IntrestRequestAdmin
# @brief Admin interface for the IntrestRequest model.
# @details This class customizes the Django admin interface for the 
#          IntrestRequest model, specifying which fields are displayed 
#          in the list view.
# --------------------------------------------------------------
class IntrestRequestAdmin(admin.ModelAdmin):
    # @brief Fields to display in the list view of the admin interface.
    # @details This attribute specifies the model fields that will be shown 
    #          in the list view of the IntrestRequest entries in the admin panel.
    list_display = [
        "request_from",
        "request_to",
        "status"
    ]

class ChatAdmin(admin.ModelAdmin):
    list_display = [
        "short_id",
        "initiator",
        "acceptor",
    ]

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = [
        "created_at",
        "chat",
        "sender",
        "text"
    ]
# --------------------------------------------------------------
# @brief Registers the IntrestRequest model with the Django admin.
# @details This statement registers the IntrestRequest model with the 
#          Django admin site, using the IntrestRequestAdmin class for customization.
# --------------------------------------------------------------
admin.site.register(IntrestRequest, IntrestRequestAdmin)

admin.site.register(Chat,ChatAdmin)
admin.site.register(ChatMessage,ChatMessageAdmin)