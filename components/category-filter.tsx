"use client"

import type { Category } from "@/lib/slices/productsSlice"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onChange: (categoryId: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedCategory === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
