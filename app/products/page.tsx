// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import {
//   fetchProducts,
//   searchProducts,
//   fetchCategories,
//   deleteProduct,
//   setCurrentPage,
//   setSearchQuery,
//   setSelectedCategory,
// } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ProductCard } from "@/components/product-card"
// import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
// import Link from "next/link"

// export default function ProductsPage() {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { items, categories, loading, error, currentPage, pageSize, searchQuery, selectedCategory } = useAppSelector(
//     (state) => state.products,
//   )
//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [searchInput, setSearchInput] = useState("")

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchCategories({ token }))
//   }, [token, router, dispatch])

//   useEffect(() => {
//     if (!token) return

//     if (searchQuery) {
//       dispatch(searchProducts({ token, searchText: searchQuery }))
//     } else {
//       dispatch(
//         fetchProducts({
//           token,
//           offset: currentPage * pageSize,
//           limit: pageSize,
//           categoryId: selectedCategory || undefined,
//         }),
//       )
//     }
//   }, [token, currentPage, pageSize, searchQuery, selectedCategory, dispatch])

//   const handleSearch = (value: string) => {
//     setSearchInput(value)
//     dispatch(setSearchQuery(value))
//   }

//   const handleCategoryChange = (value: string) => {
//     dispatch(setSelectedCategory(value === "all" ? null : value))
//   }

//   const handleDelete = async () => {
//     if (!token || !deleteId) return

//     await dispatch(deleteProduct({ token, id: deleteId }))
//     setDeleteId(null)
//   }

//   const handlePreviousPage = () => {
//     if (currentPage > 0) {
//       dispatch(setCurrentPage(currentPage - 1))
//     }
//   }

//   const handleNextPage = () => {
//     dispatch(setCurrentPage(currentPage + 1))
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
//           <div className="space-y-2">
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Products
//             </h1>
//             <p className="text-muted-foreground text-sm md:text-base">Manage your product catalog with ease</p>
//           </div>
//           <Link href="/products/create" className="w-full sm:w-auto">
//             <Button className="w-full sm:w-auto h-12 font-semibold text-base transition-all hover:shadow-xl glow-primary gradient-primary text-white border-0">
//               + Create Product
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-border/50 backdrop-blur-sm">
//           <div className="md:col-span-2">
//             <label className="text-sm font-semibold text-foreground mb-2 block">Search Products</label>
//             <Input
//               type="text"
//               placeholder="Search by product name..."
//               value={searchInput}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="h-11 border-2 border-border focus:ring-2 focus:ring-primary transition-all"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-foreground mb-2 block">Filter by Category</label>
//             <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
//               <SelectTrigger className="h-11 border-2 border-border focus:ring-2 focus:ring-primary">
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="p-6 mb-8 bg-gradient-to-r from-destructive/10 to-destructive/5 border-2 border-destructive/30 rounded-xl animate-slide-down">
//             <p className="text-destructive font-semibold">⚠ Error: {error}</p>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="h-80 bg-gradient-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
//             ))}
//           </div>
//         )}

//         {/* Products Grid */}
//         {!loading && items.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in">
//             {items.map((product) => (
//               <ProductCard key={product.id} product={product} onDelete={() => setDeleteId(product.id)} />
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && items.length === 0 && (
//           <div className="text-center py-16 animate-slide-up">
//             <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
//               <span className="text-4xl">📦</span>
//             </div>
//             <h3 className="text-2xl font-bold text-foreground mb-2">No Products Found</h3>
//             <p className="text-muted-foreground mb-6">Start by creating your first product</p>
//             <Link href="/products/create">
//               <Button className="gradient-primary text-white border-0 h-11 font-semibold glow-primary">
//                 Create First Product
//               </Button>
//             </Link>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && items.length > 0 && (
//           <div className="flex justify-between items-center pt-8 border-t-2 border-border">
//             <Button
//               variant="outline"
//               onClick={handlePreviousPage}
//               disabled={currentPage === 0}
//               className="h-11 border-2 border-border hover:border-primary hover:text-primary transition-all bg-transparent"
//             >
//               ← Previous
//             </Button>
//             <span className="text-sm font-semibold text-muted-foreground">Page {currentPage + 1}</span>
//             <Button
//               variant="outline"
//               onClick={handleNextPage}
//               disabled={items.length < pageSize}
//               className="h-11 border-2 border-border hover:border-primary hover:text-primary transition-all bg-transparent"
//             >
//               Next →
//             </Button>
//           </div>
//         )}
//       </main>

//       <DeleteConfirmDialog
//         isOpen={!!deleteId}
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteId(null)}
//         title="Delete Product"
//         description="Are you sure you want to delete this product? This action cannot be undone."
//       />
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
  deleteProduct,
  setCurrentPage,
  setSearchQuery,
  setSelectedCategory,
} from "@/lib/slices/productsSlice"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import Link from "next/link"

