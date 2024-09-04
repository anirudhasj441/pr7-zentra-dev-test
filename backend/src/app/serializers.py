"""
@file serializers.py
@brief Serializers for handling IntrestRequest model data.
@details This file contains the serializer for the IntrestRequest model, which includes 
         field definitions, validation logic, and nested user serializers.
"""

from rest_framework.serializers import ModelSerializer, ValidationError
from .models import IntrestRequest, Chat, ChatMessage
from authentication.serializers import userSerializer

class IntrestRequestSerializer(ModelSerializer):
    """
    @brief Serializer for the IntrestRequest model.
    @details This serializer handles the serialization and deserialization of 
             IntrestRequest instances, including validation and nested user serializers.
    """
    
    request_to = userSerializer(read_only=True)
    """
    @brief The user who receives the request.
    @details This field represents the user to whom the interest request is sent. 
             It is a read-only field and uses the userSerializer to serialize the user data.
    """
    
    request_from = userSerializer(read_only=True)
    """
    @brief The user who sends the request.
    @details This field represents the user who initiates the interest request. 
             It is a read-only field and uses the userSerializer to serialize the user data.
    """
    
    class Meta:
        """
        @brief Meta options for the IntrestRequestSerializer.
        @details This inner class defines the model being serialized and the fields to include 
                 in the serialized representation.
        """
        
        model = IntrestRequest
        """ @brief The model being serialized. """
        
        fields = [
            'id',
            'request_from',
            'request_to',
            'status'
        ]
        """ @brief The fields to include in the serialized output. """

    def validate(self, data):
        """
        @brief Validates the data before saving.
        @details Checks if the 'request_from' and 'request_to' fields are included in the data 
                 unless the request is partial (e.g., partial update).
        @param data The data dictionary that needs validation.
        @return Returns the validated data if all required fields are present.
        @throws ValidationError if any required field is missing in the data.
        """
        required_fields = [
            "request_from",
            "request_to"
        ]
        
        # If this is a partial update, skip validation for missing required fields.
        if self.partial:
            return data
        
        # Check for each required field in the data.
        for field in required_fields:
            if field not in data.keys():
                raise ValidationError({field: f"{field} is required"})
            
        return data
    
class MessageSerializer(ModelSerializer):
    """
    @brief Serializer for the ChatMessage model.
    @details This serializer handles the serialization of chat messages, excluding the 'chat' field.
    """
    
    sender = userSerializer(read_only=True)
    """
    @brief The user who sent the message.
    @details This field represents the user who sent the chat message. 
             It is a read-only field and uses the userSerializer to serialize the user data.
    """
    
    class Meta:
        """
        @brief Meta options for the MessageSerializer.
        @details This inner class defines the model being serialized and the fields to include 
                 in the serialized representation.
        """
        
        model = ChatMessage
        """ @brief The model being serialized. """
        
        exclude = ("chat",)
        """ @brief Fields to exclude from the serialized output. """

class ChatSerializer(ModelSerializer):
    """
    @brief Serializer for the Chat model.
    @details This serializer handles the serialization of Chat instances, including nested user data.
    """
    
    initiator = userSerializer(read_only=True)
    """
    @brief The user who initiated the chat.
    @details This field represents the user who initiated the chat. 
             It is a read-only field and uses the userSerializer to serialize the user data.
    """
    
    acceptor = userSerializer(read_only=True)
    """
    @brief The user who accepted the chat.
    @details This field represents the user who accepted the chat request. 
             It is a read-only field and uses the userSerializer to serialize the user data.
    """
    
    class Meta:
        """
        @brief Meta options for the ChatSerializer.
        @details This inner class defines the model being serialized and the fields to include 
                 in the serialized representation.
        """
        
        model = Chat
        """ @brief The model being serialized. """
        
        fields = ["short_id", "initiator", "acceptor"]
        """ @brief The fields to include in the serialized output. """
        
    def validate(self, data):
        """
        @brief Validates the data before saving.
        @details This method performs additional validation checks if needed.
        @param data The data dictionary that needs validation.
        @return Returns the validated data.
        """
        return data
