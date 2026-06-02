import type { RestaurantPageData } from '../types/view-models'
import type { Locale } from '../i18n/messages'
import { messagesByLocale } from '../i18n/messages'
import { formatMoney } from '../lib/format'

export function getFallbackPageData(locale: Locale): RestaurantPageData {
  const messages = messagesByLocale[locale]

  return {
    hero: {
      name: messages.hero.name,
      eyebrow: messages.hero.eyebrow,
      title: locale === 'el' ? 'Παραδοσιακές γεύσεις Λέσβου στη σκιά της Άντισσας.' : 'Traditional Lesvos dishes in the shade of Antissa.',
      description: messages.hero.fallbackDescription,
      address: messages.fallback.hero.address,
      mapQuery: messages.fallback.hero.mapQuery,
      phone: messages.fallback.hero.phone,
      email: null,
      heroImage: messages.gallery.items[1].src,
    },
    highlights: messages.highlights.items,
    story: {
      title: messages.story.title,
      paragraphs: messages.story.paragraphs,
      bullets: messages.story.bullets,
    },
    menu: messages.menu.categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        priceLabel: formatMoney(item.price, locale),
        image: null,
        featured: item.featured,
      })),
    })),
    gallery: messages.gallery.items,
    hours: [
      { day: messages.hours.days.mon, hours: '07:00 - 23:59' },
      { day: messages.hours.days.tue, hours: '07:00 - 23:59' },
      { day: messages.hours.days.wed, hours: '07:00 - 23:59' },
      { day: messages.hours.days.thu, hours: '07:00 - 23:59' },
      { day: messages.hours.days.fri, hours: '07:00 - 23:59' },
      { day: messages.hours.days.sat, hours: '07:00 - 23:59' },
      { day: messages.hours.days.sun, hours: '07:00 - 23:59' },
    ],
    apiStatus: {
      usingFallbackContent: true,
      unavailableSections: ['restaurant', 'menu', 'gallery'],
    },
  }
}
