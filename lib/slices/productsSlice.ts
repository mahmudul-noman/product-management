import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Category {
  id: string
  name: string
  description: string | null
  image: string
  createdAt: string
  updatedAt?: string
}

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  price: number
  slug: string
  createdAt: string
  updatedAt: string
  category: Category
}

interface ProductsState {
  items: Product[]
  currentProduct: Product | null
  categories: Category[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  searchQuery: string
  selectedCategory: string | null
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  categories: [],
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: 12,
  searchQuery: "",
  selectedCategory: null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      token,
      offset = 0,
      limit = 12,
      categoryId,
    }: { token: string; offset?: number; limit?: number; categoryId?: string },
    { rejectWithValue },
  ) => {
    try {
      let url = `https://api.bitechx.com/products?offset=${offset}&limit=${limit}`
      if (categoryId) {
        url += `&categoryId=${categoryId}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return rejectWithValue("Failed to fetch products")
      }

      const data = await response.json()
      return { items: data, total: data.length }
    } catch (error) {
      return rejectWithValue("Failed to fetch products")
    }
  },
)

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ token, searchText }: { token: string; searchText: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.bitechx.com/products/search?searchedText=${encodeURIComponent(searchText)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        return rejectWithValue("Failed to search products")
      }

      const data = await response.json()
      return { items: data, total: data.length }
    } catch (error) {
      return rejectWithValue("Failed to search products")
    }
  },
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async ({ token, slug }: { token: string; slug: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.bitechx.com/products/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return rejectWithValue("Product not found")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue("Failed to fetch product")
    }
  },
)

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.bitechx.com/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return rejectWithValue("Failed to fetch categories")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue("Failed to fetch categories")
    }
  },
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      token,
      product,
    }: {
      token: string
      product: {
        name: string
        description: string
        price: number
        images: string[]
        categoryId: string
        category: Category
      }
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("https://api.bitechx.com/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          categoryId: product.categoryId,
        }),
      })

      if (!response.ok) {
        return rejectWithValue("Failed to create product")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue("Failed to create product")
    }
  },
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    {
      token,
      id,
      product,
    }: {
      token: string
      id: string
      product: {
        name: string
        description: string
        price: number
        images: string[]
        categoryId: string
      }
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`https://api.bitechx.com/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        return rejectWithValue("Failed to update product")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue("Failed to update product")
    }
  },
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.bitechx.com/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return rejectWithValue("Failed to delete product")
      }

      return id
    } catch (error) {
      return rejectWithValue("Failed to delete product")
    }
  },
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 0
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      state.currentPage = 0
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch Product by Slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setSearchQuery, setSelectedCategory } = productsSlice.actions
export default productsSlice.reducer
