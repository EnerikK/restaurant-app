from django.db import models
from apps.common.models import TimeStampedModel


class RestaurantInfo(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()

    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=50)
    email = models.EmailField()

    hero_image = models.ImageField(upload_to="hero/", blank=True, null=True)

    def __str__(self):
        return self.name
    

def save(self, *args, **kwargs):
    if not self.pk and RestaurantInfo.objects.exists():
        raise ValueError("Only one RestaurantInfo instance allowed")
    return super().save(*args, **kwargs)


class OpeningHour(TimeStampedModel):
    DAY_CHOICES = [
        ("mon", "Monday"),
        ("tue", "Tuesday"),
        ("wed", "Wednesday"),
        ("thu", "Thursday"),
        ("fri", "Friday"),
        ("sat", "Saturday"),
        ("sun", "Sunday"),
    ]

    day = models.CharField(max_length=3, choices=DAY_CHOICES, unique=True)
    open_time = models.TimeField()
    close_time = models.TimeField()
    is_closed = models.BooleanField(default=False)

    class Meta:
        ordering = ["day"]

    def __str__(self):
        return self.get_day_display()