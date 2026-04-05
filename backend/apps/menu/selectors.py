from .models import MenuCategory


def get_active_menu():
    return (
        MenuCategory.objects
        .filter(is_active=True)
        .prefetch_related("items")
        .order_by("display_order")
    )