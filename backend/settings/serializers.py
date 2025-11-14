from rest_framework import serializers

from .models import PomodoroSetting


class PomodoroSettingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model = PomodoroSetting
        fields = ["pomodoro_duration", "short_relax_duration", "long_relax_duration", "interval_long_relax", "user"]