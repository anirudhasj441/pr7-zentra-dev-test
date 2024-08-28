"""
@file views.py

This module contains API views for user authentication and registration using Django Rest Framework.
It includes views for checking username availability, user registration, and user login. JWT tokens
are utilized for authentication, and user data is managed using Django's built-in User model.

@module
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import userSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout

def getUserToken(user):
    """
    @brief Generates JWT tokens for the given user.

    This function creates and returns refresh and access tokens using the `RefreshToken`
    class from the `rest_framework_simplejwt` package.

    @param user The user object for whom tokens are generated.

    @return A dictionary containing 'refresh' and 'access' tokens as strings.
    """
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

class UserAvailability(APIView):
    """
    @brief API view to check the availability of a username.

    This view handles POST requests to determine if a given username is available in the database.
    """

    def post(self, request):
        """
        @brief Handles POST requests to check username availability.

        @param request The HTTP request object containing the username to check.

        @return Response A Response object indicating whether the username is available.
        """
        data = request.data
        user = User.objects.filter(username=data['username']).first()
        if user is None:
            return Response({
                'user_available': True
            }, status=status.HTTP_200_OK)

        return Response({
            'user_available': False
        }, status=status.HTTP_200_OK)

class SignUpUser(APIView):
    """
    @brief API view to handle user registration.

    This view handles POST requests for creating a new user. It validates the input data using
    a serializer, creates a user, and generates JWT tokens.
    """

    def post(self, request):
        """
        @brief Handles POST requests for user registration.

        @param request The HTTP request object containing user registration data.

        @return Response A Response object with registration status and JWT tokens upon success.
        """
        serializer = userSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                'status': 500,
                'error': serializer.errors,
                'message': "Something went wrong"
            }, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'payload': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)

class LoginUser(APIView):
    """
    @brief API view to handle user login.

    This view processes POST requests for user authentication. It validates the credentials, generates
    JWT tokens upon successful login, and returns them in the response.
    """

    def post(self, request):
        """
        @brief Handles POST requests for user login.

        @param request The HTTP request object containing username and password.

        @return Response A Response object with login status, JWT tokens, and user data upon success.
        """
        data = request.data
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"detail": "No active account found with the given credentials"},
                            status=status.HTTP_401_UNAUTHORIZED)

        tokens = getUserToken(user)
        response = Response()
        # Optionally, set cookies for the tokens if needed (currently commented out)
        # response.set_cookie(
        #     key=settings.SIMPLE_JWT["AUTH_COOKIE"],
        #     value=tokens["access"],
        #     expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        #     secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
        #     httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
        #     samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"]
        # )
        # csrf.get_token(request)
        serializer = userSerializer(User.objects.get(username=user))
        response.data = {
            'message': 'Login successful',
            'refresh': tokens["refresh"],
            'access': tokens["access"],
            'user': serializer.data
        }
        response.status = status.HTTP_200_OK
        return response
