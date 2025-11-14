from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta: 
        model = Project
        fields = ["id", "title", "color", "slug", "user"]
        read_only_fields = fields

class CreateProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    id = serializers.UUIDField(required=False)

    class Meta: 
        model = Project
        fields = ["id", "title", "color", "user", "slug"]


class UpdateProjectSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Project
        fields = ["title", "color"]
        read_only_fields = ["id", "slug"]


class DeleteProjectSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    class Meta: 
        model = Project
        fields = ["id"]