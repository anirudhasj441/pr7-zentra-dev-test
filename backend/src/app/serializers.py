"""
@file serializers.py
@brief Serializers for handling IntrestRequest model data.
@details This file contains the serializer for the IntrestRequest model, which includes 
         field definitions, validation logic, and nested user serializers.
"""

from rest_framework.serializers import ModelSerializer, ValidationError
from .models import IntrestRequest, Chat, ChatMessage
from authentication.serializers import userSerializer

# --------------------------------------------------------------
# @class IntrestRequestSerializer
# @brief Serializer for the IntrestRequest model.
# @details This serializer handles the serialization and deserialization of 
#          IntrestRequest instances, including validation and nested user serializers.
# --------------------------------------------------------------
class IntrestRequestSerializer(ModelSerializer):
    # @brief The user who receives the request.
    # @details This field represents the user to whom the interest request is sent. 
    #          It is a read-only field and uses the userSerializer to serialize the user data.
    request_to = userSerializer(read_only=True)
    
    # @brief The user who sends the request.
    # @details This field represents the user who initiates the interest request. 
    #          It is a read-only field and uses the userSerializer to serialize the user data.
    request_from = userSerializer(read_only=True)

    # --------------------------------------------------------------
    # @brief Meta options for the IntrestRequestSerializer.
    # @details This inner class defines the model being serialized and the fields to include 
    #          in the serialized representation.
    # --------------------------------------------------------------
    class Meta:
        # @brief The model being serialized.
        model = IntrestRequest
        
        # @brief The fields to include in the serialized output.
        fields = [
            'id',
            'request_from',
            'request_to',
            'status'
        ]

    # --------------------------------------------------------------
    # @name validate
    # @brief Custom validation method for IntrestRequestSerializer.
    # @details This method performs additional validation checks to ensure 
    #          that required fields are present when creating or updating an instance.
    # @param data The data to validate.
    # @return The validated data or raises a ValidationError if validation fails.
    # --------------------------------------------------------------
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
    sender = userSerializer(read_only=True)
    class Meta:
        model = ChatMessage
        exclude = ("chat",)


class ChatSerializer(ModelSerializer):
    # messages = MessageSerializer(many=True, read_only=True)
    initiator = userSerializer(read_only = True)
    acceptor = userSerializer(read_only=True)
    class Meta:
        model = Chat
        fields = ["short_id", "initiator", "acceptor"]
        
    def validate(self, data):
        return data