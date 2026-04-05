from .models import RestaurantInfo


def get_restaurant_info():
    return (
        RestaurantInfo.objects
        .prefetch_related("openinghour_set")
        .first()
    )