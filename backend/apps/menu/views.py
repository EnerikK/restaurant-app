from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from .selectors import get_active_menu
from .serializers import MenuCategorySerializer


class MenuViewSet(ViewSet):
    def list(self, request):
        menu = get_active_menu()
        serializer = MenuCategorySerializer(menu, many=True)
        return Response(serializer.data)