from .models import ContactMessage


def create_contact_message(*, name: str, email: str, message: str) -> ContactMessage:
    return ContactMessage.objects.create(
        name=name.strip(),
        email=email.strip().lower(),
        message=message.strip(),
    )