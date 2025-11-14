from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from django.conf import settings

from user.models import User
from project.models import Project

from .choices import TYPE_PRIORITY_CHOICES, TOMATO_HISTORY_MODE_CHOICES, TYPE_DATE_CHOICES

class Task(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=None,
        editable=True, 
    )
    slug = models.SlugField(unique=True, blank=True, verbose_name=_("Slug"),)
    title = models.CharField(max_length=300, verbose_name=_("Title"),)
    date = models.DateField(null=True, blank=True, verbose_name=_("Date"),)
    note = models.TextField(null=True, blank=True, verbose_name=_("Note"),)
    is_completed = models.BooleanField(default=False, verbose_name=_("Is Completed"),)
    count_times = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("Count Times"),)
    priority = models.CharField(max_length=50, choices=TYPE_PRIORITY_CHOICES, default="low", verbose_name=_("Priority"),)
    is_delete = models.BooleanField(default=False, verbose_name=_("Is Delete"),)
    date_type = models.CharField(max_length=50, choices=TYPE_DATE_CHOICES, default="today", verbose_name=_("Date Type"),)

    project = models.ForeignKey(Project, 
        on_delete=models.CASCADE, 
        related_name="tasks",    
        verbose_name=_("Project"),
        null=True,
        blank=True
    )

    user = models.ForeignKey(User,
        on_delete=models.CASCADE, 
        related_name="task_user",
        verbose_name=_("User"),
    )

    created_at = models.DateField(auto_now_add=True, verbose_name=_("Created At"),)
    updated_at = models.DateField(auto_now=True, verbose_name=_("Updated At"),)

    def save(self, *args, **kwargs):
        if self.title:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Task")
        verbose_name_plural = _("Tasks")

    def __str__(self):
        return self.title
    

class TomatoHistory(models.Model):
    mode = models.CharField(max_length=50, choices=TOMATO_HISTORY_MODE_CHOICES, default="work", verbose_name=_("Mode"),)
    pomodoro_duration = models.PositiveIntegerField(default=settings.POMODORO_DURATION, null=True, blank=True, verbose_name=_("Pomodoro Duration"),)
    end_time_pomodoro = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("End Time Pomodoro"),)

    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE, 
        related_name="tomato_history_task",
        verbose_name=_("Task"),
    )

    created_at = models.DateField(auto_now_add=True, verbose_name=_("Created At"),)
    updated_at = models.DateField(auto_now=True, verbose_name=_("Updated At"),)


    class Meta:
        verbose_name = _("Tomato History")
        verbose_name_plural = _("Tomato Histories")