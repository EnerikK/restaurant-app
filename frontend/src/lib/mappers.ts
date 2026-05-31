import { fallbackPageData } from '../data/fallback-content'
import { formatDay, formatMoney, formatOpeningHours, normalizeImageUrl } from './format'
import type { GalleryImageResponse, MenuCategoryResponse, RestaurantResponse } from '../types/api'
import type { GalleryImage, MenuCategory, OpeningHourViewModel, RestaurantPageData } from '../types/view-models'

function mapHours(restaurant?: RestaurantResponse): OpeningHourViewModel[] {
  if (!restaurant?.opening_hours?.length) {
    return fallbackPageData.hours
  }

  return restaurant.opening_hours.map((item) => ({
    day: formatDay(item.day),
    hours: formatOpeningHours(item.open_time, item.close_time, item.is_closed),
  }))
}

function mapMenu(menu?: MenuCategoryResponse[]): MenuCategory[] {
  if (!menu?.length) {
    return fallbackPageData.menu
  }

  return menu.map((category) => ({
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    items: category.items
      .filter((item) => item.is_available)
      .sort((a, b) => a.display_order - b.display_order)
      .map((item) => ({
        id: String(item.id),
        name: item.name,
        description: item.description || 'Seasonal house selection.',
        priceLabel: formatMoney(item.price),
        image: normalizeImageUrl(item.image),
        featured: item.is_featured,
      })),
  }))
}

function mapGallery(gallery?: GalleryImageResponse[]): GalleryImage[] {
  if (!gallery?.length) {
    return fallbackPageData.gallery
  }

  return gallery.map((item) => ({
    id: String(item.id),
    src: normalizeImageUrl(item.image) ?? fallbackPageData.gallery[0].src,
    alt: item.caption || 'To Kati Allo gallery image',
    caption: item.caption || 'From the restaurant gallery.',
  }))
}

export function buildRestaurantPageData(input: {
  restaurant?: RestaurantResponse
  menu?: MenuCategoryResponse[]
  gallery?: GalleryImageResponse[]
  unavailableSections?: string[]
}): RestaurantPageData {
  const { restaurant, menu, gallery, unavailableSections = [] } = input
  const fallbackHero = fallbackPageData.hero

  return {
    hero: {
      name: restaurant?.name || fallbackHero.name,
      eyebrow: 'Restaurant and cafe in the main square',
      title: `${restaurant?.name || fallbackHero.name} in Antissa, Lesvos`,
      description: restaurant?.description || fallbackHero.description,
      address: restaurant?.address || fallbackHero.address,
      phone: restaurant?.phone || fallbackHero.phone,
      email: restaurant?.email || fallbackHero.email,
      heroImage: normalizeImageUrl(restaurant?.hero_image ?? null) ?? fallbackHero.heroImage,
    },
    highlights: fallbackPageData.highlights,
    story: fallbackPageData.story,
    menu: mapMenu(menu),
    gallery: mapGallery(gallery),
    hours: mapHours(restaurant),
    apiStatus: {
      usingFallbackContent: unavailableSections.length > 0,
      unavailableSections,
    },
  }
}
