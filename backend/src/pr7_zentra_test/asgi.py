"""
ASGI config for pr7_zentra_test project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

print("calliing .....")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pr7_zentra_test.settings')

django_asgi_app = get_asgi_application()


import socketio
from app.sockets import sio

application = socketio.ASGIApp(sio, django_asgi_app)
