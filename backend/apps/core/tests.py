from io import StringIO
from tempfile import mkdtemp

from django.core.management import call_command
from django.test import TestCase, override_settings

from apps.gallery.models import GalleryImage
from apps.menu.models import MenuCategory, MenuItem
from apps.restaurant.models import OpeningHour, RestaurantInfo


class SeedRestaurantSiteCommandTests(TestCase):
    @override_settings(MEDIA_ROOT=mkdtemp())
    def test_seed_restaurant_site_creates_expected_records(self):
        out = StringIO()

        call_command("seed_restaurant_site", stdout=out)

        self.assertEqual(RestaurantInfo.objects.count(), 1)
        self.assertEqual(OpeningHour.objects.count(), 7)
        self.assertEqual(MenuCategory.objects.count(), 3)
        self.assertEqual(MenuItem.objects.count(), 9)
        self.assertEqual(GalleryImage.objects.count(), 4)
        self.assertIn("Seeded restaurant data for To Kati Allo.", out.getvalue())

    @override_settings(MEDIA_ROOT=mkdtemp())
    def test_seed_restaurant_site_is_idempotent(self):
        call_command("seed_restaurant_site")
        call_command("seed_restaurant_site")

        self.assertEqual(RestaurantInfo.objects.count(), 1)
        self.assertEqual(OpeningHour.objects.count(), 7)
        self.assertEqual(MenuCategory.objects.count(), 3)
        self.assertEqual(MenuItem.objects.count(), 9)
        self.assertEqual(GalleryImage.objects.count(), 4)
