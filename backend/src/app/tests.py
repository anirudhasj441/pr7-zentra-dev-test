from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import IntrestRequest, Chat, ChatMessage
from .serializers import userSerializer

User = get_user_model()

class TestSetup(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='password123')
        self.user2 = User.objects.create_user(username='user2', password='password123')

        self.intrest_request = IntrestRequest.objects.create(request_from=self.user2, request_to=self.user1)

        self.chat = Chat.objects.create(initiator=self.user1, acceptor=self.user2)
        self.chat_message = ChatMessage.objects.create(chat=self.chat, sender=self.user1, text="Hello")

        # Obtain JWT token
        self.token = self.get_jwt_token(self.user1)

    def get_jwt_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def auth_headers(self, token):
        return {'HTTP_AUTHORIZATION': f'Bearer {token}'}

    def tearDown(self):
        return super().tearDown()
    
class IndexViewTest(TestSetup):
    def test_index_view(self):
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"msg": "Hello World"})
        
class IntrestRequestViewTest(TestSetup):
    def test_get_intrest_requests(self):
        url = reverse('request')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)
        

    def test_post_intrest_request(self):
        url = reverse('request')
        data = {"request_to": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'request sent successfully')

    def test_patch_intrest_request(self):
        url = reverse('request')
        data = {"request_id": self.intrest_request.id, "status": "accept"}
        # print(data)
        response = self.client.patch(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['payload']['status'], "accept")
        
class ListUsersTest(TestSetup):
    def test_list_users(self):
        url = reverse('list_users')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)
        self.assertEqual(response.data['payload'][0]['username'], "user2")

    def test_list_users_with_query(self):
        url = reverse('list_users') + '?s=user'
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)
        
class IntrestRequestExistsTest(TestSetup):
    def test_intrest_request_exists(self):
        url = reverse('check_request_sent')
        data = {"username": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['request_sent'])
        
class ChatsViewTest(TestSetup):
    def test_get_chats(self):
        url = reverse('chats')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)

    def test_post_chat(self):
        url = reverse('chats')
        data = {"acceptor": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        serializer = userSerializer(self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['payload']['initiator'], serializer.data)
        
class MessageViewTest(TestSetup):
    def test_get_messages(self):
        url = reverse('messages') + f'?chat_id={self.chat.short_id}'
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)

    def test_get_messages_no_chat_id(self):
        url = reverse('messages')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 0)