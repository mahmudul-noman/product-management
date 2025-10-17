import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface AuthState {
  token: string | null
  email: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk("auth/loginUser", async (email: string, { rejectWithValue }) => {
  try {
    const response = await fetch("https://api.bitechx.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json()
      return rejectWithValue(error.message || "Authentication failed")
    }

    const data = await response.json()
    return { token: data.token, email }
  } catch (error) {
    return rejectWithValue("Failed to authenticate. Please try again.")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.email = null
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.email = action.payload.email
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token)
          localStorage.setItem("email", action.payload.email)
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
