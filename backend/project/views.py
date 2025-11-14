from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse

from authentication.views import CookieJWTAuthentication
from .models import Project
from .serializers import (
    ProjectSerializer,
    CreateProjectSerializer,
    DeleteProjectSerializer,
    UpdateProjectSerializer,
)

class BaseAuth:
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    
class CreateProjectView(BaseAuth, APIView):
    @extend_schema(
        request=CreateProjectSerializer,
        responses={
            201: OpenApiResponse(description="Project created successfully", response=ProjectSerializer),
            400: OpenApiResponse(description="Validation error")
        },
        description="Create a new project"
    )
    def post(self, request):
        serializer = CreateProjectSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ListProjectView(BaseAuth, APIView):
    @extend_schema(
        responses={
            200: OpenApiResponse(description="List of user projects", response=ProjectSerializer)
        },
        description="Get all projects for the current user"
    )
    def get(self, request):
        projects = Project.objects.filter(user=request.user, is_delete=False)
        serializer = ProjectSerializer(projects, many=True, context={"request": request})
        return Response(serializer.data)


class DetailProjectView(BaseAuth, APIView):
    @extend_schema(
        responses={
            200: OpenApiResponse(description="Project details", response=ProjectSerializer),
            404: OpenApiResponse(description="Project not found")
        },
        description="Get project details by slug"
    )
    def get(self, request, slug):
        project = get_object_or_404(Project, slug=slug, user=request.user, is_delete=False)
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProjectView(BaseAuth, APIView):
    @extend_schema(
        request=UpdateProjectSerializer,
        responses={
            200: OpenApiResponse(description="Project updated successfully", response=ProjectSerializer),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Project not found")
        },
        description="Update project"
    )
    def put(self, request, id: str):
        project = get_object_or_404(Project, id=id, user=request.user, is_delete=False)
        serializer = UpdateProjectSerializer(project, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id: str):
        project = get_object_or_404(Project, id=id, user=request.user, is_delete=False)
        serializer = UpdateProjectSerializer(project, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProjectView(BaseAuth, APIView):
    @extend_schema(
        request=DeleteProjectSerializer,
        responses={
            200: OpenApiResponse(description="Project marked as deleted", response=DeleteProjectSerializer),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Project not found")
        },
        description="Mark project as deleted"
    )
    def patch(self, request, id: str):
        project = get_object_or_404(Project, id=id, user=request.user, is_delete=False)
        project.is_delete = True
        project.save(update_fields=["is_delete"])
        return Response({"detail": "Project marked as deleted"}, status=status.HTTP_200_OK)
