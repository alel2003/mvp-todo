from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse

from user.models import User
from user.serializers import CreateUserSerializer, UserSerializer

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get("access_token")
        if raw_token is None:
            return None 
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token


class SignUpView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=CreateUserSerializer,
        responses={
            201: OpenApiResponse(description="User created", response=UserSerializer),
            400: OpenApiResponse(description="Validation error")
        },
        description="New user registration",
        examples=[
            OpenApiExample(
                "Example of a request",
                value={"email": "user@example.com", "password": "secret123"}
            )
        ]
    )

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            response = Response(
               {"detail": "Sign-up successful"}, status=200
            )

            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=settings.CORS_ALLOW_CREDENTIALS,  
                samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax", 
                max_age=60 * 60
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=settings.CORS_ALLOW_CREDENTIALS,  
                samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax", 
                max_age=7 * 24 * 60 * 60,
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "email": {"type": "string", "example": "user@example.com"},
                    "password": {"type": "string", "example": "secret123"}
                },
                "required": ["email", "password"]
            }
        },
        responses={
            200: OpenApiResponse(description="Login successful"),
            401: OpenApiResponse(description="Invalid credentials"),
        },
        description="User authorization"
    )

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        user = User.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            response = Response(
               {"detail": "Sign-up successful"}, status=200
            )

            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=settings.CORS_ALLOW_CREDENTIALS,  
                samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax", 
                max_age=60 * 60,
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=settings.CORS_ALLOW_CREDENTIALS,  
                samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax", 
                max_age=7 * 24 * 60 * 60,
            )

            return response

        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class RefreshTokenView(APIView):
    @extend_schema(
        request=None,
        responses={
            200: OpenApiResponse(description="Access token refreshed"),
            401: OpenApiResponse(description="Invalid or missing refresh token"),
        },
        description="Updating an access token with a refresh token"
    )

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"detail": "Refresh token not found"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)  
            access_token = str(refresh.access_token) 
        except Exception:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        response = Response({"detail": "Refresh successful"}, status=status.HTTP_200_OK)

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=settings.CORS_ALLOW_CREDENTIALS,
            samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax",
            max_age=60 * 60,  
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=settings.CORS_ALLOW_CREDENTIALS,
            samesite="None" if settings.CORS_ALLOW_CREDENTIALS else "Lax",
            max_age=7 * 24 * 60 * 60, 
        )

        return response