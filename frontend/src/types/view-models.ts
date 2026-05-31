export type Highlight = {
  title: string
  text: string
}

export type HeroViewModel = {
  name: string
  eyebrow: string
  title: string
  description: string
  address: string
  phone: string
  email: string | null
  heroImage: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  priceLabel: string
  image: string | null
  featured: boolean
}

export type MenuCategory = {
  id: string
  name: string
  slug: string
  items: MenuItem[]
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption: string
}

export type OpeningHourViewModel = {
  day: string
  hours: string
}

export type RestaurantPageData = {
  hero: HeroViewModel
  highlights: Highlight[]
  story: {
    title: string
    paragraphs: string[]
    bullets: string[]
  }
  menu: MenuCategory[]
  gallery: GalleryImage[]
  hours: OpeningHourViewModel[]
  apiStatus: {
    usingFallbackContent: boolean
    unavailableSections: string[]
  }
}
