import { apiRequest } from "./client"
import {
  Inquiry,
  InquiryRequest,
  InquiryFilters,
  ApiResponse,
  PaginatedResponse,
} from "./types"

// ── Public ───────────────────────────────────────────────────

export async function createInquiry(
  data: InquiryRequest
): Promise<ApiResponse<Inquiry>> {
  return apiRequest<ApiResponse<Inquiry>>("/inquiries", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ── Admin ────────────────────────────────────────────────────

export async function getInquiries(
  filters: InquiryFilters = {}
): Promise<PaginatedResponse<Inquiry>> {
  const params = new URLSearchParams()
  if (filters.status) params.append("status", filters.status)
  if (filters.car_id) params.append("car_id", filters.car_id.toString())
  if (filters.email) params.append("email", filters.email)
  if (filters.general) params.append("general", "1")
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.per_page) params.append("per_page", filters.per_page.toString())

  const qs = params.toString()
  return apiRequest<PaginatedResponse<Inquiry>>(
    `/inquiries${qs ? `?${qs}` : ""}`
  )
}

export async function getInquiryById(id: number): Promise<ApiResponse<Inquiry>> {
  return apiRequest<ApiResponse<Inquiry>>(`/inquiries/${id}`)
}

export async function updateInquiry(
  id: number,
  data: { status?: string; admin_reply?: string }
): Promise<ApiResponse<Inquiry>> {
  return apiRequest<ApiResponse<Inquiry>>(`/inquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteInquiry(id: number): Promise<ApiResponse<unknown>> {
  return apiRequest<ApiResponse<unknown>>(`/inquiries/${id}`, {
    method: "DELETE",
  })
}
