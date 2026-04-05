from rest_framework import viewsets
from apps.menu.models import MenuCategory
from .serializers import MenuCategorySerializer

class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.all().order_by('display_order')
    serializer_class = MenuCategorySerializer