from django.db import models
from django.db.models import Q, F
from apps.common.models import TimeStampedModel
from django.core.exceptions import ValidationError


class RestaurantInfo(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    hero_image = models.ImageField(upload_to="hero/", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk and RestaurantInfo.objects.exists():
            raise ValueError("Only one RestaurantInfo instance allowed")
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


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

    restaurant = models.ForeignKey(
        RestaurantInfo,
        on_delete=models.CASCADE,
        related_name="opening_hours",
    )
    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    open_time = models.TimeField(blank=True, null=True)
    close_time = models.TimeField(blank=True, null=True)
    is_closed = models.BooleanField(default=False)

    class Meta:
        ordering = ["day"]
        constraints = [
            models.UniqueConstraint(
                fields=["restaurant", "day"],
                name="unique_opening_hour_per_restaurant_day",
            ),
            models.CheckConstraint(
                condition=Q(is_closed=True) | Q(open_time__lt=F("close_time")),
                name="openinghour_valid_time_range_or_closed",
            ),
        ]

    def __str__(self):
        return self.get_day_display()


    def clean(self):
        if self.is_closed:
            return

        if not self.open_time or not self.close_time:
            raise ValidationError("Open and close times are required when not closed.")

        if self.open_time >= self.close_time:
            raise ValidationError("Open time must be earlier than close time.")