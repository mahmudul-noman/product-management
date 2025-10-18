// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { fetchProductBySlug, deleteProduct } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import Image from "next/image"
// import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// export default function ProductDetailsPage() {
//   const router = useRouter()
//   const params = useParams()
//   const slug = params.slug as string
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { currentProduct, loading, error } = useAppSelector((state) => state.products)
//   const [deleteConfirm, setDeleteConfirm] = useState(false)
//   const [deleting, setDeleting] = useState(false)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchProductBySlug({ token, slug }))
//   }, [token, slug, router, dispatch])

//   const handleDelete = async () => {
//     if (!token || !currentProduct) return

//     setDeleting(true)
//     const result = await dispatch(deleteProduct({ token, id: currentProduct.id }))
//     setDeleting(false)

//     if (deleteProduct.fulfilled.match(result)) {
//       router.push("/products")
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
//             <p className="text-muted-foreground">Loading product details...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !currentProduct) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

//       <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
//         >
//           ← Back to Products
//         </Link>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//           <div className="relative h-64 sm:h-80 md:h-96 bg-muted rounded-xl overflow-hidden shadow-lg animate-slide-up">
//             {currentProduct.images && currentProduct.images.length > 0 ? (
//               <Image
//                 src={currentProduct.images[0] || "/placeholder.svg"}
//                 alt={currentProduct.name}
//                 fill
//                 className="object-cover hover:scale-105 transition-transform duration-300"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-muted-foreground">
//                 <div className="text-center space-y-2">
//                   <div className="text-4xl">🖼️</div>
//                   <p>No image available</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-6 animate-slide-up">
//             <div className="space-y-3">
//               <h1 className="text-3xl md:text-4xl font-bold text-foreground">{currentProduct.name}</h1>
//               <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{currentProduct.description}</p>
//             </div>

//             {/* Price and Category Card */}
//             <Card className="border-border/50 shadow-md">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg">Product Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between items-center pb-4 border-b border-border">
//                   <p className="text-sm text-muted-foreground font-medium">Price</p>
//                   <p className="text-2xl md:text-3xl font-bold text-primary">${currentProduct.price.toFixed(2)}</p>
//                 </div>

//                 <div className="flex justify-between items-center pb-4 border-b border-border">
//                   <p className="text-sm text-muted-foreground font-medium">Category</p>
//                   <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
//                     {currentProduct.category.name}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center pb-4 border-b border-border">
//                   <p className="text-sm text-muted-foreground font-medium">Product ID</p>
//                   <p className="font-mono text-xs md:text-sm text-muted-foreground">
//                     {currentProduct.id.slice(0, 8)}...
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p className="text-sm text-muted-foreground font-medium">Created</p>
//                   <p className="text-sm text-foreground">
//                     {new Date(currentProduct.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <Link href={`/products/${currentProduct.slug}/edit`} className="flex-1">
//                 <Button className="w-full h-11 font-semibold transition-all hover:shadow-lg">✏️ Edit Product</Button>
//               </Link>
//               <Button
//                 variant="destructive"
//                 onClick={() => setDeleteConfirm(true)}
//                 className="flex-1 h-11 font-semibold transition-all hover:shadow-lg"
//               >
//                 🗑️ Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <DeleteConfirmDialog
//         open={deleteConfirm}
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteConfirm(false)}
//         title="Delete Product"
//         description="Are you sure you want to delete this product? This action cannot be undone."
//         isLoading={deleting}
//       />
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { fetchProductBySlug, deleteProduct } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import Image from "next/image"
// import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
// import { ArrowLeft, Edit, Trash2, Tag, Calendar, DollarSign, Package, ImageIcon, Layers } from "lucide-react"

// export default function ProductDetailsPage() {
//   const router = useRouter()
//   const params = useParams()
//   const slug = params.slug as string
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { currentProduct, loading, error } = useAppSelector((state) => state.products)
//   const [deleteConfirm, setDeleteConfirm] = useState(false)
//   const [deleting, setDeleting] = useState(false)
//   const [selectedImage, setSelectedImage] = useState(0)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchProductBySlug({ token, slug }))
//   }, [token, slug, router, dispatch])

//   const handleDelete = async () => {
//     if (!token || !currentProduct) return

//     setDeleting(true)
//     const result = await dispatch(deleteProduct({ token, id: currentProduct.id }))
//     setDeleting(false)

//     if (deleteProduct.fulfilled.match(result)) {
//       router.push("/products")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <div className="flex justify-center items-center py-20">
//           <div className="text-center space-y-6">
//             <div className="flex justify-center">
//               <div className="w-16 h-16 border-4 border-[#4E6E5D] border-t-transparent rounded-full animate-spin" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-lg font-semibold text-[#0D1821]">Loading product details</p>
//               <p className="text-[#4E6E5D]">Getting everything ready for you...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !currentProduct) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center space-y-6 py-16">
//             <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//               <span className="text-3xl">⚠️</span>
//             </div>
//             <div className="space-y-3">
//               <p className="text-xl font-bold text-[#0D1821]">{error || "Product not found"}</p>
//               <p className="text-[#4E6E5D]">The product you're looking for doesn't exist or may have been moved.</p>
//             </div>
//             <Link href="/products">
//               <Button className="bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 h-11 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Products
//               </Button>
//             </Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const hasMultipleImages = currentProduct.images && currentProduct.images.length > 1

