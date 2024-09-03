"""
@file views.py
@brief Contains the views for handling requests in the application.
@details This file defines the views for the application using Django's APIView class.
         It includes views for handling interest requests between users, such as 
         creating, updating, and listing requests, as well as checking if a request exists.
"""

from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import IntrestRequestSerializer, ChatSerializer, MessageSerializer
from django.contrib.auth import get_user_model
from .models import IntrestRequest, Chat, ChatMessage
from authentication.serializers import userSerializer
from django.db.models import Q

User = get_user_model()

# --------------------------------------------------------------
# @class IndexView
# @brief View for returning a simple greeting message.
# @details This view handles GET requests and returns a response with a greeting message.
# --------------------------------------------------------------
class IndexView(APIView):
    """
    @brief Handles GET requests for the IndexView.
    @param request The HTTP request object.
    @return Response A Response object containing a greeting message.
    """
    def get(self, request):
        return Response({
            "msg": "Hello World"
        })


# --------------------------------------------------------------
# @class IntrestRequestView
# @brief View for handling IntrestRequest operations.
# @details This view handles GET, POST, and PATCH requests for managing IntrestRequest instances.
#          Only authenticated users are allowed to access this view.
# --------------------------------------------------------------
class IntrestRequestView(APIView):
    permission_classes = [IsAuthenticated]

    """
    @brief Handles GET requests to retrieve pending IntrestRequest instances.
    @param request The HTTP request object.
    @return Response A Response object containing the serialized data of pending requests.
    """
    def get(self, request):
        intrest_requests = IntrestRequest.objects.filter(request_to=request.user, status="pending")
        serializer = IntrestRequestSerializer(intrest_requests, many=True)
        return Response({
            "payload": serializer.data
        }, status=status.HTTP_200_OK)

    """
    @brief Handles POST requests to create a new IntrestRequest.
    @param request The HTTP request object containing the request data.
    @return Response A Response object containing the status and message of the request.
    """
    def post(self, request):
        requestTo = User.objects.get(username=request.data["request_to"])
        intres_request = IntrestRequest.objects.create(
            request_from=request.user,
            request_to=requestTo
        )
        serializer = IntrestRequestSerializer(intres_request)
        return Response({
            'payload': serializer.data,
            'message': 'request sent successfully'
        }, status=status.HTTP_201_CREATED)

    """
    @brief Handles PATCH requests to update an existing IntrestRequest.
    @param request The HTTP request object containing the update data.
    @return Response A Response object containing the updated data or an error message.
    """
    def patch(self, request):
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
        return Response({
            'payload': serializer.data,
        }, status=status.HTTP_200_OK)


# --------------------------------------------------------------
# @class ListUsers
# @brief View for listing users excluding those with existing interest requests.
# @details This view handles GET requests to retrieve a list of users that the 
#          current user has not sent an interest request to.
# --------------------------------------------------------------
class ListUsers(APIView):
    permission_classes = [IsAuthenticated]

    """
    @brief Handles GET requests to list users.
    @param request The HTTP request object.
    @return Response A Response object containing a list of serialized user data.
    """
    def get(self, request):
        query = request.query_params.get('s')
        intrest_requests = IntrestRequest.objects.filter(request_from=request.user)
        
        exclude_users = [intrest_request.request_to.username for intrest_request in intrest_requests]
        
        if query is None:
            users = User.objects.all().exclude(
                Q(username = request.user.username) | 
                Q(username__in=exclude_users) | 
                Q(friends=request.user)
            )
        else:
            users = User.objects.filter(username__icontains=query).exclude(
                Q(username = request.user.username) | 
                Q(username__in=exclude_users) | 
                Q(friends=request.user)
            )
        
        serializer = userSerializer(users, many=True)
        return Response({
            "payload": serializer.data
        })


# --------------------------------------------------------------
# @class IntrestRequestExists
# @brief View for checking if an interest request has been sent.
# @details This view handles POST requests to check if an interest request has already 
#          been sent from the current user to another user.
# --------------------------------------------------------------
class IntrestRequestExists(APIView):
    permission_classes = [IsAuthenticated]

    """
    @brief Handles POST requests to check if an interest request exists.
    @param request The HTTP request object containing the username to check against.
    @return Response A Response object indicating whether the request exists.
    """
    def post(self, request):
        request_from = User.objects.get(username=request.data["username"])
        intrest_request = IntrestRequest.objects.filter(request_to=request.user, request_from=request_from)
        return Response({
            "request_sent": intrest_request.exists()
        }, status=status.HTTP_200_OK)
        
class ChatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        chats = Chat.objects.filter(Q(initiator = request.user) | Q(acceptor = request.user))
        
        serializer = ChatSerializer(chats, many=True)
        
        return Response({
            "payload": serializer.data
        }, status=status.HTTP_200_OK)
        
    def post(self, request):
        acceptor = User.objects.get(username=request.data["acceptor"])
        data = {
            "initiator": request.user.pk,
            "acceptor": acceptor.pk
        }

        chat = Chat.objects.create(
            initiator = request.user,
            acceptor = acceptor
        )
        
        serializer = ChatSerializer(chat)
        
        return Response({
            "payload": serializer.data
        })
    
class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chat_id = request.query_params.get("chat_id")

        if chat_id is None: 
            return Response({
                "payload": []
            })
        
        messages = ChatMessage.objects.filter(chat__short_id = chat_id)

        serializer = MessageSerializer(messages, many=True)

        return Response({
            "payload": serializer.data
        })