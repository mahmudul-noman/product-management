// "use client"

// import { useRouter } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { createProduct, fetchCategories } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { ProductForm } from "@/components/product-form"
// import { useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export default function CreateProductPage() {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const categories = useAppSelector((state) => state.products.categories)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     if (categories.length === 0) {
//       dispatch(fetchCategories({ token }))
//     }
//   }, [token, router, dispatch, categories.length])

//   const handleSubmit = async (formData: any) => {
//     if (!token) return

//     const result = await dispatch(
//       createProduct({
//         token,
//         product: {
//           name: formData.name,
//           description: formData.description,
//           price: Number.parseFloat(formData.price),
//           images: formData.images,
//           categoryId: formData.categoryId,
//           category: categories.find((c) => c.id === formData.categoryId)!,
//         },
//       }),
//     )

//     if (createProduct.fulfilled.match(result)) {
//       router.push("/products")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         <div className="mb-8 space-y-4">
//           <Link href="/products">
//             <Button variant="ghost" className="gap-2 pl-0 hover:pl-0">
//               ← Back to Products
//             </Button>
//           </Link>
//           <div className="space-y-2">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground">Create Product</h1>
//             <p className="text-muted-foreground">Add a new product to your catalog</p>
//           </div>
//         </div>

//         <ProductForm onSubmit={handleSubmit} categories={categories} />
//       </main>
//     </div>
//   )
// }



"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { createProduct, fetchCategories } from "@/lib/slices/productsSlice"
import { Navbar } from "@/components/navbar"
import { ProductForm } from "@/components/product-form"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Package } from "lucide-react"

export default function CreateProductPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const categories = useAppSelector((state) => state.products.categories)

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    if (categories.length === 0) {
      dispatch(fetchCategories({ token }))
    }
  }, [token, router, dispatch, categories.length])

  const handleSubmit = async (formData: any) => {
    if (!token) return

    const result = await dispatch(
      createProduct({
        token,
        product: {
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          images: formData.images,
          categoryId: formData.categoryId,
          category: categories.find((c) => c.id === formData.categoryId)!,
        },
      }),
    )

    if (createProduct.fulfilled.match(result)) {
      router.push("/products")
    }
  }

  return (
    <div className="min-h-screen bg-[#EFF1F3]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          {/* Back Button */}
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold transition-all duration-300 hover:gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>

          {/* Header Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4E6E5D] to-[#AD8A64] rounded-xl flex items-center justify-center shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0D1821]">
                    Create Product
                  </h1>
                  <p className="text-[#4E6E5D] font-medium">
                    Add a new product to your catalog
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#AD8A64]/30 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#4E6E5D]/10 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-[#4E6E5D]" />
                </div>
                <h3 className="font-semibold text-[#0D1821] text-sm">New Product</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#4E6E5D]">
                  Fill in all required fields to create a new product in your catalog.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#A44A3F] font-medium">
                  <span className="w-1.5 h-1.5 bg-[#A44A3F] rounded-full"></span>
                  All fields are required
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <ProductForm onSubmit={handleSubmit} categories={categories} />

      </main>
    </div>
  )
}