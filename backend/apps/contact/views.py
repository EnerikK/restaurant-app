from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ContactSerializer
from .services import create_contact_message


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        create_contact_message(**serializer.validated_data)

        return Response(
            {"message": "Message sent successfully."},
            status=status.HTTP_201_CREATED,
        )