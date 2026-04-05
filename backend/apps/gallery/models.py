from django.db import models
from apps.common.models import TimeStampedModel


class GalleryImage(TimeStampedModel):
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.caption or "Gallery Image"