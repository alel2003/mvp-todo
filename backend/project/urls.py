from django.urls import path

from .views import CreateProjectView, ListProjectView, DeleteProjectView, DetailProjectView, UpdateProjectView


urlpatterns = [
    path("", ListProjectView.as_view(), name="projects"),
    path("create/", CreateProjectView.as_view(), name="project-create"),
    path("detail/<uuid:id>", DetailProjectView.as_view(), name="project-detail"),
    path("update/<uuid:id>", UpdateProjectView.as_view(), name="project-update"),
    path('delete/<uuid:id>', DeleteProjectView.as_view(), name="project-delete")
]