export default function ProductsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const { items, categories, loading, error, currentPage, pageSize, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.products,
  )
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    dispatch(fetchCategories({ token }))
  }, [token, router, dispatch])

  useEffect(() => {
    if (!token) return

    if (searchQuery) {
      dispatch(searchProducts({ token, searchText: searchQuery }))
    } else {
      dispatch(
        fetchProducts({
          token,
          offset: currentPage * pageSize,
          limit: pageSize,
          categoryId: selectedCategory || undefined,
        }),
      )
    }
  }, [token, currentPage, pageSize, searchQuery, selectedCategory, dispatch])

  const handleSearch = (value: string) => {
    setSearchInput(value)
    dispatch(setSearchQuery(value))
  }

  const handleCategoryChange = (value: string) => {
    dispatch(setSelectedCategory(value === "all" ? null : value))
  }

  const handleDelete = async () => {
    if (!token || !deleteId) return

    await dispatch(deleteProduct({ token, id: deleteId }))
    setDeleteId(null)
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1))
  }

  return (
    <div className="min-h-screen bg-[#EFF1F3]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D1821]">
              Products
            </h1>
            <p className="text-[#4E6E5D] text-sm md:text-base font-medium">
              Manage your product catalog with ease
            </p>
          </div>
          <Link href="/products/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-6 font-semibold text-base transition-all duration-300 
              bg-[#A44A3F] hover:bg-[#A44A3F]/90 hover:scale-105 hover:shadow-2xl 
              text-white border-0 rounded-xl shadow-lg cursor-pointer">
              + Create Product
            </Button>
          </Link>
        </div>

        {/* Search & Filter Section */}
        <div className="group relative mb-8">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#A44A3F]/10 via-[#4E6E5D]/10 to-[#AD8A64]/10 
    rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl 
    bg-white/90 backdrop-blur-xl border border-[#AD8A64]/30 
    shadow-lg hover:shadow-2xl transition-all duration-500
    relative overflow-hidden">

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#A44A3F] rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#4E6E5D] rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Search Input - 2/3 width on desktop */}
            <div className="md:col-span-2 flex flex-col relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-bold text-[#0D1821] flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#A44A3F] rounded-full animate-pulse" />
                  Search Products
                </label>
                {searchInput && (
                  <span className="text-xs text-[#4E6E5D] bg-[#4E6E5D]/10 px-2 py-1 rounded-full font-medium animate-fade-in">
                    {items.length} results
                  </span>
                )}
              </div>
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by product name, description..."
                  value={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-11 pr-4 border-2 border-[#AD8A64]/40 focus:border-[#4E6E5D] 
            focus:ring-2 focus:ring-[#4E6E5D]/20 transition-all duration-300
            rounded-md bg-white/70 backdrop-blur-sm
            hover:border-[#AD8A64]/60 hover:bg-white/90
            text-[#0D1821] placeholder-[#4E6E5D]/60
            shadow-inner w-full"
                />
                {/* Search Icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#4E6E5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Clear Button */}
                {searchInput && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
              text-[#A44A3F] hover:text-[#A44A3F]/80 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter - 1/3 width on desktop */}
            <div className="flex flex-col relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-bold text-[#0D1821] flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4E6E5D] rounded-full animate-pulse" />
                  Filter by Category
                </label>
                {selectedCategory && selectedCategory !== "all" && (
                  <span className="text-xs text-[#A44A3F] bg-[#A44A3F]/10 px-2 py-1 rounded-full font-medium animate-fade-in">
                    Active
                  </span>
                )}
              </div>
              <div className="flex-1">
                <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="h-12 w-full pl-3 pr-10 border-2 border-[#AD8A64]/40 
            focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20
            rounded-md bg-white/70 backdrop-blur-sm
            hover:border-[#AD8A64]/60 hover:bg-white/90
            transition-all duration-300
            shadow-inner group">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-[#AD8A64]/20 bg-white/95 backdrop-blur-xl 
            shadow-2xl animate-in zoom-in-95">
                    <SelectItem
                      value="all"
                      className="rounded-lg py-3 hover:bg-[#4E6E5D]/10 transition-all duration-200
                focus:bg-[#4E6E5D]/10 focus:text-[#0D1821]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#AD8A64] rounded-full" />
                        All Categories
                      </div>
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="rounded-lg py-3 hover:bg-[#4E6E5D]/10 transition-all duration-200
                  focus:bg-[#4E6E5D]/10 focus:text-[#0D1821] group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#4E6E5D] rounded-full transition-transform group-hover:scale-150" />
                            {category.name}
                          </span>
                          {category.image && (
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#AD8A64]/20">
                              <img
                                src={category.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Actions - Only show when searching/filtering */}
            {(searchInput || (selectedCategory && selectedCategory !== "all")) && (
              <div className="col-span-full flex items-center justify-between pt-4 border-t border-[#AD8A64]/20 animate-slide-down">
                <span className="text-sm text-[#4E6E5D] font-medium">
                  {searchInput && `Searching for: "${searchInput}"`}
                  {searchInput && selectedCategory && selectedCategory !== "all" && ' • '}
                  {selectedCategory && selectedCategory !== "all" && `Filtered by: ${categories.find(c => c.id === selectedCategory)?.name}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSearch('')
                    handleCategoryChange('all')
                  }}
                  className="text-[#A44A3F] hover:text-[#A44A3F]/80 hover:bg-[#A44A3F]/10 
            transition-all duration-300 rounded-lg"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>




        {/* Error State */}
        {error && (
          <div className="p-6 mb-8 bg-gradient-to-r from-[#A44A3F]/10 to-[#A44A3F]/5 
            border-2 border-[#A44A3F]/30 rounded-xl animate-slide-down">
            <p className="text-[#A44A3F] font-semibold">⚠ Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gradient-to-br from-[#AD8A64]/10 to-[#4E6E5D]/10 
                  rounded-2xl animate-pulse border border-[#AD8A64]/20"
              />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in">
            {items.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  onDelete={() => setDeleteId(product.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="text-center py-16 animate-slide-up">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full 
              bg-gradient-to-br from-[#A44A3F]/10 to-[#4E6E5D]/10 
              flex items-center justify-center shadow-inner">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0D1821] mb-2">
              No Products Found
            </h3>
            <p className="text-[#4E6E5D] mb-6 font-medium">
              Start by creating your first product
            </p>
            <Link href="/products/create">
              <Button className="bg-[#A44A3F] hover:bg-[#A44A3F]/90 
                text-white border-0 h-11 font-semibold px-6 rounded-xl
                hover:scale-105 transition-all duration-300 shadow-lg">
                Create First Product
              </Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {!loading && items.length > 0 && (
          <div className="flex justify-between items-center pt-8 border-t-2 border-[#AD8A64]/20">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="h-11 px-6 border-2 border-[#4E6E5D] text-[#4E6E5D] 
                hover:bg-[#4E6E5D] hover:text-white transition-all duration-300
                rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Previous
            </Button>
            <span className="text-sm font-semibold text-[#4E6E5D]">
              Page {currentPage + 1}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={items.length < pageSize}
              className="h-11 px-6 border-2 border-[#4E6E5D] text-[#4E6E5D] 
                hover:bg-[#4E6E5D] hover:text-white transition-all duration-300
                rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next →
            </Button>
          </div>
        )}
      </main>

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  )
}