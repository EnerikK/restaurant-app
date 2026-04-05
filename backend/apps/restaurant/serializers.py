from rest_framework import serializers
from .models import RestaurantInfo, OpeningHour


class OpeningHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHour
        fields = ["day", "open_time", "close_time", "is_closed"]


class RestaurantSerializer(serializers.ModelSerializer):
    opening_hours = OpeningHourSerializer(many=True, read_only=True)

    class Meta:
        model = RestaurantInfo
        fields = [
            "name",
            "description",
            "address",
            "phone",
            "email",
            "hero_image",
            "opening_hours",
        ]