import { apiRequest } from "./client"
import {
  Booking,
  BookingRequest,
  BookingFilters,
  ApiResponse,
  PaginatedResponse,
} from "./types"

// ── Public ───────────────────────────────────────────────────

export async function createBooking(
  data: BookingRequest
): Promise<ApiResponse<Booking>> {
  return apiRequest<ApiResponse<Booking>>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ── Admin ────────────────────────────────────────────────────

export async function getBookings(
  filters: BookingFilters = {}
): Promise<PaginatedResponse<Booking>> {
  const params = new URLSearchParams()
  if (filters.status) params.append("status", filters.status)
  if (filters.car_id) params.append("car_id", filters.car_id.toString())
  if (filters.date) params.append("date", filters.date)
  if (filters.email) params.append("email", filters.email)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.per_page) params.append("per_page", filters.per_page.toString())

  const qs = params.toString()
  return apiRequest<PaginatedResponse<Booking>>(
    `/bookings${qs ? `?${qs}` : ""}`
  )
}

export async function getBookingById(id: number): Promise<ApiResponse<Booking>> {
  return apiRequest<ApiResponse<Booking>>(`/bookings/${id}`)
}

export async function updateBooking(
  id: number,
  data: { status?: string; admin_notes?: string }
): Promise<ApiResponse<Booking>> {
  return apiRequest<ApiResponse<Booking>>(`/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteBooking(id: number): Promise<ApiResponse<unknown>> {
  return apiRequest<ApiResponse<unknown>>(`/bookings/${id}`, {
    method: "DELETE",
  })
}
