"""
@file views.py
@brief Contains the views for handling requests in the application.

This file defines the views for the application using Django's APIView class.
It includes the `IndexView` for simple GET requests and the `IntrestRequestView` 
for handling POST and PATCH requests related to IntrestRequest instances.

@module
"""

from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import IntrestRequestSerializer
from django.contrib.auth.models import User
from .models import IntrestRequest

# Create your views here.

class IndexView(APIView):
    """
    @brief View for returning a simple greeting message.

    This view handles GET requests and returns a response with a greeting message.
    """
    
    def get(self, request):
        """
        @brief Handles GET requests for the IndexView.

        @param request The HTTP request object.
        @return Response A Response object containing a greeting message.
        """
        return Response({
            "msg": "Hello World"
        })


class IntrestRequestView(APIView):
    """
    @brief View for handling IntrestRequest operations.

    This view handles POST and PATCH requests for creating and updating IntrestRequest instances.
    Only authenticated users are allowed to access this view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        @brief Handles POST requests to create a new IntrestRequest.

        @param request The HTTP request object containing the request data.
        @return Response A Response object containing the status and message of the request.
        """
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
        }, status=status.HTTP_201_CREATED)
        
    def patch(self, request):
        """
        @brief Handles PATCH requests to update an existing IntrestRequest.

        @param request The HTTP request object containing the update data.
        @return Response A Response object containing the updated data or an error message.
        """
        data = request.data
        
        intrest_request = IntrestRequest.objects.get(id=data["request_id"])
        
        serializer = IntrestRequestSerializer(intrest_request, data={"status": data["status"]}, partial=True)
        
        if not serializer.is_valid():
            return Response({
                'status': 400, 
                'error': serializer.errors, 
                'message': "something went wrong"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        print("user: ", type(user))
        return Response({
            'payload': serializer.data,
        }, status=status.HTTP_200_OK)
