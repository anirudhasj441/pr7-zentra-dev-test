import socketio

import json
from asgiref.sync import sync_to_async

mgr = socketio.AsyncRedisManager("redis://127.0.0.1:6379")

sio = socketio.AsyncServer(
    async_mode="asgi", client_manager=mgr, cors_allowed_origins="*"
)

@sio.on("connect")
async def connect(sid, env, auth):
    print(env["QUERY_STRING"].split("=")[1])