//   return (
//     <div className="min-h-screen bg-[#EFF1F3]">
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         {/* Back Button */}
//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold mb-8 transition-all duration-300 hover:gap-3 group"
//         >
//           <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//           Back to Products
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Image Gallery Section */}
//           <div className="space-y-4 animate-slide-up">
//             {/* Main Image */}
//             <div className="relative h-80 sm:h-96 lg:h-[480px] bg-gradient-to-br from-[#AD8A64]/10 to-[#4E6E5D]/10 rounded-2xl overflow-hidden shadow-2xl border border-[#AD8A64]/20">
//               {currentProduct.images && currentProduct.images.length > 0 ? (
//                 <Image
//                   src={currentProduct.images[selectedImage]}
//                   alt={currentProduct.name}
//                   fill
//                   className="object-cover transition-transform duration-700 hover:scale-105"
//                   priority
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <div className="text-center space-y-4">
//                     <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//                       <ImageIcon className="w-8 h-8 text-[#4E6E5D]" />
//                     </div>
//                     <div className="space-y-1">
//                       <p className="font-semibold text-[#0D1821]">No image available</p>
//                       <p className="text-sm text-[#4E6E5D]">This product doesn't have any images yet</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* TOP LEFT: Image Count Badge */}
//               {hasMultipleImages && (
//                 <div className="absolute top-4 left-4 bg-[#0D1821]/90 text-white px-3 py-2 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-2 z-10">
//                   <Layers className="w-4 h-4" />
//                   {selectedImage + 1} / {currentProduct.images.length}
//                 </div>
//               )}

//               {/* TOP RIGHT: Category Badge - Always Visible */}
//               <div className="absolute top-4 right-4 bg-[#A44A3F] text-white
//                 px-3 py-2 rounded-full text-sm font-bold backdrop-blur-sm
//                 flex items-center gap-2 z-10 border border-white/20 shadow-lg">
//                 <Tag className="w-4 h-4" />
//                 {currentProduct.category.name}
//               </div>

//               {/* BOTTOM LEFT: Price Badge */}
//               <div className="absolute bottom-4 left-4 bg-[#4E6E5D] text-white
//                 px-3 py-2 rounded-full text-sm font-bold backdrop-blur-sm
//                 flex items-center gap-2 z-10 border border-white/20 shadow-lg">
//                 <DollarSign className="w-4 h-4" />
//                 ${currentProduct.price.toFixed(2)}
//               </div>
//             </div>

