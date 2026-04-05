from rest_framework.views import APIView
from rest_framework.response import Response

from .selectors import get_gallery_images
from .serializers import GallerySerializer


class GalleryView(APIView):
    def get(self, request):
        images = get_gallery_images()
        serializer = GallerySerializer(images, many=True)
        return Response(serializer.data)