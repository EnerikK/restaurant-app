import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import { getGallery, getMenu, getRestaurant } from '../lib/api'
import { buildRestaurantPageData } from '../lib/mappers'

export function useRestaurantPageData() {
  const [restaurantQuery, menuQuery, galleryQuery] = useQueries({
    queries: [
      { queryKey: ['restaurant'], queryFn: getRestaurant, retry: 1 },
      { queryKey: ['menu'], queryFn: getMenu, retry: 1 },
      { queryKey: ['gallery'], queryFn: getGallery, retry: 1 },
    ],
  })

  const unavailableSections = useMemo(() => {
    const sections: string[] = []

    if (restaurantQuery.isError) {
      sections.push('restaurant')
    }

    if (menuQuery.isError) {
      sections.push('menu')
    }

    if (galleryQuery.isError) {
      sections.push('gallery')
    }

    return sections
  }, [galleryQuery.isError, menuQuery.isError, restaurantQuery.isError])

  const data = useMemo(
    () =>
      buildRestaurantPageData({
        restaurant: restaurantQuery.data,
        menu: menuQuery.data,
        gallery: galleryQuery.data,
        unavailableSections,
      }),
    [galleryQuery.data, menuQuery.data, restaurantQuery.data, unavailableSections],
  )

  return {
    data,
    isLoading: restaurantQuery.isLoading || menuQuery.isLoading || galleryQuery.isLoading,
    isFetching: restaurantQuery.isFetching || menuQuery.isFetching || galleryQuery.isFetching,
  }
}
