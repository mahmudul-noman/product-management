"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"

export default function Home() {
  const router = useRouter()
  const token = useAppSelector((state) => state.auth.token)

  useEffect(() => {
    if (token) {
      router.push("/products")
    } else {
      router.push("/login")
    }
  }, [token, router])

  return null
}
