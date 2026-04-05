from .models import GalleryImage


def get_gallery_images():
    return GalleryImage.objects.all().order_by("-created_at")