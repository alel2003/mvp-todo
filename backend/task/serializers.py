from rest_framework import serializers

from .models import Task, TomatoHistory

from project.models import Project


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TomatoHistory
        fields = ["pomodoro_duration", "end_time_pomodoro","mode"]


class TaskSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(),
        read_only=False,
        source="project"
    )
    history = HistorySerializer(read_only=True, many=True, required=False)
    class Meta:
        model = Task
        fields = ["id", "slug", "title", "date", "note", "is_completed", "count_times", "history", "date_type", "project_id"]
        read_only_fields = fields



class CreateTaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(),
        required=False,
        write_only=True,
        source="project",
        allow_null=True
    )
    history = HistorySerializer(read_only=True, many=True, required=False)

    id = serializers.UUIDField(required=False)

    class Meta:
        model = Task
        fields = ["id", "title", "date", "note", "is_completed", "count_times", "priority", "user", "history", "date_type", "project_id"]
        read_only_fields = ["slug",]
        

class UpdateTaskSerializer(serializers.ModelSerializer):
    history = HistorySerializer(read_only=True, many=True, required=False)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(),
        required=False,
        write_only=True,
        source="project",
        allow_null=True
    )

    class Meta:
        model = Task
        fields = ["title", "date", "note", "is_completed", "count_times", "priority", "history", "date_type", "project_id"]
        read_only_fields = ["id", "slug",]


class DeleteTaskSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    class Meta: 
        model = Task
        fields = ["id"]