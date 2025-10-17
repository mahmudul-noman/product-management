// "use client"

// import { useEffect } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { fetchProductBySlug, updateProduct, fetchCategories } from "@/lib/slices/productsSlice"
// import { ProductForm } from "@/components/product-form"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function EditProductPage() {
//   const router = useRouter()
//   const params = useParams()
//   const slug = params.slug as string
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { currentProduct, loading, error, categories } = useAppSelector((state) => state.products)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchProductBySlug({ token, slug }))
//     if (categories.length === 0) {
//       dispatch(fetchCategories({ token }))
//     }
//   }, [token, slug, router, dispatch, categories.length])

//   const handleSubmit = async (formData: any) => {
//     if (!token || !currentProduct) return

//     const result = await dispatch(
//       updateProduct({
//         token,
//         id: currentProduct.id,
//         product: {
//           name: formData.name,
//           description: formData.description,
//           price: Number.parseFloat(formData.price),
//           images: formData.images,
//           categoryId: formData.categoryId,
//         },
//       }),
//     )

//     if (updateProduct.fulfilled.match(result)) {
//       router.push(`/products/${currentProduct.slug}`)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex justify-center items-center py-20">
//           <div className="text-center space-y-4">
//             <div className="flex justify-center">
//               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//             </div>
//             <p className="text-muted-foreground">Loading product...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !currentProduct) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center space-y-4">
//             <div className="text-5xl">⚠️</div>
//             <p className="text-destructive font-medium">{error || "Product not found"}</p>
//             <Link href="/products">
//               <Button>Back to Products</Button>
//             </Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         <div className="mb-8 space-y-4">
//           <Link href={`/products/${currentProduct.slug}`}>
//             <Button variant="ghost" className="gap-2 pl-0 hover:pl-0">
//               ← Back to Product
//             </Button>
//           </Link>
//           <div className="space-y-2">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground">Edit Product</h1>
//             <p className="text-muted-foreground">Update product information</p>
//           </div>
//         </div>

//         <ProductForm mode="edit" product={currentProduct} categories={categories} onSubmit={handleSubmit} />
//       </main>
//     </div>
//   )
// }




"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchProductBySlug, updateProduct, fetchCategories } from "@/lib/slices/productsSlice"
import { ProductForm } from "@/components/product-form"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit3, Package, Save } from "lucide-react"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const { currentProduct, loading, error, categories } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    dispatch(fetchProductBySlug({ token, slug }))
    if (categories.length === 0) {
      dispatch(fetchCategories({ token }))
    }
  }, [token, slug, router, dispatch, categories.length])

  // const handleSubmit = async (formData: any) => {
  //   if (!token || !currentProduct) return

  //   const result = await dispatch(
  //     updateProduct({
  //       token,
  //       id: currentProduct.id,
  //       product: {
  //         name: formData.name,
  //         description: formData.description,
  //         price: Number.parseFloat(formData.price),
  //         images: formData.images,
  //         categoryId: formData.categoryId,
  //       },
  //     }),
  //   )

  //   if (updateProduct.fulfilled.match(result)) {
  //     router.push(`/products/${currentProduct.slug}`)
  //   }
  // }

  const handleSubmit = async (formData: any) => {
    if (!token || !currentProduct) return

    const result = await dispatch(
      updateProduct({
        token,
        id: currentProduct.id,
        product: {
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          images: formData.images,
          categoryId: formData.categoryId,
        },
      }),
    )

    if (updateProduct.fulfilled.match(result)) {
      // Check if the response contains the updated product with new slug
      const updatedProduct = result.payload

      if (updatedProduct && updatedProduct.slug) {
        // Use the new slug from the updated product
        router.push(`/products/${updatedProduct.slug}`)
      } else {
        // Fallback: refetch the product to get updated slug
        const refreshResult = await dispatch(fetchProductBySlug({ token, slug: currentProduct.slug }))
        if (fetchProductBySlug.fulfilled.match(refreshResult)) {
          router.push(`/products/${refreshResult.payload.slug}`)
        } else {
          // Final fallback: go to products list
          router.push('/products')
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFF1F3]">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-[#4E6E5D] border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-[#0D1821]">Loading product details</p>
              <p className="text-[#4E6E5D]">Preparing the edit form...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-[#EFF1F3]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-6 py-16">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="space-y-3">
              <p className="text-xl font-bold text-[#0D1821]">{error || "Product not found"}</p>
              <p className="text-[#4E6E5D]">The product you're trying to edit doesn't exist or may have been moved.</p>
            </div>
            <Link href="/products">
              <Button className="bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 h-11 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EFF1F3]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          {/* Back Button */}
          <Link
            href={`/products/${currentProduct.slug}`}
            className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold transition-all duration-300 hover:gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Product
          </Link>

          {/* Header Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A44A3F] to-[#AD8A64] rounded-xl flex items-center justify-center shadow-lg">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0D1821]">
                    Edit Product
                  </h1>
                  <p className="text-[#4E6E5D] font-medium">
                    Update product information and details
                  </p>
                </div>
              </div>
            </div>

            {/* Current Product Info Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#AD8A64]/30 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#4E6E5D]/10 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-[#4E6E5D]" />
                </div>
                <h3 className="font-semibold text-[#0D1821] text-sm">Editing</h3>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-[#0D1821] text-sm truncate" title={currentProduct.name}>
                  {currentProduct.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#A44A3F] font-bold text-sm">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#4E6E5D] bg-[#4E6E5D]/10 px-2 py-1 rounded-full font-medium">
                    {currentProduct.category.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <ProductForm
          mode="edit"
          product={currentProduct}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  )
}