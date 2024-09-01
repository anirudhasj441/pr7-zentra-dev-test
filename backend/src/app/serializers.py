from rest_framework.serializers import ModelSerializer, ValidationError
from .models import IntrestRequest
from authentication.serializers import userSerializer

class IntrestRequestSerializer(ModelSerializer):
    request_to = userSerializer(read_only = True)
    request_from = userSerializer(read_only= True)
    class Meta:
        model = IntrestRequest
        fields = [
            'id',
            'request_from',
            'request_to',
            'status'
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
    