const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://demo.altairattic.net/car-dealer-2/api/v1"
const API_KEY = process.env.API_KEY || "6208323ff9b15fdb27b2b9ee9924ac1208b9044df650b52ddf5bb8f19d32b5a4"

export function getAssetUrl(path: string | undefined): string {
  if (!path) return "/images/card/card-1.jpg"
  if (path.startsWith("http") || path.startsWith("blob:") || path.startsWith("data:")) return path
  if (path.startsWith("/")) return path
  
  const baseUrl = BASE_URL.replace(/\/(api\/v1|api|v1)\/?$/, "")
  return `${baseUrl}/${path.replace(/^\//, "")}`
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  
  const headers = new Headers(options.headers)
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }
  
  headers.set("X-API-Key", API_KEY)

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API request failed with status ${response.status}`)
  }

  return response.json()
}
