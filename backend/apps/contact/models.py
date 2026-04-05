from django.db import models
from apps.common.models import TimeStampedModel


class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()

    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.email}"