from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

from settings.models import PomodoroSetting

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        PomodoroSetting.objects.create(user=user)
        PomodoroOrphan.objects.create(user=user)
        return user

class User(AbstractBaseUser):
    avatar = models.FileField(
        upload_to="avatar_images/",
        null=True,
        blank=True,
        verbose_name=_("Avatar Image"),
    )
    username = models.CharField(max_length=300, null=True, blank=True, verbose_name=_("Username"),)
    email = models.EmailField(unique=True, verbose_name=_("Email"),)

    created_at = models.DateField(auto_now_add=True, verbose_name=_("Created At"),)
    updated_at = models.DateField(auto_now=True, verbose_name=_("Updated At"),)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.email and not self.username:
            self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)


class PomodoroOrphan(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, 
        related_name="user_pomodoro_orphan",
        verbose_name=_("User"),
    )
    count_minute = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("Count Minute"),)
    date = models.DateField(auto_now_add=True, verbose_name=_("Date"),)
