from django.urls import path

from .views import CreatePomodoroSettingView, UpdatePomodoroSettingView, GetPomodoroSettingView


urlpatterns = [
    path("", GetPomodoroSettingView.as_view(), name="setting"),
    path("create/", CreatePomodoroSettingView.as_view(), name="setting-create"),
    path("update/", UpdatePomodoroSettingView.as_view(), name="setting-update"),
]