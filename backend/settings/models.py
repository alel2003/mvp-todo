from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class PomodoroSetting(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="user_setting",
        verbose_name=_("User"),
    )
    
    pomodoro_duration = models.PositiveIntegerField(default=settings.POMODORO_DURATION, verbose_name=_("Pomodoro Duration"),)
    short_relax_duration = models.PositiveIntegerField(default=5,verbose_name=_("Short Relax Duration"),)
    long_relax_duration = models.PositiveIntegerField(default=15,verbose_name=_("Long Relax Duration"),)
    interval_long_relax = models.PositiveIntegerField(default=4,verbose_name=_("Interval Long Relax"),)

    created_at = models.DateField(auto_now_add=True, verbose_name=_("Created At"),)
    updated_at = models.DateField(auto_now=True, verbose_name=_("Updated At"),)

    class Meta:
        verbose_name = _("Pomodoro Setting")
        verbose_name_plural = _("Pomodoro Settings")