from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse

from authentication.views import CookieJWTAuthentication

from .models import PomodoroSetting
from .serializers import PomodoroSettingSerializer


class BaseAuth:
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

class GetPomodoroSettingView(BaseAuth, APIView):
    @extend_schema(
        responses={
            200: OpenApiResponse(description="Pomodoro success", response=PomodoroSettingSerializer),
            404: OpenApiResponse(description="User not found")
        },
        description="Get current user's settings"
    )
    def get(self, request):
        pomodoro_setting = get_object_or_404(PomodoroSetting, user=request.user)
        serializer = PomodoroSettingSerializer(pomodoro_setting, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreatePomodoroSettingView(BaseAuth, APIView):
    @extend_schema(
        request=PomodoroSettingSerializer,
        responses={
            201: OpenApiResponse(description="Setting created successfully", response=PomodoroSettingSerializer),
            400: OpenApiResponse(description="Validation error")
        },
        description="Create setting"
    )
    def post(self, request):
        serializer = PomodoroSettingSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Create Pomodoro setting success"}, status=201)
        return Response(serializer.errors, status=400)
    

class UpdatePomodoroSettingView(BaseAuth, APIView):
    @extend_schema(
        request=PomodoroSettingSerializer,
        responses={
            200: OpenApiResponse(description="Setting updated successfully", response=PomodoroSettingSerializer),
            400: OpenApiResponse(description="Validation error")
        },
        description="Update task"
    )
    def put(self, request):
        pomodoro_setting = get_object_or_404(PomodoroSetting, user=request.user)
        serializer = PomodoroSettingSerializer(pomodoro_setting, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Update Pomodoro setting success"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        pomodoro_setting = get_object_or_404(PomodoroSetting, user=request.user)
        serializer = PomodoroSettingSerializer(pomodoro_setting, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Update Pomodoro setting success"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)