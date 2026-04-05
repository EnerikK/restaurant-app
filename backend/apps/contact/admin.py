from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "is_read", "created_at"]
    list_filter = ["is_read"]
    search_fields = ["name", "email"]