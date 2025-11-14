from django.urls import path

from .views import SignUpView, SignInView, RefreshTokenView


urlpatterns = [
    path("sign-up/", SignUpView.as_view(), name="sign-up"),
    path("sign-in/", SignInView.as_view(), name="sign-in"),
    path('refresh/', RefreshTokenView.as_view(), name="refresh")
]