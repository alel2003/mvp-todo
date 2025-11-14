from django.urls import path

from .views import UpdateUserView, GetUserView, DeleteUserView


urlpatterns = [
    path("", GetUserView.as_view(), name="get-user"),
    path("update/", UpdateUserView.as_view(), name="update-user"),
    path('delete/', DeleteUserView.as_view(), name="delete-user")
]