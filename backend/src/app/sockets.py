import socketio

import json
from asgiref.sync import sync_to_async
from .serializers import MessageSerializer, ChatSerializer
from django.contrib.auth import get_user_model
from .models import ChatMessage, Chat

User = get_user_model()

mgr = socketio.AsyncRedisManager("redis://127.0.0.1:6379")

sio = socketio.AsyncServer(
    async_mode="asgi", client_manager=mgr, cors_allowed_origins="*"
)

@sio.on("connect")
async def connect(sid, env, auth):
    print("client conneted...")


@sio.on("connect:chat")
async def connectChat(sid, data):
    data = data

    await sio.enter_room(sid, data["chat_id"])
    payload = {
        "msg": "Enter in room"
    }
    await sio.emit("message:notification", payload)

@sio.on("message:send")
async def messageRecieve(sid, data):
    data = data
    sender = await sync_to_async(User.objects.get)(username=data["sender"])
    chat = await sync_to_async(Chat.objects.get)(short_id = data["chat_id"])
    message = await sync_to_async(ChatMessage.objects.create, thread_sensitive=True) (
        chat = chat,
        sender=sender,
        text=data["message"]
    )

    serializer = MessageSerializer(message)

    await sio.emit("message:recieve", serializer.data, room=data["chat_id"])