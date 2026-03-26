// ── Core entities ───────────────────────────────────────────

export interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage?: number | string
  color?: string
  fuel_type?: string
  transmission?: string
  body_type?: string
  vin?: string
  description?: string
  condition?: string
  status?: string
  featured?: boolean
  image?: string
  primary_image?: string | null
  images?: CarImage[]
  created_at?: string
  updated_at?: string
}

export interface CarImage {
  id: number
  car_id: number
  image_path: string
  url?: string
  is_primary: boolean
  created_at?: string
}

export interface Booking {
  id: number
  car_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  notes?: string
  status?: "pending" | "confirmed" | "cancelled" | "completed"
  admin_notes?: string
  car?: Car
  created_at?: string
  updated_at?: string
}

export interface Inquiry {
  id: number
  car_id?: number
  customer_name: string
  customer_email: string
  customer_phone: string
  subject: string
  message: string
  status?: "new" | "read" | "replied" | "closed"
  admin_reply?: string
  car?: Car
  created_at?: string
  updated_at?: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status?: "new" | "read" | "replied" | "closed"
  created_at?: string
  updated_at?: string
}

// ── API wrappers ─────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number
    page: number
    per_page: number
    pages: number
  }
}

// ── Request bodies ───────────────────────────────────────────

export interface CarFilters {
  make?: string
  model?: string
  year?: number
  color?: string
  status?: string
  min_price?: number
  max_price?: number
  featured?: 0 | 1
  search?: string
  sort?: string
  direction?: "asc" | "desc"
  page?: number
  per_page?: number
}

export interface BookingRequest {
  car_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  notes?: string
}

export interface BookingFilters {
  status?: string
  car_id?: number
  date?: string
  email?: string
  page?: number
  per_page?: number
}

export interface InquiryRequest {
  car_id?: number
  customer_name: string
  customer_email: string
  customer_phone: string
  subject: string
  message: string
}

export interface InquiryFilters {
  status?: string
  car_id?: number
  email?: string
  general?: 1
  page?: number
  per_page?: number
}

export interface ContactRequest {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ContactFilters {
  status?: string
  page?: number
  per_page?: number
}
