from django.contrib import admin
from apps.menu.models import MenuCategory, MenuItem

admin.site.register(MenuCategory)
admin.site.register(MenuItem)