import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/slices/authSlice"
import productsReducer from "@/lib/slices/productsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
