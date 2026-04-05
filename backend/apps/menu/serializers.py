from rest_framework import serializers
from .models import MenuCategory, MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "is_available",
            "is_featured",
            "display_order",
        ]


class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = ["id", "name", "slug", "display_order", "items"]