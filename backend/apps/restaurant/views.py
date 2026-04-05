from rest_framework.views import APIView
from rest_framework.response import Response

from .selectors import get_restaurant_info
from .serializers import RestaurantSerializer


class RestaurantView(APIView):
    def get(self, request):
        restaurant = get_restaurant_info()
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)