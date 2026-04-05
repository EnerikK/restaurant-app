from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .selectors import get_restaurant_info
from .serializers import RestaurantSerializer


class RestaurantView(APIView):
    def get(self, request):
        restaurant = get_restaurant_info()

        if not restaurant:
            return Response(
                {"detail": "Restaurant info not configured."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)