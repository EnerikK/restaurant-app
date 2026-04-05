from django.contrib import admin
from .models import GalleryImage


@admin.register(GalleryImage)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["caption", "is_featured", "created_at"]
    list_filter = ["is_featured"]