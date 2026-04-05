from django.db.models import Prefetch
from .models import MenuCategory, MenuItem


def get_active_menu():
    available_items = MenuItem.objects.filter(is_available=True).order_by("display_order")

    return (
        MenuCategory.objects
        .filter(is_active=True, items__is_available=True)
        .distinct()
        .prefetch_related(
            Prefetch("items", queryset=available_items)
        )
        .order_by("display_order")
    )