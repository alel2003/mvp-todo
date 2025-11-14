from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/",include(
            [
                path("authentication/", include("authentication.urls")),
                path("user/", include("user.urls")),
                path("projects/", include("project.urls")),
                path("tasks/", include("task.urls")),
                path("settings/", include("settings.urls")),
                path("schema/", SpectacularAPIView.as_view(), name="schema"),
                path("schema/swagger-ui/",SpectacularSwaggerView.as_view(url_name="schema"),name="swagger-ui",),
                path("schema/redoc/",SpectacularRedocView.as_view(url_name="schema"),name="redoc",),
            ]
        ),
    ),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
