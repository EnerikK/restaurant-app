export type OpeningHour = {
  day: string
  open_time: string | null
  close_time: string | null
  is_closed: boolean
}

export type RestaurantResponse = {
  name: string
  description: string
  address: string
  phone: string
  email: string
  hero_image: string | null
  opening_hours: OpeningHour[]
}

export type MenuItemResponse = {
  id: number
  name: string
  description: string
  price: string
  image: string | null
  is_available: boolean
  is_featured: boolean
  display_order: number
}

export type MenuCategoryResponse = {
  id: number
  name: string
  slug: string
  display_order: number
  items: MenuItemResponse[]
}

export type GalleryImageResponse = {
  id: number
  image: string
  caption: string
  is_featured: boolean
}

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResponse = {
  message: string
}