//             {/* Image Thumbnails */}
//             {hasMultipleImages && (
//               <div className="flex gap-3 overflow-x-auto pb-2">
//                 {currentProduct.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
//                       selectedImage === index
//                         ? 'border-[#A44A3F] shadow-lg scale-105'
//                         : 'border-[#AD8A64]/30 hover:border-[#4E6E5D]'
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${currentProduct.name} view ${index + 1}`}
//                       fill
//                       className="object-cover hover:scale-110 transition-transform duration-300"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info Section */}
//           <div className="space-y-6 animate-slide-up">
//             {/* Product Header - Optimized */}
//             <div className="space-y-4">
//               <div className="flex items-start justify-between gap-4">
//                 {/* Product Name - More Compact */}
//                 <h1 className="text-2xl lg:text-3xl font-bold text-[#0D1821] leading-tight">
//                   {currentProduct.name}
//                 </h1>
//               </div>

//               {/* Description */}
//               <p className="text-base text-[#4E6E5D] leading-relaxed">
//                 {currentProduct.description}
//               </p>
//             </div>

//             {/* Product Information Card */}
//             <Card className="border border-[#AD8A64]/30 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
//               <CardHeader className="pb-4 border-b border-[#AD8A64]/20">
//                 <CardTitle className="text-xl font-bold text-[#0D1821] flex items-center gap-2">
//                   <Package className="w-5 h-5 text-[#A44A3F]" />
//                   Product Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 pt-6">
//                 {/* Price */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#A44A3F]/10 flex items-center justify-center">
//                       <DollarSign className="w-5 h-5 text-[#A44A3F]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Price</p>
//                       <p className="text-xs text-[#4E6E5D]">Product selling price</p>
//                     </div>
//                   </div>
//                   <p className="text-2xl font-bold text-[#A44A3F]">
//                     ${currentProduct.price.toFixed(2)}
//                   </p>
//                 </div>

//                 {/* Category */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Tag className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Category</p>
//                       <p className="text-xs text-[#4E6E5D]">Product category</p>
//                     </div>
//                   </div>
//                   <span className="px-4 py-2 bg-[#4E6E5D]/10 text-[#4E6E5D] rounded-xl font-semibold text-sm">
//                     {currentProduct.category.name}
//                   </span>
//                 </div>

//                 {/* Product ID */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#AD8A64]/10 flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#AD8A64]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Product ID</p>
//                       <p className="text-xs text-[#4E6E5D]">Unique identifier</p>
//                     </div>
//                   </div>
//                   <p className="font-mono text-sm text-[#4E6E5D] bg-[#AD8A64]/10 px-3 py-1.5 rounded-lg">
//                     {currentProduct.id.slice(0, 8)}...
//                   </p>
//                 </div>

//                 {/* Creation Date */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Calendar className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Created Date</p>
//                       <p className="text-xs text-[#4E6E5D]">When product was added</p>
//                     </div>
//                   </div>
//                   <p className="text-sm font-semibold text-[#0D1821]">
//                     {new Date(currentProduct.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Link href={`/products/${currentProduct.slug}/edit`} className="flex-1">
//                 <Button className="w-full h-12 font-semibold transition-all duration-300
//                   border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white
//                   rounded-xl hover:shadow-lg hover:scale-105 bg-transparent
//                   flex items-center gap-2">
//                   <Edit className="w-5 h-5" />
//                   Edit Product
//                 </Button>
//               </Link>
//               <Button
//                 variant="destructive"
//                 onClick={() => setDeleteConfirm(true)}
//                 className="flex-1 h-12 font-semibold transition-all duration-300
//                   bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0
//                   rounded-xl hover:shadow-lg hover:scale-105
//                   flex items-center gap-2"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 Delete Product
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <DeleteConfirmDialog
//         open={deleteConfirm}
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteConfirm(false)}
//         title="Delete Product"
//         description="Are you sure you want to delete this product? This action cannot be undone."
//         isLoading={deleting}
//       />
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { fetchProductBySlug, deleteProduct } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import Image from "next/image"
// import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
// import { ArrowLeft, Edit, Trash2, Tag, Calendar, DollarSign, Package, ImageIcon, Layers, ZoomIn } from "lucide-react"

// export default function ProductDetailsPage() {
//   const router = useRouter()
//   const params = useParams()
//   const slug = params.slug as string
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { currentProduct, loading, error } = useAppSelector((state) => state.products)
//   const [deleteConfirm, setDeleteConfirm] = useState(false)
//   const [deleting, setDeleting] = useState(false)
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isMagnifierActive, setIsMagnifierActive] = useState(false)
//   const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
//   const imageContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchProductBySlug({ token, slug }))
//   }, [token, slug, router, dispatch])

//   const handleDelete = async () => {
//     if (!token || !currentProduct) return

//     setDeleting(true)
//     const result = await dispatch(deleteProduct({ token, id: currentProduct.id }))
//     setDeleting(false)

//     if (deleteProduct.fulfilled.match(result)) {
//       router.push("/products")
//     }
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isMagnifierActive || !imageContainerRef.current || !currentProduct?.images) return

//     const container = imageContainerRef.current
//     const { left, top, width, height } = container.getBoundingClientRect()

//     // Calculate cursor position relative to container
//     const x = e.clientX - left
//     const y = e.clientY - top

//     // Constrain cursor position to container bounds
//     const boundedX = Math.max(0, Math.min(x, width))
//     const boundedY = Math.max(0, Math.min(y, height))

//     setCursorPosition({ x: boundedX, y: boundedY })

//     // Calculate background position for magnified image (2x zoom)
//     const bgX = (boundedX / width) * 100
//     const bgY = (boundedY / height) * 100

//     setMagnifierPosition({ x: bgX, y: bgY })
//   }

//   const handleMouseEnter = () => {
//     if (currentProduct?.images && currentProduct.images.length > 0) {
//       setIsMagnifierActive(true)
//     }
//   }

//   const handleMouseLeave = () => {
//     setIsMagnifierActive(false)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <div className="flex justify-center items-center py-20">
//           <div className="text-center space-y-6">
//             <div className="flex justify-center">
//               <div className="w-16 h-16 border-4 border-[#4E6E5D] border-t-transparent rounded-full animate-spin" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-lg font-semibold text-[#0D1821]">Loading product details</p>
//               <p className="text-[#4E6E5D]">Getting everything ready for you...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !currentProduct) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center space-y-6 py-16">
//             <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//               <span className="text-3xl">⚠️</span>
//             </div>
//             <div className="space-y-3">
//               <p className="text-xl font-bold text-[#0D1821]">{error || "Product not found"}</p>
//               <p className="text-[#4E6E5D]">The product you're looking for doesn't exist or may have been moved.</p>
//             </div>
//             <Link href="/products">
//               <Button className="bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 h-11 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Products
//               </Button>
//             </Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const hasImages = currentProduct.images && currentProduct.images.length > 0
//   const hasMultipleImages = currentProduct.images && currentProduct.images.length > 1

//   return (
//     <div className="min-h-screen bg-[#EFF1F3]">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         {/* Back Button */}
//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold mb-8 transition-all duration-300 hover:gap-3 group"
//         >
//           <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//           Back to Products
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Image Gallery Section - Daraz Style */}
//           <div className="space-y-4 animate-slide-up">
//             {/* Main Image Container with Magnifier */}
//             <div className="flex gap-6">
//               {/* Thumbnail Column (Left) */}
//               {hasMultipleImages && (
//                 <div className="hidden md:flex flex-col gap-3 w-20">
//                   {currentProduct.images?.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
//                           ? 'border-[#A44A3F] shadow-md'
//                           : 'border-gray-200 hover:border-[#4E6E5D]'
//                         }`}
//                     >
//                       <Image
//                         src={image}
//                         alt={`${currentProduct.name} view ${index + 1}`}
//                         width={80}
//                         height={80}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Main Image with Daraz-style Magnifier */}
//               <div className="flex-1">
//                 <div
//                   ref={imageContainerRef}
//                   className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
//                   onMouseMove={handleMouseMove}
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {hasImages ? (
//                     <div className="aspect-square relative">
//                       {/* Main Product Image */}
//                       <Image
//                         src={currentProduct.images[selectedImage]}
//                         alt={currentProduct.name}
//                         fill
//                         className="object-contain cursor-crosshair"
//                         priority
//                       />

//                       {/* Magnified Overlay (Same Container) */}
//                       {isMagnifierActive && (
//                         <div
//                           className="absolute inset-0 bg-no-repeat pointer-events-none"
//                           style={{
//                             backgroundImage: `url(${currentProduct.images[selectedImage]})`,
//                             backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
//                             backgroundSize: '200%', // 2x zoom
//                           }}
//                         />
//                       )}

//                       {/* Magnifier Lens */}
//                       {isMagnifierActive && (
//                         <div
//                           className="absolute w-32 h-32 bg-white/30 border-2 border-white/80 shadow-2xl pointer-events-none z-10 rounded-lg"
//                           style={{
//                             left: `${cursorPosition.x - 64}px`,
//                             top: `${cursorPosition.y - 64}px`,
//                             transform: 'translate(-50%, -50%)',
//                           }}
//                         />
//                       )}

//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
//                         {/* Category Badge */}
//                         <div className="bg-[#A44A3F] text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
//                           <Tag className="w-3 h-3" />
//                           {currentProduct.category.name}
//                         </div>

//                         {/* Image Count Badge */}
//                         {hasMultipleImages && (
//                           <div className="bg-[#0D1821]/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
//                             <Layers className="w-3 h-3" />
//                             {selectedImage + 1}/{currentProduct.images.length}
//                           </div>
//                         )}
//                       </div>

//                       {/* Price Badge */}
//                       <div className="absolute bottom-3 left-3 bg-[#4E6E5D] text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg z-10">
//                         <DollarSign className="w-3 h-3" />
//                         ${currentProduct.price.toFixed(2)}
//                       </div>

//                       {/* Zoom Hint */}
//                       {!isMagnifierActive && (
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                           <div className="bg-[#0D1821]/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
//                             <ZoomIn className="w-4 h-4" />
//                             Hover to zoom
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="aspect-square flex items-center justify-center">
//                       <div className="text-center space-y-4">
//                         <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//                           <ImageIcon className="w-8 h-8 text-[#4E6E5D]" />
//                         </div>
//                         <div className="space-y-1">
//                           <p className="font-semibold text-[#0D1821]">No image available</p>
//                           <p className="text-sm text-[#4E6E5D]">This product doesn't have any images yet</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile Thumbnails */}
//                 {hasMultipleImages && (
//                   <div className="flex gap-3 mt-4 overflow-x-auto md:hidden">
//                     {currentProduct.images?.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedImage(index)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
//                             ? 'border-[#A44A3F] shadow-md'
//                             : 'border-gray-200 hover:border-[#4E6E5D]'
//                           }`}
//                       >
//                         <Image
//                           src={image}
//                           alt={`${currentProduct.name} view ${index + 1}`}
//                           width={64}
//                           height={64}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div className="space-y-6 animate-slide-up">
//             {/* Product Header */}
//             <div className="space-y-4">
//               <h1 className="text-2xl lg:text-3xl font-bold text-[#0D1821] leading-tight">
//                 {currentProduct.name}
//               </h1>

//               <p className="text-base text-[#4E6E5D] leading-relaxed">
//                 {currentProduct.description}
//               </p>
//             </div>

//             {/* Product Information Card */}
//             <Card className="border border-[#AD8A64]/30 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
//               <CardHeader className="pb-4 border-b border-[#AD8A64]/20">
//                 <CardTitle className="text-xl font-bold text-[#0D1821] flex items-center gap-2">
//                   <Package className="w-5 h-5 text-[#A44A3F]" />
//                   Product Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 pt-6">
//                 {/* Price */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#A44A3F]/10 flex items-center justify-center">
//                       <DollarSign className="w-5 h-5 text-[#A44A3F]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Price</p>
//                       <p className="text-xs text-[#4E6E5D]">Product selling price</p>
//                     </div>
//                   </div>
//                   <p className="text-2xl font-bold text-[#A44A3F]">
//                     ${currentProduct.price.toFixed(2)}
//                   </p>
//                 </div>

//                 {/* Category */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Tag className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Category</p>
//                       <p className="text-xs text-[#4E6E5D]">Product category</p>
//                     </div>
//                   </div>
//                   <span className="px-4 py-2 bg-[#4E6E5D]/10 text-[#4E6E5D] rounded-xl font-semibold text-sm">
//                     {currentProduct.category.name}
//                   </span>
//                 </div>

//                 {/* Product ID */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#AD8A64]/10 flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#AD8A64]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Product ID</p>
//                       <p className="text-xs text-[#4E6E5D]">Unique identifier</p>
//                     </div>
//                   </div>
//                   <p className="font-mono text-sm text-[#4E6E5D] bg-[#AD8A64]/10 px-3 py-1.5 rounded-lg">
//                     {currentProduct.id.slice(0, 8)}...
//                   </p>
//                 </div>

//                 {/* Creation Date */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Calendar className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Created Date</p>
//                       <p className="text-xs text-[#4E6E5D]">When product was added</p>
//                     </div>
//                   </div>
//                   <p className="text-sm font-semibold text-[#0D1821]">
//                     {new Date(currentProduct.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Link href={`/products/${currentProduct.slug}/edit`} className="flex-1">
//                 <Button className="w-full h-12 font-semibold transition-all duration-300
//                   border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white
//                   rounded-xl hover:shadow-lg hover:scale-105 bg-transparent
//                   flex items-center gap-2 cursor-pointer">
//                   <Edit className="w-5 h-5" />
//                   Edit Product
//                 </Button>
//               </Link>
//               <Button
//                 variant="destructive"
//                 onClick={() => setDeleteConfirm(true)}
//                 className="flex-1 h-12 font-semibold transition-all duration-300
//                   bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0
//                   rounded-xl hover:shadow-lg hover:scale-105
//                   flex items-center gap-2 cursor-pointer"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 Delete Product
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <DeleteConfirmDialog
//         open={deleteConfirm}
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteConfirm(false)}
//         title="Delete Product"
//         description="Are you sure you want to delete this product? This action cannot be undone."
//         isLoading={deleting}
//       />
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { fetchProductBySlug, deleteProduct } from "@/lib/slices/productsSlice"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import Image from "next/image"
// import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
// import { ArrowLeft, Edit, Trash2, Tag, Calendar, DollarSign, Package, ImageIcon, Layers, ZoomIn } from "lucide-react"

// export default function ProductDetailsPage() {
//   const router = useRouter()
//   const params = useParams()
//   const slug = params.slug as string
//   const dispatch = useAppDispatch()
//   const token = useAppSelector((state) => state.auth.token)
//   const { currentProduct, loading, error } = useAppSelector((state) => state.products)
//   const [deleteConfirm, setDeleteConfirm] = useState(false)
//   const [deleting, setDeleting] = useState(false)
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isMagnifierActive, setIsMagnifierActive] = useState(false)
//   const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
//   const imageContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!token) {
//       router.push("/login")
//       return
//     }

