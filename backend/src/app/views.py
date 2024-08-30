from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import IntrestRequestSerializer
from django.contrib.auth.models import User
# Create your views here.


class IndexView(APIView):
    def get(self, request):
        return Response({
            "msg": "Hello World"
        })
    
class SendRequest(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        requestTo = User.objects.get(username=request.data["request_to"])

        data = {
            "request_from": request.user.pk,
            "request_to": requestTo.pk
        }

        serializer = IntrestRequestSerializer(data=data)

        if not serializer.is_valid():
            return Response({
                'status': 400,
                'error': serializer.errors,
                'message': "Something went wrong"
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response({
            'payload': serializer.data,
            'message': 'request sent successfully'
        }, status= status.HTTP_201_CREATED)
