from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Iterable

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from apps.gallery.models import GalleryImage
from apps.menu.models import MenuCategory, MenuItem
from apps.restaurant.models import OpeningHour, RestaurantInfo


@dataclass(frozen=True)
class SeedMenuItem:
    name: str
    description: str
    price: Decimal
    display_order: int
    is_featured: bool = False


@dataclass(frozen=True)
class SeedMenuCategory:
    name: str
    display_order: int
    items: tuple[SeedMenuItem, ...]


@dataclass(frozen=True)
class SeedGalleryItem:
    caption: str
    is_featured: bool


SEED_MENU: tuple[SeedMenuCategory, ...] = (
    SeedMenuCategory(
        name="Meze to Share",
        display_order=1,
        items=(
            SeedMenuItem(
                name="Antissa meze board",
                description="Tzatziki, feta, olives, roasted peppers, village bread, and seasonal small plates.",
                price=Decimal("14.00"),
                display_order=1,
                is_featured=True,
            ),
            SeedMenuItem(
                name="Stuffed vine leaves",
                description="Hand-rolled dolmadakia with lemon and herbs.",
                price=Decimal("7.00"),
                display_order=2,
            ),
            SeedMenuItem(
                name="Fried saganaki",
                description="Golden cheese with thyme honey and sesame.",
                price=Decimal("8.00"),
                display_order=3,
            ),
        ),
    ),
    SeedMenuCategory(
        name="From the Grill",
        display_order=2,
        items=(
            SeedMenuItem(
                name="Paidakia",
                description="Char-grilled lamb chops with lemon, oregano, and hand-cut potatoes.",
                price=Decimal("17.00"),
                display_order=1,
                is_featured=True,
            ),
            SeedMenuItem(
                name="Village pork souvlaki",
                description="Skewers with tomato, onion, pita, and mustard sauce.",
                price=Decimal("13.00"),
                display_order=2,
            ),
            SeedMenuItem(
                name="Mixed grill for two",
                description="Lamb, pork, sausage, chicken, fries, and grilled vegetables.",
                price=Decimal("28.00"),
                display_order=3,
                is_featured=True,
            ),
        ),
    ),
    SeedMenuCategory(
        name="Cooked Daily",
        display_order=3,
        items=(
            SeedMenuItem(
                name="Moussaka",
                description="Slow-baked layers of aubergine, potato, minced meat, and bechamel.",
                price=Decimal("12.00"),
                display_order=1,
            ),
            SeedMenuItem(
                name="Giouvetsi",
                description="Braised beef with orzo, tomato, and kefalotyri.",
                price=Decimal("14.00"),
                display_order=2,
            ),
            SeedMenuItem(
                name="Vegetable briam",
                description="Oven-roasted summer vegetables with Lesvos olive oil.",
                price=Decimal("10.00"),
                display_order=3,
            ),
        ),
    ),
)

SEED_GALLERY: tuple[SeedGalleryItem, ...] = (
    SeedGalleryItem(caption="Village square terrace in Antissa", is_featured=True),
    SeedGalleryItem(caption="Greek meze for sharing", is_featured=True),
    SeedGalleryItem(caption="Outdoor dining atmosphere", is_featured=False),
    SeedGalleryItem(caption="Aegean taverna mood", is_featured=False),
)

SEED_HOURS: tuple[tuple[str, str, str], ...] = (
    ("mon", "07:00", "23:59"),
    ("tue", "07:00", "23:59"),
    ("wed", "07:00", "23:59"),
    ("thu", "07:00", "23:59"),
    ("fri", "07:00", "23:59"),
    ("sat", "07:00", "23:59"),
    ("sun", "07:00", "23:59"),
)


