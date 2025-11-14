from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
import uuid

from user.models import User


class Project(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=None,
        editable=True, 
    )
    slug = models.SlugField(unique=True, blank=True, verbose_name=_("Slug"),)
    title = models.CharField(max_length=300, verbose_name=_("Title"),)
    color = models.CharField(max_length=50, verbose_name=_("Color"), null=True, blank=True)
    is_delete = models.BooleanField(default=False, verbose_name=_("Is Delete"),)

    user = models.ForeignKey(User,
        on_delete=models.CASCADE, 
        related_name="project_user",
        verbose_name=_("User"),
    )

    created_at = models.DateField(auto_now_add=True, verbose_name=_("Created At"),)
    updated_at = models.DateField(auto_now=True, verbose_name=_("Updated At"),)

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.title:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)