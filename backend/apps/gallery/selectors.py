from .models import GalleryImage


def get_gallery_images():
    return GalleryImage.objects.only(
        "id",
        "image",
        "caption",
        "is_featured",
        "created_at",
    ).order_by("-created_at")