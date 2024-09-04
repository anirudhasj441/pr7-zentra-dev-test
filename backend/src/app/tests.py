"""
@file tests.py
@brief Unit tests for the chat functionality using Django's TestCase.
@details This file contains test cases for various views and models 
         related to the chat application, including IntrestRequest, 
         Chat, and ChatMessage models.
"""

from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import IntrestRequest, Chat, ChatMessage
from .serializers import userSerializer

User = get_user_model()

class TestSetup(APITestCase):
    """
    @brief Setup for the test cases.
    @details This class sets up the initial data required for the test cases, 
             including creating users, IntrestRequest, Chat, and ChatMessage instances. 
             It also provides utility methods to get JWT tokens and set authorization headers.
    """
    
    def setUp(self):
        """
        @brief Initializes test data before each test case.
        @details Creates two users, a chat interest request, a chat, and a chat message. 
                 Also obtains a JWT token for authentication in test requests.
        """
        self.user1 = User.objects.create_user(username='user1', password='password123')
        self.user2 = User.objects.create_user(username='user2', password='password123')

        self.intrest_request = IntrestRequest.objects.create(request_from=self.user2, request_to=self.user1)

        self.chat = Chat.objects.create(initiator=self.user1, acceptor=self.user2)
        self.chat_message = ChatMessage.objects.create(chat=self.chat, sender=self.user1, text="Hello")

        # Obtain JWT token
        self.token = self.get_jwt_token(self.user1)

    def get_jwt_token(self, user):
        """
        @brief Generates a JWT token for a given user.
        @param user The user object for which the JWT token is generated.
        @return The JWT token as a string.
        """
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def auth_headers(self, token):
        """
        @brief Returns the authorization headers for the test requests.
        @param token The JWT token to be included in the authorization header.
        @return A dictionary containing the authorization header.
        """
        return {'HTTP_AUTHORIZATION': f'Bearer {token}'}

    def tearDown(self):
        """
        @brief Cleans up after each test case.
        @details This method is called after each test case to perform any necessary cleanup.
        """
        return super().tearDown()

class IndexViewTest(TestSetup):
    """
    @brief Test case for the index view.
    @details Tests the index view's response status and message content.
    """
    
    def test_index_view(self):
        """
        @brief Tests the index view.
        @details Ensures that the index view returns a 200 OK status and the expected message.
        """
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"msg": "Hello World"})
        
class IntrestRequestViewTest(TestSetup):
    """
    @brief Test case for the IntrestRequest view.
    @details Tests the IntrestRequest view for GET, POST, and PATCH methods.
    """
    
    def test_get_intrest_requests(self):
        """
        @brief Tests retrieving interest requests.
        @details Ensures that the GET request to the IntrestRequest view returns the correct number of requests.
        """
        url = reverse('request')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)

    def test_post_intrest_request(self):
        """
        @brief Tests sending a new interest request.
        @details Ensures that the POST request to the IntrestRequest view successfully creates a new request.
        """
        url = reverse('request')
        data = {"request_to": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'request sent successfully')

    def test_patch_intrest_request(self):
        """
        @brief Tests updating an existing interest request.
        @details Ensures that the PATCH request to the IntrestRequest view updates the request's status.
        """
        url = reverse('request')
        data = {"request_id": self.intrest_request.id, "status": "accept"}
        response = self.client.patch(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['payload']['status'], "accept")
        
class ListUsersTest(TestSetup):
    """
    @brief Test case for the ListUsers view.
    @details Tests the ListUsers view for listing users and querying users by username.
    """
    
    def test_list_users(self):
        """
        @brief Tests listing all users.
        @details Ensures that the GET request to the ListUsers view returns the correct list of users.
        """
        url = reverse('list_users')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)
        self.assertEqual(response.data['payload'][0]['username'], "user2")

    def test_list_users_with_query(self):
        """
        @brief Tests querying users by username.
        @details Ensures that the GET request with a query string returns the correct list of users matching the query.
        """
        url = reverse('list_users') + '?s=user'
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)
        
class IntrestRequestExistsTest(TestSetup):
    """
    @brief Test case for checking if an interest request exists.
    @details Tests the IntrestRequestExists view for checking if a request has been sent.
    """
    
    def test_intrest_request_exists(self):
        """
        @brief Tests checking if an interest request exists.
        @details Ensures that the POST request to the IntrestRequestExists view returns the correct status.
        """
        url = reverse('check_request_sent')
        data = {"username": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['request_sent'])
        
class ChatsViewTest(TestSetup):
    """
    @brief Test case for the Chats view.
    @details Tests the Chats view for retrieving and creating chat instances.
    """
    
    def test_get_chats(self):
        """
        @brief Tests retrieving chat instances.
        @details Ensures that the GET request to the Chats view returns the correct list of chats.
        """
        url = reverse('chats')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)

    def test_post_chat(self):
        """
        @brief Tests creating a new chat instance.
        @details Ensures that the POST request to the Chats view successfully creates a new chat.
        """
        url = reverse('chats')
        data = {"acceptor": "user2"}
        response = self.client.post(url, data, **self.auth_headers(self.token))
        serializer = userSerializer(self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['payload']['initiator'], serializer.data)
        
class MessageViewTest(TestSetup):
    """
    @brief Test case for the Message view.
    @details Tests the Message view for retrieving chat messages.
    """
    
    def test_get_messages(self):
        """
        @brief Tests retrieving messages for a specific chat.
        @details Ensures that the GET request to the Message view with a chat ID returns the correct list of messages.
        """
        url = reverse('messages') + f'?chat_id={self.chat.short_id}'
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 1)

    def test_get_messages_no_chat_id(self):
        """
        @brief Tests retrieving messages without specifying a chat ID.
        @details Ensures that the GET request to the Message view without a chat ID returns an empty list.
        """
        url = reverse('messages')
        response = self.client.get(url, **self.auth_headers(self.token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['payload']), 0)
