from django.contrib import admin
from .models import RestaurantInfo, OpeningHour


class OpeningHourInline(admin.TabularInline):
    model = OpeningHour
    extra = 1


@admin.register(RestaurantInfo)
class RestaurantAdmin(admin.ModelAdmin):
    inlines = [OpeningHourInline]