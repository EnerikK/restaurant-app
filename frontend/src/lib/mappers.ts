import { getFallbackPageData } from '../data/fallback-content'
import type { Locale, Messages } from '../i18n/messages'
import { formatDay, formatMoney, formatOpeningHours, normalizeImageUrl } from './format'
import type { GalleryImageResponse, MenuCategoryResponse, RestaurantResponse } from '../types/api'
import type { GalleryImage, MenuCategory, OpeningHourViewModel, RestaurantPageData } from '../types/view-models'

function normalizePublicEmail(email?: string | null): string | null {
  if (!email) {
    return null
  }

  return email.endsWith('@example.com') ? null : email
}

function mapHours(restaurant: RestaurantResponse | undefined, locale: Locale, messages: Messages, fallbackData: RestaurantPageData): OpeningHourViewModel[] {
  if (!restaurant?.opening_hours?.length) {
    return fallbackData.hours
  }

  return restaurant.opening_hours.map((item) => ({
    day: formatDay(item.day, locale),
    hours: formatOpeningHours(item.open_time, item.close_time, item.is_closed, messages),
  }))
}

function mapMenu(menu: MenuCategoryResponse[] | undefined, locale: Locale, messages: Messages, fallbackData: RestaurantPageData): MenuCategory[] {
  if (!menu?.length) {
    return fallbackData.menu
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
        description: item.description || messages.menu.seasonalSelection,
        priceLabel: formatMoney(item.price, locale),
        image: normalizeImageUrl(item.image),
        featured: item.is_featured,
      })),
  }))
}

function mapGallery(gallery: GalleryImageResponse[] | undefined, messages: Messages, fallbackData: RestaurantPageData): GalleryImage[] {
  if (!gallery?.length) {
    return fallbackData.gallery
  }

  return gallery.map((item) => ({
    id: String(item.id),
    src: normalizeImageUrl(item.image) ?? fallbackData.gallery[0].src,
    alt: item.caption || messages.gallery.defaultAlt,
    caption: item.caption || messages.gallery.defaultCaption,
  }))
}

export function buildRestaurantPageData(input: {
  locale: Locale
  messages: Messages
  restaurant?: RestaurantResponse
  menu?: MenuCategoryResponse[]
  gallery?: GalleryImageResponse[]
  unavailableSections?: string[]
}): RestaurantPageData {
  const { locale, messages, restaurant, menu, gallery, unavailableSections = [] } = input
  const fallbackData = getFallbackPageData(locale)
  const fallbackHero = fallbackData.hero

  return {
    hero: {
      name: restaurant?.name || fallbackHero.name,
      eyebrow: messages.hero.eyebrow,
      title: restaurant?.name ? messages.hero.title(restaurant.name) : fallbackHero.title,
      description: restaurant?.description || fallbackHero.description,
      address: restaurant?.address || fallbackHero.address,
      mapQuery: fallbackHero.mapQuery,
      phone: restaurant?.phone || fallbackHero.phone,
      email: normalizePublicEmail(restaurant?.email) ?? fallbackHero.email,
      heroImage: normalizeImageUrl(restaurant?.hero_image ?? null) ?? fallbackHero.heroImage,
    },
    highlights: fallbackData.highlights,
    story: fallbackData.story,
    menu: mapMenu(menu, locale, messages, fallbackData),
    gallery: mapGallery(gallery, messages, fallbackData),
    hours: mapHours(restaurant, locale, messages, fallbackData),
    apiStatus: {
      usingFallbackContent: unavailableSections.length > 0,
      unavailableSections,
    },
  }
}
