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
from authentication.serializers import userSerializer

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
    
    def get(self, request):
        intrest_requests = IntrestRequest.objects.filter(request_to = request.user, status="pending")
        
        serializer = IntrestRequestSerializer(intrest_requests, many=True)
        
        return Response({
            "payload": serializer.data
        }, status=status.HTTP_200_OK)
    
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

        intres_request = IntrestRequest.objects.create(
            request_from=request.user,
            request_to=requestTo
        )

        serializer = IntrestRequestSerializer(intres_request)

        print(serializer.data)

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
        
class ListUsers(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        query = request.query_params.get('s')
        intrest_requests = IntrestRequest.objects.filter(request_from=request.user)
        
            
        exclude_users = [intrest_request.request_to.username for intrest_request in intrest_requests ]
        exclude_users.append(request.user.username)
        
        if(query is None):
            users = User.objects.all().exclude(username__in=exclude_users)
        else:
            users = User.objects.filter(username__icontains=query).exclude(username__in=exclude_users)
        
        print(exclude_users)
        
        # users.exclude(username = exclude_users)
        print(users)
        serializer = userSerializer(users, many=True)
        
        return Response({
            "payload": serializer.data
        })
        
class IntrestRequestExists(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request_from = User.objects.get(username = request.data["username"])
        
        intrest_request = IntrestRequest.objects.filter(request_to=request.user, request_from=request_from)
        
        return Response({
            "request_sent": intrest_request is not None
        }, status=status.HTTP_200_OK)