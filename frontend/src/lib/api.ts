import axios from 'axios'

import type {
  ContactPayload,
  ContactResponse,
  GalleryImageResponse,
  MenuCategoryResponse,
  RestaurantResponse,
} from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getRestaurant(): Promise<RestaurantResponse> {
  const response = await apiClient.get<RestaurantResponse>('/restaurant/')
  return response.data
}

export async function getMenu(): Promise<MenuCategoryResponse[]> {
  const response = await apiClient.get<MenuCategoryResponse[]>('/menu/')
  return response.data
}

export async function getGallery(): Promise<GalleryImageResponse[]> {
  const response = await apiClient.get<GalleryImageResponse[]>('/gallery/')
  return response.data
}

export async function postContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await apiClient.post<ContactResponse>('/contact/', payload)
  return response.data
}
