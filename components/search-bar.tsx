"use client"

import { useState, useEffect } from "react"

interface SearchBarProps {
  value: string
  onChange: (query: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [input, setInput] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input)
    }, 300)

    return () => clearTimeout(timer)
  }, [input, onChange])

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products by name..."
        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
      <svg
        className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}
