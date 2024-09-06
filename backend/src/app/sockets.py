"""
@file sockets.py
@brief Socket.IO server setup and event handlers for chat functionality.
@details This file configures the Socket.IO server and defines event handlers for 
         managing chat connections and message exchanges.
"""

import socketio
import json
from asgiref.sync import sync_to_async
from .serializers import MessageSerializer, ChatSerializer
from django.contrib.auth import get_user_model
from .models import ChatMessage, Chat
from dotenv import load_dotenv
from django.conf import settings
import os

load_dotenv(os.path.join(settings.BASE_DIR, '.env'))

User = get_user_model()

"""
@brief Configures the Redis manager for Socket.IO.
@details This creates an AsyncRedisManager for handling communication between 
         multiple instances of the Socket.IO server via Redis.
"""
mgr = socketio.AsyncRedisManager(os.getenv('REDIS_URL'))

"""
@brief Initializes the Socket.IO server.
@details This sets up the AsyncServer with ASGI mode, allowing cross-origin 
         requests from any origin.
"""
sio = socketio.AsyncServer(
    async_mode="asgi", client_manager=mgr, cors_allowed_origins="*"
)

@sio.on("connect")
async def connect(sid, env, auth):
    """
    @brief Handles client connections to the Socket.IO server.
    @details This event handler is triggered when a client successfully connects to the server.
    @param sid The session ID for the connected client.
    @param env The environment in which the connection is established.
    @param auth Authentication data provided by the client, if any.
    """
    print("Client connected...")

@sio.on("connect:chat")
async def connectChat(sid, data):
    """
    @brief Handles a client's request to join a chat room.
    @details This event handler allows a client to join a specific chat room based on the chat ID provided.
    @param sid The session ID for the connected client.
    @param data A dictionary containing the chat ID.
    """
    data = data

    await sio.enter_room(sid, data["chat_id"])
    payload = {
        "msg": "Entered the room"
    }
    await sio.emit("message:notification", payload)

@sio.on("message:send")
async def messageRecieve(sid, data):
    """
    @brief Handles the reception of a message from a client.
    @details This event handler processes incoming messages, saves them to the database,
             and broadcasts them to all clients in the relevant chat room.
    @param sid The session ID for the connected client.
    @param data A dictionary containing the sender's username and the message content.
    """
    data = data
    sender = await sync_to_async(User.objects.get)(username=data["sender"])
    chat = await sync_to_async(Chat.objects.get)(short_id=data["chat_id"])
    
    message = await sync_to_async(ChatMessage.objects.create, thread_sensitive=True)(
        chat=chat,
        sender=sender,
        text=data["message"]
    )

    serializer = MessageSerializer(message)

    await sio.emit("message:recieve", serializer.data, room=data["chat_id"])