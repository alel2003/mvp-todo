from django_filters import rest_framework as filters

from .models import Task
from .choices import TYPE_DATE_CHOICES

class TaskFilter(filters.FilterSet):
    is_completed = filters.BooleanFilter()
    priority = filters.CharFilter(lookup_expr="icontains")
    date_type = filters.ChoiceFilter(method="filter_date_type", choices=TYPE_DATE_CHOICES)
    project_id = filters.CharFilter(method="filter_project_id")

    def filter_date_type(self, queryset, name, value):
        if value == "all":
            return queryset
        return queryset.filter(date_type=value)

    def filter_project_id(self, queryset, name, value):
        return queryset.filter(project__id=value)


    class Meta:
        model = Task
        fields = [
            "is_completed",
            "priority",
            "date_type",
            "project_id",
        ]