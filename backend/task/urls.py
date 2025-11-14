from django.urls import path

from .views import CreateTaskView, ListTaskView, DeleteTaskView, DetailTaskView, UpdateTaskView


urlpatterns = [
    path("", ListTaskView.as_view(), name="projects"),
    path("create/", CreateTaskView.as_view(), name="project-create"),
    path("detail/<uuid:id>", DetailTaskView.as_view(), name="project-detail"),
    path("update/<uuid:id>", UpdateTaskView.as_view(), name="project-update"),
    path('delete/<uuid:id>', DeleteTaskView.as_view(), name="project-delete")
]