//     dispatch(fetchProductBySlug({ token, slug }))
//   }, [token, slug, router, dispatch])

//   const handleDelete = async () => {
//     if (!token || !currentProduct) return

//     setDeleting(true)
//     const result = await dispatch(deleteProduct({ token, id: currentProduct.id }))
//     setDeleting(false)

//     if (deleteProduct.fulfilled.match(result)) {
//       router.push("/products")
//     }
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isMagnifierActive || !imageContainerRef.current || !currentProduct?.images) return

//     const container = imageContainerRef.current
//     const { left, top, width, height } = container.getBoundingClientRect()

//     // Calculate cursor position relative to container
//     const x = e.clientX - left
//     const y = e.clientY - top

//     // Constrain cursor position to container bounds
//     const boundedX = Math.max(0, Math.min(x, width))
//     const boundedY = Math.max(0, Math.min(y, height))

//     setCursorPosition({ x: boundedX, y: boundedY })

//     // Calculate background position for magnified image (2x zoom)
//     const bgX = (boundedX / width) * 100
//     const bgY = (boundedY / height) * 100

//     setMagnifierPosition({ x: bgX, y: bgY })
//   }

//   const handleMouseEnter = () => {
//     if (currentProduct?.images && currentProduct.images.length > 0) {
//       setIsMagnifierActive(true)
//     }
//   }

