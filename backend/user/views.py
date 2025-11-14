from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .serializers import UserSerializer

from authentication.views import CookieJWTAuthentication

class BaseAuth:
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

class GetUserView(BaseAuth, APIView):
    @extend_schema(responses=UserSerializer, description="Obtaining current user data")
    def get(self, request):
        user = request.user
        if not user:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateUserView(BaseAuth, APIView):
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    @extend_schema(
        request=UserSerializer,
        responses={
            200: OpenApiResponse(
                description="User updated successfully", response=UserSerializer
            ),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="User not found"),
        },
        description="Update user",
    )
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if "password" in serializer.validated_data:
                password = serializer.validated_data.pop("password")
                if not user.check_password(password):
                    return Response(
                        {"detail": "Incorrect current password"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            serializer.save()
            return Response({"detail": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if "password" in serializer.validated_data:
                current_password = serializer.validated_data.pop("password", None)
                new_password = serializer.validated_data.pop("new_password", None)
                
                if not user.check_password(current_password):
                    return Response(
                        {"detail": "Incorrect current password"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
                if new_password:
                    user.set_password(new_password)
                    user.save()

            serializer.save()
            return Response({"detail": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteUserView(BaseAuth, APIView):
    @extend_schema(
        request=UserSerializer,
        responses={
            200: OpenApiResponse(description="User deleted successfully"),
            404: OpenApiResponse(description="User not found"),
        },
        description="Delete user",
    )
    def delete(self, request):
        user = request.user
        user.delete()
        return Response(
            {"detail": "User deleted successfully"},
            status=status.HTTP_200_OK
        )