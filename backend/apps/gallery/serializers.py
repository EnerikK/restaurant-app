from rest_framework import serializers
from .models import GalleryImage


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "image", "caption", "is_featured"]