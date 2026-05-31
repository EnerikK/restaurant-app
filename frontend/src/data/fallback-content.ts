import type { GalleryImage, Highlight, MenuCategory, OpeningHourViewModel, RestaurantPageData } from '../types/view-models'

const fallbackGallery: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: 'https://images.pexels.com/photos/23466870/pexels-photo-23466870.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Blue tables outside a Greek taverna by the sea',
    caption: 'Bright island colors and a relaxed taverna setting.',
  },
  {
    id: 'gallery-2',
    src: 'https://images.pexels.com/photos/34026509/pexels-photo-34026509.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Greek meze platter with pita, dips, and salad',
    caption: 'Meze built for sharing with bread, dips, and fresh salad.',
  },
  {
    id: 'gallery-3',
    src: 'https://images.pexels.com/photos/30167762/pexels-photo-30167762.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Outdoor Greek cafe with white tables and flowers',
    caption: 'A courtyard feel that fits a village meal in Lesvos.',
  },
  {
    id: 'gallery-4',
    src: 'https://images.pexels.com/photos/18774938/pexels-photo-18774938.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'White waterfront Greek taverna near fishing boats',
    caption: 'Aegean light, white walls, and tables that keep you sitting.',
  },
]

const fallbackHighlights: Highlight[] = [
  {
    title: 'Main square setting',
    text: 'In Antissa, the terrace belongs to the rhythm of the village rather than to a tourist script.',
  },
  {
    title: 'Greek food that makes sense here',
    text: 'Meze, grilled meats, daily pots, and generous portions fit the place better than trendy reinvention.',
  },
  {
    title: 'Useful stop in western Lesvos',
    text: 'The restaurant works equally well after the coast, between villages, or as a late dinner stop.',
  },
]

const fallbackHours: OpeningHourViewModel[] = [
  { day: 'Monday', hours: '07:00 - 00:00' },
  { day: 'Tuesday', hours: '07:00 - 00:00' },
  { day: 'Wednesday', hours: '07:00 - 00:00' },
  { day: 'Thursday', hours: '07:00 - 00:00' },
  { day: 'Friday', hours: '07:00 - 00:00' },
  { day: 'Saturday', hours: '07:00 - 00:00' },
  { day: 'Sunday', hours: '07:00 - 00:00' },
]

const fallbackMenu: MenuCategory[] = [
  {
    id: 'meze',
    name: 'Meze to Share',
    slug: 'meze',
    items: [
      {
        id: 'meze-board',
        name: 'Antissa meze board',
        description: 'Tzatziki, feta, olives, roasted peppers, village bread, and seasonal small plates.',
        priceLabel: 'EUR 14',
        image: null,
        featured: true,
      },
      {
        id: 'vine-leaves',
        name: 'Stuffed vine leaves',
        description: 'Hand-rolled dolmadakia with lemon and herbs.',
        priceLabel: 'EUR 7',
        image: null,
        featured: false,
      },
      {
        id: 'saganaki',
        name: 'Fried saganaki',
        description: 'Golden cheese with thyme honey and sesame.',
        priceLabel: 'EUR 8',
        image: null,
        featured: false,
      },
    ],
  },
  {
    id: 'grill',
    name: 'From the Grill',
    slug: 'grill',
    items: [
      {
        id: 'paidakia',
        name: 'Paidakia',
        description: 'Char-grilled lamb chops with lemon, oregano, and hand-cut potatoes.',
        priceLabel: 'EUR 17',
        image: null,
        featured: true,
      },
      {
        id: 'pork-souvlaki',
        name: 'Village pork souvlaki',
        description: 'Skewers with tomato, onion, pita, and mustard sauce.',
        priceLabel: 'EUR 13',
        image: null,
        featured: false,
      },
      {
        id: 'mixed-grill',
        name: 'Mixed grill for two',
        description: 'Lamb, pork, sausage, chicken, fries, and grilled vegetables.',
        priceLabel: 'EUR 28',
        image: null,
        featured: true,
      },
    ],
  },
  {
    id: 'daily',
    name: 'Cooked Daily',
    slug: 'daily',
    items: [
      {
        id: 'moussaka',
        name: 'Moussaka',
        description: 'Slow-baked layers of aubergine, potato, minced meat, and bechamel.',
        priceLabel: 'EUR 12',
        image: null,
        featured: false,
      },
      {
        id: 'giouvetsi',
        name: 'Giouvetsi',
        description: 'Braised beef with orzo, tomato, and kefalotyri.',
        priceLabel: 'EUR 14',
        image: null,
        featured: false,
      },
      {
        id: 'briam',
        name: 'Vegetable briam',
        description: 'Oven-roasted summer vegetables with Lesvos olive oil.',
        priceLabel: 'EUR 10',
        image: null,
        featured: false,
      },
    ],
  },
]

export const fallbackPageData: RestaurantPageData = {
  hero: {
    name: 'To Kati Allo',
    eyebrow: 'Restaurant and cafe in the main square',
    title: 'Traditional Lesvos dishes in the shade of Antissa.',
    description:
      'To Kati Allo brings together grilled meats, meze, daily cooked food, and a relaxed village rhythm in western Lesvos.',
    address: 'Main Square, Antissa 81103, Lesvos, Greece',
    phone: '+30 22530 56636',
    email: null,
    heroImage: fallbackGallery[1].src,
  },
  highlights: fallbackHighlights,
  story: {
    title: 'Antissa stays grounded in local life, and the restaurant should feel the same way.',
    paragraphs: [
      'The village square is one of the strongest reasons to stop in western Lesvos: plane trees, slower evenings, and a terrace culture that still feels local.',
      'This frontend uses that context properly instead of shipping another empty starter page. It renders backend content when available, but keeps the site complete when data has not been seeded yet.',
    ],
    bullets: [
      'Mediterranean and Greek cuisine',
      'Breakfast, lunch, and dinner service',
      'Vegetarian-friendly small plates and sides',
      'Useful stop for exploring western Lesvos villages',
    ],
  },
  menu: fallbackMenu,
  gallery: fallbackGallery,
  hours: fallbackHours,
  apiStatus: {
    usingFallbackContent: true,
    unavailableSections: ['restaurant', 'menu', 'gallery'],
  },
}
