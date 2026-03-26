import { apiRequest } from "./client"
import { Car, CarFilters, PaginatedResponse, ApiResponse, CarImage } from "./types"

export function generateCarSlug(car: Car): string {
  const base = `${car.make}-${car.model}-${car.year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
  return `${car.id}-${base}`
}

export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-/)
  return match ? parseInt(match[1], 10) : null
}

export async function getCars(
  filters: CarFilters = {}
): Promise<PaginatedResponse<Car>> {
  const params = new URLSearchParams()

  if (filters.make) params.append("make", filters.make)
  if (filters.model) params.append("model", filters.model)
  if (filters.year) params.append("year", filters.year.toString())
  if (filters.color) params.append("color", filters.color)
  if (filters.status) params.append("status", filters.status)
  if (filters.min_price) params.append("min_price", filters.min_price.toString())
  if (filters.max_price) params.append("max_price", filters.max_price.toString())
  if (filters.featured !== undefined)
    params.append("featured", filters.featured.toString())
  if (filters.search) params.append("search", filters.search)
  if (filters.sort) params.append("sort", filters.sort)
  if (filters.direction) params.append("direction", filters.direction)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.per_page) params.append("per_page", filters.per_page.toString())

  const qs = params.toString()
  return apiRequest<PaginatedResponse<Car>>(`/cars${qs ? `?${qs}` : ""}`)
}

export async function getCarById(id: number): Promise<ApiResponse<Car>> {
  return apiRequest<ApiResponse<Car>>(`/cars/${id}`)
}

export async function createCar(
  data: Partial<Car>
): Promise<ApiResponse<Car>> {
  return apiRequest<ApiResponse<Car>>("/cars", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateCar(
  id: number,
  data: Partial<Car>
): Promise<ApiResponse<Car>> {
  return apiRequest<ApiResponse<Car>>(`/cars/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function replaceCar(
  id: number,
  data: Car
): Promise<ApiResponse<Car>> {
  return apiRequest<ApiResponse<Car>>(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteCar(id: number): Promise<ApiResponse<unknown>> {
  return apiRequest<ApiResponse<unknown>>(`/cars/${id}`, { method: "DELETE" })
}

export async function uploadCarImage(
  carId: number,
  file: File
): Promise<ApiResponse<CarImage>> {
  const form = new FormData()
  form.append("image", file)
  return apiRequest<ApiResponse<CarImage>>(`/cars/${carId}/images`, {
    method: "POST",
    body: form,
  })
}

export async function setCarImagePrimary(
  carId: number,
  imageId: number
): Promise<ApiResponse<CarImage>> {
  return apiRequest<ApiResponse<CarImage>>(
    `/cars/${carId}/images/${imageId}`,
    { method: "PATCH" }
  )
}

export async function deleteCarImage(
  carId: number,
  imageId: number
): Promise<ApiResponse<unknown>> {
  return apiRequest<ApiResponse<unknown>>(
    `/cars/${carId}/images/${imageId}`,
    { method: "DELETE" }
  )
}