class Command(BaseCommand):
    help = "Seed the restaurant site with baseline content for To Kati Allo."

    def add_arguments(self, parser):
        parser.add_argument(
            "--overwrite-images",
            action="store_true",
            help="Replace existing hero, gallery, and menu images with generated placeholders.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        overwrite_images = options["overwrite_images"]

        restaurant = self._seed_restaurant(overwrite_images=overwrite_images)
        self._seed_opening_hours(restaurant)
        categories = self._seed_menu(overwrite_images=overwrite_images)
        self._seed_gallery(overwrite_images=overwrite_images)

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded restaurant data for {restaurant.name}. "
                f"Categories: {len(categories)}. Gallery images: {len(SEED_GALLERY)}."
            )
        )

    def _seed_restaurant(self, *, overwrite_images: bool) -> RestaurantInfo:
        restaurant = RestaurantInfo.objects.first()

        defaults = {
            "name": "To Kati Allo",
            "description": (
                "Traditional Greek and Mediterranean food in the main square of Antissa, "
                "serving meze, grilled dishes, and cooked daily plates in western Lesvos."
            ),
            "address": "ΤΟ ΚΑΤΙ ΑΛΛΟ, Άντισσα 811 03",
            "phone": "+30 22530 56636",
            "email": "contact@example.com",
        }

        if restaurant is None:
            restaurant = RestaurantInfo.objects.create(**defaults)
        else:
            for field, value in defaults.items():
                setattr(restaurant, field, value)
            restaurant.save(update_fields=list(defaults.keys()) + ["updated_at"])

        if overwrite_images or not restaurant.hero_image:
            self._save_placeholder_image(
                instance=restaurant,
                field_name="hero_image",
                filename="to-kati-allo-hero.svg",
                title="To Kati Allo",
                subtitle="Hero Image Placeholder",
            )

        return restaurant

    def _seed_opening_hours(self, restaurant: RestaurantInfo) -> None:
        for day, open_time, close_time in SEED_HOURS:
            OpeningHour.objects.update_or_create(
                restaurant=restaurant,
                day=day,
                defaults={
                    "open_time": open_time,
                    "close_time": close_time,
                    "is_closed": False,
                },
            )

    def _seed_menu(self, *, overwrite_images: bool) -> list[MenuCategory]:
        categories: list[MenuCategory] = []

        for category_data in SEED_MENU:
            category, _ = MenuCategory.objects.update_or_create(
                slug=slugify(category_data.name),
                defaults={
                    "name": category_data.name,
                    "display_order": category_data.display_order,
                    "is_active": True,
                },
            )

            for item_data in category_data.items:
                menu_item, _ = MenuItem.objects.update_or_create(
                    category=category,
                    name=item_data.name,
                    defaults={
                        "description": item_data.description,
                        "price": item_data.price,
                        "display_order": item_data.display_order,
                        "is_available": True,
                        "is_featured": item_data.is_featured,
                    },
                )

                if overwrite_images or not menu_item.image:
                    self._save_placeholder_image(
                        instance=menu_item,
                        field_name="image",
                        filename=f"{slugify(category.name)}-{slugify(menu_item.name)}.svg",
                        title=menu_item.name,
                        subtitle=category.name,
                    )

            categories.append(category)

        return categories

    def _seed_gallery(self, *, overwrite_images: bool) -> None:
        for index, item_data in enumerate(SEED_GALLERY, start=1):
            gallery_item, _ = GalleryImage.objects.update_or_create(
                caption=item_data.caption,
                defaults={"is_featured": item_data.is_featured},
            )

            if overwrite_images or not gallery_item.image:
                self._save_placeholder_image(
                    instance=gallery_item,
                    field_name="image",
                    filename=f"gallery-{index}.svg",
                    title="To Kati Allo",
                    subtitle=item_data.caption,
                )

    def _save_placeholder_image(self, *, instance, field_name: str, filename: str, title: str, subtitle: str) -> None:
        svg = self._build_svg(title=title, subtitle=subtitle)
        content = ContentFile(svg.encode("utf-8"), name=filename)
        getattr(instance, field_name).save(filename, content, save=True)

    def _build_svg(self, *, title: str, subtitle: str) -> str:
        return f"""
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-label="{title}">
  <defs>
    <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#073452" />
      <stop offset="100%" stop-color="#0d7b8e" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)" />
  <circle cx="1320" cy="180" r="120" fill="#f3c56b" fill-opacity="0.18" />
  <circle cx="260" cy="820" r="180" fill="#ffffff" fill-opacity="0.08" />
  <text x="120" y="430" fill="#f8fbff" font-size="82" font-family="Arial, sans-serif" font-weight="700">{title}</text>
  <text x="120" y="520" fill="#dbe8f0" font-size="38" font-family="Arial, sans-serif">{subtitle}</text>
  <text x="120" y="610" fill="#f3c56b" font-size="28" font-family="Arial, sans-serif">Antissa, Lesvos</text>
</svg>
""".strip()
