from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse


import logging
logger = logging.getLogger(__name__)

from authentication.views import CookieJWTAuthentication

from .models import Task
from .serializers import (
    TaskSerializer,
    CreateTaskSerializer,
    UpdateTaskSerializer,
    DeleteTaskSerializer,
)
from .filters import TaskFilter

class BaseAuth:
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]


class CreateTaskView(BaseAuth, APIView):
    @extend_schema(
        request=CreateTaskSerializer,
        responses={
            201: OpenApiResponse(description="Task created successfully", response=TaskSerializer),
            400: OpenApiResponse(description="Validation error")
        },
        description="Create a new task"
    )
    def post(self, request):
        serializer = CreateTaskSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            instance = serializer.save()
            logger.info("Task created: id=%s title=%s", instance.id, instance.title)
            return Response(serializer.data, status=201)
        logger.error("Validation errors: %s", serializer.errors)
        return Response(serializer.errors, status=400)


class ListTaskView(BaseAuth, ListAPIView):
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TaskFilter

    @extend_schema(
        responses={
            200: OpenApiResponse(description="List of user tasks", response=TaskSerializer)
        },
        description="Get all tasks for the current user"
    )
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user, is_delete=False)


class DetailTaskView(BaseAuth, APIView):
    @extend_schema(
        responses={
            200: OpenApiResponse(description="Task details", response=TaskSerializer),
            404: OpenApiResponse(description="Task not found")
        },
        description="Get task details by id"
    )
    def get(self, request, id):
        task = get_object_or_404(Task, id=id, user=request.user, is_delete=False)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateTaskView(BaseAuth, APIView):
    @extend_schema(
        request=UpdateTaskSerializer,
        responses={
            200: OpenApiResponse(description="Task updated successfully", response=TaskSerializer),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Task not found")
        },
        description="Update task"
    )
    def put(self, request, id: str):
        task = get_object_or_404(Task, id=id, user=request.user, is_delete=False)
        serializer = UpdateTaskSerializer(task, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Update Task success"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id: str):
        task = get_object_or_404(Task, id=id, user=request.user, is_delete=False)
        serializer = UpdateTaskSerializer(task, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Update Task success"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteTaskView(BaseAuth, APIView):
    @extend_schema(
        request=DeleteTaskSerializer,
        responses={
            200: OpenApiResponse(description="Task marked as deleted"),
            404: OpenApiResponse(description="Task not found")
        },
        description="Mark task as deleted"
    )
    def patch(self, request, id: str):
        task = get_object_or_404(Task, id=id, user=request.user, is_delete=False)
        task.is_delete = True
        task.save(update_fields=["is_delete"])
        return Response({"detail": "Task marked as deleted"}, status=status.HTTP_200_OK)