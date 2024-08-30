from rest_framework.serializers import ModelSerializer, ValidationError
from .models import IntrestRequest

class IntrestRequestSerializer(ModelSerializer):
    class Meta:
        model = IntrestRequest
        fields = [
            'request_from',
            'request_to'
        ]

    def validate(self, data):
        required_fields = [
            "request_from",
            "request_to"
        ]

        if self.partial:
            return data
        
        for field in required_fields:
            if field not in data.keys():
                raise ValidationError({field: f"{field} is required"})
            
        return data
    