const API_BASE = "https://api.bitechx.com"

export const api = {
  async auth(email: string) {
    const response = await fetch(`${API_BASE}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) throw new Error("Authentication failed")
    return response.json()
  },

  async getProducts(token: string, offset = 0, limit = 10, categoryId?: string) {
    const params = new URLSearchParams({ offset: String(offset), limit: String(limit) })
    if (categoryId) params.append("categoryId", categoryId)

    const response = await fetch(`${API_BASE}/products?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
  },

  async searchProducts(token: string, searchText: string) {
    const response = await fetch(`${API_BASE}/products/search?searchedText=${encodeURIComponent(searchText)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Search failed")
    return response.json()
  },

  async getProductBySlug(token: string, slug: string) {
    const response = await fetch(`${API_BASE}/products/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch product")
    return response.json()
  },

  async createProduct(token: string, data: any) {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create product")
    return response.json()
  },

  async updateProduct(token: string, id: string, data: any) {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update product")
    return response.json()
  },

  async deleteProduct(token: string, id: string) {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to delete product")
    return response.json()
  },

  async getCategories(token: string) {
    const response = await fetch(`${API_BASE}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch categories")
    return response.json()
  },
}