//   const handleMouseLeave = () => {
//     setIsMagnifierActive(false)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <div className="flex justify-center items-center py-20">
//           <div className="text-center space-y-6">
//             <div className="flex justify-center">
//               <div className="w-16 h-16 border-4 border-[#4E6E5D] border-t-transparent rounded-full animate-spin" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-lg font-semibold text-[#0D1821]">Loading product details</p>
//               <p className="text-[#4E6E5D]">Getting everything ready for you...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !currentProduct) {
//     return (
//       <div className="min-h-screen bg-[#EFF1F3]">
//         <Navbar />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center space-y-6 py-16">
//             <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//               <span className="text-3xl">⚠️</span>
//             </div>
//             <div className="space-y-3">
//               <p className="text-xl font-bold text-[#0D1821]">{error || "Product not found"}</p>
//               <p className="text-[#4E6E5D]">The product you're looking for doesn't exist or may have been moved.</p>
//             </div>
//             <Link href="/products">
//               <Button className="bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 h-11 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Products
//               </Button>
//             </Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const hasImages = currentProduct.images && currentProduct.images.length > 0
//   const hasMultipleImages = currentProduct.images && currentProduct.images.length > 1

//   return (
//     <div className="min-h-screen bg-[#EFF1F3]">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
//         {/* Back Button */}
//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold mb-8 transition-all duration-300 hover:gap-3 group"
//         >
//           <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//           Back to Products
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Image Gallery Section - Daraz Style */}
//           <div className="space-y-4 animate-slide-up">
//             {/* Main Image Container with Magnifier */}
//             <div className="space-y-4">
//               {/* Main Image with Daraz-style Magnifier */}
//               <div>
//                 <div
//                   ref={imageContainerRef}
//                   className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
//                   onMouseMove={handleMouseMove}
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {hasImages ? (
//                     <div className="aspect-square relative">
//                       {/* Main Product Image */}
//                       <Image
//                         src={currentProduct.images[selectedImage]}
//                         alt={currentProduct.name}
//                         fill
//                         className="object-contain cursor-crosshair"
//                         priority
//                       />

//                       {/* Magnified Overlay (Same Container) */}
//                       {isMagnifierActive && (
//                         <div
//                           className="absolute inset-0 bg-no-repeat pointer-events-none"
//                           style={{
//                             backgroundImage: `url(${currentProduct.images[selectedImage]})`,
//                             backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
//                             backgroundSize: '200%', // 2x zoom
//                           }}
//                         />
//                       )}

//                       {/* Magnifier Lens */}
//                       {isMagnifierActive && (
//                         <div
//                           className="absolute w-32 h-32 bg-white/30 border-2 border-white/80 shadow-2xl pointer-events-none z-10 rounded-lg"
//                           style={{
//                             left: `${cursorPosition.x - 64}px`,
//                             top: `${cursorPosition.y - 64}px`,
//                             transform: 'translate(-50%, -50%)',
//                           }}
//                         />
//                       )}

//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
//                         {/* Category Badge */}
//                         <div className="bg-[#A44A3F] text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
//                           <Tag className="w-3 h-3" />
//                           {currentProduct.category.name}
//                         </div>

//                         {/* Image Count Badge */}
//                         {hasMultipleImages && (
//                           <div className="bg-[#0D1821]/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
//                             <Layers className="w-3 h-3" />
//                             {selectedImage + 1}/{currentProduct.images.length}
//                           </div>
//                         )}
//                       </div>

//                       {/* Price Badge */}
//                       <div className="absolute bottom-3 left-3 bg-[#4E6E5D] text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg z-10">
//                         <DollarSign className="w-3 h-3" />
//                         ${currentProduct.price.toFixed(2)}
//                       </div>

//                       {/* Zoom Hint */}
//                       {!isMagnifierActive && (
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                           <div className="bg-[#0D1821]/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
//                             <ZoomIn className="w-4 h-4" />
//                             Hover to zoom
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="aspect-square flex items-center justify-center">
//                       <div className="text-center space-y-4">
//                         <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
//                           <ImageIcon className="w-8 h-8 text-[#4E6E5D]" />
//                         </div>
//                         <div className="space-y-1">
//                           <p className="font-semibold text-[#0D1821]">No image available</p>
//                           <p className="text-sm text-[#4E6E5D]">This product doesn't have any images yet</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Thumbnail Row (Below) - Desktop */}
//               {hasMultipleImages && (
//                 <div className="hidden md:flex justify-center gap-3">
//                   {currentProduct.images?.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
//                           ? 'border-[#A44A3F] shadow-md'
//                           : 'border-gray-200 hover:border-[#4E6E5D]'
//                         }`}
//                     >
//                       <Image
//                         src={image}
//                         alt={`${currentProduct.name} view ${index + 1}`}
//                         width={80}
//                         height={80}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Mobile Thumbnails */}
//               {hasMultipleImages && (
//                 <div className="flex gap-3 overflow-x-auto md:hidden">
//                   {currentProduct.images?.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
//                           ? 'border-[#A44A3F] shadow-md'
//                           : 'border-gray-200 hover:border-[#4E6E5D]'
//                         }`}
//                     >
//                       <Image
//                         src={image}
//                         alt={`${currentProduct.name} view ${index + 1}`}
//                         width={64}
//                         height={64}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div className="space-y-6 animate-slide-up">
//             {/* Product Header */}
//             <div className="space-y-4">
//               <h1 className="text-2xl lg:text-3xl font-bold text-[#0D1821] leading-tight">
//                 {currentProduct.name}
//               </h1>

//               <p className="text-base text-[#4E6E5D] leading-relaxed">
//                 {currentProduct.description}
//               </p>
//             </div>

//             {/* Product Information Card */}
//             <Card className="border border-[#AD8A64]/30 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
//               <CardHeader className="pb-4 border-b border-[#AD8A64]/20">
//                 <CardTitle className="text-xl font-bold text-[#0D1821] flex items-center gap-2">
//                   <Package className="w-5 h-5 text-[#A44A3F]" />
//                   Product Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 pt-6">
//                 {/* Price */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#A44A3F]/10 flex items-center justify-center">
//                       <DollarSign className="w-5 h-5 text-[#A44A3F]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Price</p>
//                       <p className="text-xs text-[#4E6E5D]">Product selling price</p>
//                     </div>
//                   </div>
//                   <p className="text-2xl font-bold text-[#A44A3F]">
//                     ${currentProduct.price.toFixed(2)}
//                   </p>
//                 </div>

//                 {/* Category */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Tag className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Category</p>
//                       <p className="text-xs text-[#4E6E5D]">Product category</p>
//                     </div>
//                   </div>
//                   <span className="px-4 py-2 bg-[#4E6E5D]/10 text-[#4E6E5D] rounded-xl font-semibold text-sm">
//                     {currentProduct.category.name}
//                   </span>
//                 </div>

//                 {/* Product ID */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#AD8A64]/10 flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#AD8A64]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Product ID</p>
//                       <p className="text-xs text-[#4E6E5D]">Unique identifier</p>
//                     </div>
//                   </div>
//                   <p className="font-mono text-sm text-[#4E6E5D] bg-[#AD8A64]/10 px-3 py-1.5 rounded-lg">
//                     {currentProduct.id.slice(0, 8)}...
//                   </p>
//                 </div>

//                 {/* Creation Date */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
//                       <Calendar className="w-5 h-5 text-[#4E6E5D]" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-[#0D1821]">Created Date</p>
//                       <p className="text-xs text-[#4E6E5D]">When product was added</p>
//                     </div>
//                   </div>
//                   <p className="text-sm font-semibold text-[#0D1821]">
//                     {new Date(currentProduct.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Link href={`/products/${currentProduct.slug}/edit`} className="flex-1">
//                 <Button className="w-full h-12 font-semibold transition-all duration-300
//                   border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white
//                   rounded-xl hover:shadow-lg hover:scale-105 bg-transparent
//                   flex items-center gap-2 cursor-pointer">
//                   <Edit className="w-5 h-5" />
//                   Edit Product
//                 </Button>
//               </Link>
//               <Button
//                 variant="destructive"
//                 onClick={() => setDeleteConfirm(true)}
//                 className="flex-1 h-12 font-semibold transition-all duration-300
//                   bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0
//                   rounded-xl hover:shadow-lg hover:scale-105
//                   flex items-center gap-2 cursor-pointer"
//               >
//                 <Trash2 className="w-5 h-5" />
//                 Delete Product
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <DeleteConfirmDialog
//         open={deleteConfirm}
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteConfirm(false)}
//         title="Delete Product"
//         description="Are you sure you want to delete this product? This action cannot be undone."
//         isLoading={deleting}
//       />
//     </div>
//   )
// }

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProductBySlug, deleteProduct } from "@/lib/slices/productsSlice";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Tag,
  Calendar,
  DollarSign,
  Package,
  ImageIcon,
  Layers,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    dispatch(fetchProductBySlug({ token, slug }));
  }, [token, slug, router, dispatch]);

  const handleDelete = async () => {
    if (!token || !currentProduct) return;

    setDeleting(true);
    const result = await dispatch(
      deleteProduct({ token, id: currentProduct.id })
    );
    setDeleting(false);

    if (deleteProduct.fulfilled.match(result)) {
      router.push("/products");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !isMagnifierActive ||
      !imageContainerRef.current ||
      !currentProduct?.images
    )
      return;

    const container = imageContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    // Calculate cursor position relative to container
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Constrain cursor position to container bounds
    const boundedX = Math.max(0, Math.min(x, width));
    const boundedY = Math.max(0, Math.min(y, height));

    setCursorPosition({ x: boundedX, y: boundedY });

    // Calculate background position for magnified image (2x zoom)
    const bgX = (boundedX / width) * 100;
    const bgY = (boundedY / height) * 100;

    setMagnifierPosition({ x: bgX, y: bgY });
  };

  const handleMouseEnter = () => {
    if (currentProduct?.images && currentProduct.images.length > 0) {
      setIsMagnifierActive(true);
    }
  };

  const handleMouseLeave = () => {
    setIsMagnifierActive(false);
  };

  const showNextThumbnails = () => {
    if (!currentProduct?.images) return;
    const maxStartIndex = currentProduct.images.length - 5;
    setThumbnailStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const showPrevThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.max(prev - 1, 0));
  };

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
              <p className="text-lg font-semibold text-[#0D1821]">
                Loading product details
              </p>
              <p className="text-[#4E6E5D]">
                Getting everything ready for you...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-[#EFF1F3]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-6 py-16">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="space-y-3">
              <p className="text-xl font-bold text-[#0D1821]">
                {error || "Product not found"}
              </p>
              <p className="text-[#4E6E5D]">
                The product you're looking for doesn't exist or may have been
                moved.
              </p>
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
    );
  }

  const hasImages = currentProduct.images && currentProduct.images.length > 0;
  const hasMultipleImages =
    currentProduct.images && currentProduct.images.length > 1;
  const totalImages = currentProduct.images?.length || 0;
  const showCarouselControls = totalImages > 5;
  const visibleThumbnails =
    currentProduct.images?.slice(
      thumbnailStartIndex,
      thumbnailStartIndex + 5
    ) || [];

  return (
    <div className="min-h-screen bg-[#EFF1F3]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#4E6E5D] hover:text-[#4E6E5D]/80 font-semibold mb-8 transition-all duration-300 hover:gap-3 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery Section */}
          <div className="space-y-4 animate-slide-up">
            {/* Main Image Container with Magnifier */}
            <div className="space-y-4">
              {/* Main Image with Magnifier */}
              <div>
                <div
                  ref={imageContainerRef}
                  className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {hasImages ? (
                    <div className="aspect-square relative">
                      {/* Main Product Image */}
                      <Image
                        src={currentProduct.images[selectedImage]}
                        alt={currentProduct.name}
                        fill
                        className="object-contain cursor-crosshair"
                        priority
                      />

                      {/* Magnified Overlay (Same Container) */}
                      {isMagnifierActive && (
                        <div
                          className="absolute inset-0 bg-no-repeat pointer-events-none"
                          style={{
                            backgroundImage: `url(${currentProduct.images[selectedImage]})`,
                            backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                            backgroundSize: "200%", // 2x zoom
                          }}
                        />
                      )}

                      {/* Magnifier Lens */}
                      {isMagnifierActive && (
                        <div
                          className="absolute w-32 h-32 bg-white/30 border-2 border-white/80 shadow-2xl pointer-events-none z-10 rounded-lg"
                          style={{
                            left: `${cursorPosition.x - 64}px`,
                            top: `${cursorPosition.y - 64}px`,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                        {/* Category Badge */}
                        <div className="bg-[#A44A3F] text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <Tag className="w-3 h-3" />
                          {currentProduct.category.name}
                        </div>

                        {/* Image Count Badge */}
                        {hasMultipleImages && (
                          <div className="bg-[#0D1821]/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                            <Layers className="w-3 h-3" />
                            {selectedImage + 1}/{currentProduct.images.length}
                          </div>
                        )}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#4E6E5D] text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg z-10">
                        <DollarSign className="w-3 h-3" />$
                        {currentProduct.price.toFixed(2)}
                      </div>

                      {/* Zoom Hint */}
                      {!isMagnifierActive && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="bg-[#0D1821]/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
                            <ZoomIn className="w-4 h-4" />
                            Hover to zoom
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-[#4E6E5D]" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-[#0D1821]">
                            No image available
                          </p>
                          <p className="text-sm text-[#4E6E5D]">
                            This product doesn't have any images yet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Carousel (Below) - Desktop */}
              {hasMultipleImages && (
                <div className="hidden md:block">
                  <div className="relative">
                    {/* Navigation Arrows - Only show if more than 5 images */}
                    {showCarouselControls && (
                      <>
                        <button
                          onClick={showPrevThumbnails}
                          disabled={thumbnailStartIndex === 0}
                          className={`absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 ${
                            thumbnailStartIndex === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-50 hover:scale-110"
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={showNextThumbnails}
                          disabled={thumbnailStartIndex >= totalImages - 5}
                          className={`absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 ${
                            thumbnailStartIndex >= totalImages - 5
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-50 hover:scale-110"
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </>
                    )}

                    {/* Thumbnail Container */}
                    <div
                      ref={thumbnailContainerRef}
                      className="flex justify-center gap-3 mx-auto max-w-md transition-all duration-300"
                    >
                      {visibleThumbnails.map((image, index) => {
                        const actualIndex = thumbnailStartIndex + index;
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => setSelectedImage(actualIndex)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                              selectedImage === actualIndex
                                ? "border-[#A44A3F] shadow-md scale-105"
                                : "border-gray-200 hover:border-[#4E6E5D] hover:shadow-sm"
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${currentProduct.name} view ${
                                actualIndex + 1
                              }`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Carousel Indicators - Show dots when in carousel mode */}
                    {showCarouselControls && (
                      <div className="flex justify-center gap-1 mt-3">
                        {Array.from({ length: Math.ceil(totalImages / 5) }).map(
                          (_, index) => (
                            <button
                              key={index}
                              onClick={() => setThumbnailStartIndex(index * 5)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                thumbnailStartIndex === index * 5
                                  ? "bg-[#A44A3F] w-4"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Thumbnails - Always scrollable */}
              {hasMultipleImages && (
                <div className="flex gap-3 overflow-x-auto md:hidden">
                  {currentProduct.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === index
                          ? "border-[#A44A3F] shadow-md"
                          : "border-gray-200 hover:border-[#4E6E5D]"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${currentProduct.name} view ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6 animate-slide-up">
            {/* Product Header */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0D1821] leading-tight">
                {currentProduct.name}
              </h1>

              <p className="text-base text-[#4E6E5D] leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Product Information Card */}
            <Card className="border border-[#AD8A64]/30 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-4 border-b border-[#AD8A64]/20">
                <CardTitle className="text-xl font-bold text-[#0D1821] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#A44A3F]" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A44A3F]/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[#A44A3F]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D1821]">
                        Price
                      </p>
                      <p className="text-xs text-[#4E6E5D]">
                        Product selling price
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#A44A3F]">
                    ${currentProduct.price.toFixed(2)}
                  </p>
                </div>

                {/* Category */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-[#4E6E5D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D1821]">
                        Category
                      </p>
                      <p className="text-xs text-[#4E6E5D]">Product category</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-[#4E6E5D]/10 text-[#4E6E5D] rounded-xl font-semibold text-sm">
                    {currentProduct.category.name}
                  </span>
                </div>

                {/* Product ID */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#AD8A64]/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#AD8A64]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D1821]">
                        Product ID
                      </p>
                      <p className="text-xs text-[#4E6E5D]">
                        Unique identifier
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-[#4E6E5D] bg-[#AD8A64]/10 px-3 py-1.5 rounded-lg">
                    {currentProduct.id.slice(0, 8)}...
                  </p>
                </div>

                {/* Creation Date */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4E6E5D]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#4E6E5D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D1821]">
                        Created Date
                      </p>
                      <p className="text-xs text-[#4E6E5D]">
                        When product was added
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#0D1821]">
                    {new Date(currentProduct.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/products/${currentProduct.slug}/edit`}
                className="flex-1"
              >
                <Button
                  className="w-full h-12 font-semibold transition-all duration-300 
                  border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white
                  rounded-xl hover:shadow-lg hover:scale-105 bg-transparent
                  flex items-center gap-2 cursor-pointer"
                >
                  <Edit className="w-5 h-5" />
                  Edit Product
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => setDeleteConfirm(true)}
                className="flex-1 h-12 font-semibold transition-all duration-300 
                  bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0
                  rounded-xl hover:shadow-lg hover:scale-105
                  flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={deleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isLoading={deleting}
      />
    </div>
  );
}
