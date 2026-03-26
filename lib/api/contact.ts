import { apiRequest } from "./client"
import {
  Contact,
  ContactRequest,
  ContactFilters,
  ApiResponse,
  PaginatedResponse,
} from "./types"

// ── Public ───────────────────────────────────────────────────

export async function createContact(
  data: ContactRequest
): Promise<ApiResponse<Contact>> {
  return apiRequest<ApiResponse<Contact>>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ── Admin ────────────────────────────────────────────────────

export async function getContacts(
  filters: ContactFilters = {}
): Promise<PaginatedResponse<Contact>> {
  const params = new URLSearchParams()
  if (filters.status) params.append("status", filters.status)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.per_page) params.append("per_page", filters.per_page.toString())

  const qs = params.toString()
  return apiRequest<PaginatedResponse<Contact>>(
    `/contact${qs ? `?${qs}` : ""}`
  )
}

export async function getContactById(id: number): Promise<ApiResponse<Contact>> {
  return apiRequest<ApiResponse<Contact>>(`/contact/${id}`)
}

export async function updateContact(
  id: number,
  data: { status: string }
): Promise<ApiResponse<Contact>> {
  return apiRequest<ApiResponse<Contact>>(`/contact/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteContact(id: number): Promise<ApiResponse<unknown>> {
  return apiRequest<ApiResponse<unknown>>(`/contact/${id}`, {
    method: "DELETE",
  })
}
