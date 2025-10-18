// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { Category, Product } from "@/lib/slices/productsSlice"

// interface ProductFormProps {
//   onSubmit: (data: any) => Promise<void>
//   categories: Category[]
//   product?: Product
//   mode?: "create" | "edit"
// }

// interface FormErrors {
//   name?: string
//   description?: string
//   price?: string
//   images?: string
//   categoryId?: string
// }

// export function ProductForm({ onSubmit, categories, product, mode = "create" }: ProductFormProps) {
//   const [formData, setFormData] = useState(
//     product
//       ? {
//           name: product.name,
//           description: product.description,
//           price: product.price.toString(),
//           images: product.images || [""],
//           categoryId: product.category.id,
//         }
//       : {
//           name: "",
//           description: "",
//           price: "",
//           images: [""],
//           categoryId: "",
//         },
//   )
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [loading, setLoading] = useState(false)
//   const [touched, setTouched] = useState<Record<string, boolean>>({})

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Product name is required"
//     } else if (formData.name.length < 3) {
//       newErrors.name = "Product name must be at least 3 characters"
//     } else if (formData.name.length > 100) {
//       newErrors.name = "Product name must be less than 100 characters"
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required"
//     } else if (formData.description.length < 10) {
//       newErrors.description = "Description must be at least 10 characters"
//     } else if (formData.description.length > 1000) {
//       newErrors.description = "Description must be less than 1000 characters"
//     }

//     if (!formData.price) {
//       newErrors.price = "Price is required"
//     } else {
//       const price = Number.parseFloat(formData.price)
//       if (isNaN(price) || price <= 0) {
//         newErrors.price = "Price must be a positive number"
//       } else if (price > 999999) {
//         newErrors.price = "Price is too high"
//       }
//     }

//     if (!formData.categoryId) {
//       newErrors.categoryId = "Category is required"
//     }

//     if (formData.images.length === 0 || !formData.images[0].trim()) {
//       newErrors.images = "At least one image URL is required"
//     } else {
//       const invalidUrls = formData.images.filter((url) => url.trim() && !isValidUrl(url.trim()))
//       if (invalidUrls.length > 0) {
//         newErrors.images = "Please enter valid image URLs"
//       }
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const isValidUrl = (url: string): boolean => {
//     try {
//       new URL(url)
//       return true
//     } catch {
//       return false
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)
//     try {
//       await onSubmit({
//         ...formData,
//         images: formData.images.filter((url) => url.trim()),
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageChange = (index: number, value: string) => {
//     const newImages = [...formData.images]
//     newImages[index] = value
//     setFormData({ ...formData, images: newImages })
//     if (errors.images) setErrors({ ...errors, images: undefined })
//   }

//   const addImageField = () => {
//     setFormData({
//       ...formData,
//       images: [...formData.images, ""],
//     })
//   }

//   const removeImageField = (index: number) => {
//     const newImages = formData.images.filter((_, i) => i !== index)
//     setFormData({
//       ...formData,
//       images: newImages.length === 0 ? [""] : newImages,
//     })
//   }

//   const handleFieldBlur = (field: string) => {
//     setTouched({ ...touched, [field]: true })
//   }

//   return (
//     <Card className="border-border/50 shadow-lg animate-slide-up">
//       <CardHeader className="pb-6">
//         <CardTitle className="text-2xl">{mode === "edit" ? "Edit Product" : "Create New Product"}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label htmlFor="name" className="text-sm font-semibold text-foreground">
//               Product Name <span className="text-destructive">*</span>
//             </label>
//             <Input
//               id="name"
//               placeholder="Enter product name"
//               value={formData.name}
//               onChange={(e) => {
//                 setFormData({ ...formData, name: e.target.value })
//                 if (errors.name) setErrors({ ...errors, name: undefined })
//               }}
//               onBlur={() => handleFieldBlur("name")}
//               disabled={loading}
//               className={`h-11 transition-all ${
//                 errors.name && touched.name ? "border-destructive focus:ring-destructive" : "focus:ring-primary"
//               }`}
//             />
//             {errors.name && touched.name && (
//               <p className="text-sm text-destructive font-medium animate-slide-down">{errors.name}</p>
//             )}
//             <p className="text-xs text-muted-foreground">{formData.name.length}/100 characters</p>
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="description" className="text-sm font-semibold text-foreground">
//               Description <span className="text-destructive">*</span>
//             </label>
//             <textarea
//               id="description"
//               placeholder="Enter product description"
//               value={formData.description}
//               onChange={(e) => {
//                 setFormData({ ...formData, description: e.target.value })
//                 if (errors.description) setErrors({ ...errors, description: undefined })
//               }}
//               onBlur={() => handleFieldBlur("description")}
//               disabled={loading}
//               className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none h-24 ${
//                 errors.description && touched.description
//                   ? "border-destructive focus:ring-destructive"
//                   : "border-border focus:ring-primary"
//               }`}
//               rows={4}
//             />
//             {errors.description && touched.description && (
//               <p className="text-sm text-destructive font-medium animate-slide-down">{errors.description}</p>
//             )}
//             <p className="text-xs text-muted-foreground">{formData.description.length}/1000 characters</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label htmlFor="price" className="text-sm font-semibold text-foreground">
//                 Price (USD) <span className="text-destructive">*</span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
//                 <Input
//                   id="price"
//                   type="number"
//                   placeholder="0.00"
//                   step="0.01"
//                   min="0"
//                   value={formData.price}
//                   onChange={(e) => {
//                     setFormData({ ...formData, price: e.target.value })
//                     if (errors.price) setErrors({ ...errors, price: undefined })
//                   }}
//                   onBlur={() => handleFieldBlur("price")}
//                   disabled={loading}
//                   className={`h-11 pl-7 transition-all ${
//                     errors.price && touched.price ? "border-destructive focus:ring-destructive" : "focus:ring-primary"
//                   }`}
//                 />
//               </div>
//               {errors.price && touched.price && (
//                 <p className="text-sm text-destructive font-medium animate-slide-down">{errors.price}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="category" className="text-sm font-semibold text-foreground">
//                 Category <span className="text-destructive">*</span>
//               </label>
//               <Select
//                 value={formData.categoryId}
//                 onValueChange={(value) => {
//                   setFormData({ ...formData, categoryId: value })
//                   if (errors.categoryId) setErrors({ ...errors, categoryId: undefined })
//                 }}
//                 disabled={loading}
//               >
//                 <SelectTrigger
//                   id="category"
//                   className={`h-11 transition-all ${
//                     errors.categoryId && touched.categoryId ? "border-destructive" : ""
//                   }`}
//                 >
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.categoryId && touched.categoryId && (
//                 <p className="text-sm text-destructive font-medium animate-slide-down">{errors.categoryId}</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
//             <div className="flex justify-between items-center">
//               <label className="text-sm font-semibold text-foreground">
//                 Product Images <span className="text-destructive">*</span>
//               </label>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={addImageField}
//                 disabled={loading || formData.images.length >= 5}
//                 className="h-8 text-xs"
//               >
//                 + Add Image
//               </Button>
//             </div>

//             <div className="space-y-2">
//               {formData.images.map((image, index) => (
//                 <div key={index} className="flex gap-2">
//                   <Input
//                     placeholder="https://example.com/image.jpg"
//                     value={image}
//                     onChange={(e) => handleImageChange(index, e.target.value)}
//                     disabled={loading}
//                     className="flex-1 h-10 text-sm"
//                   />
//                   {formData.images.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeImageField(index)}
//                       disabled={loading}
//                       className="h-10 px-3"
//                     >
//                       Remove
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//             {errors.images && touched.images && (
//               <p className="text-sm text-destructive font-medium animate-slide-down">{errors.images}</p>
//             )}
//             <p className="text-xs text-muted-foreground">{formData.images.length}/5 images • Use valid image URLs</p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
//             <Button
//               type="submit"
//               disabled={loading}
//               className="flex-1 h-11 font-semibold text-base transition-all hover:shadow-lg"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                   {mode === "edit" ? "Updating..." : "Creating..."}
//                 </span>
//               ) : mode === "edit" ? (
//                 "Update Product"
//               ) : (
//                 "Create Product"
//               )}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => window.history.back()}
//               disabled={loading}
//               className="flex-1 h-11 font-semibold transition-all"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category, Product } from "@/lib/slices/productsSlice"
import { Plus, Trash2, Image as ImageIcon, DollarSign, Tag, FileText, Package } from "lucide-react"

interface ProductFormProps {
  onSubmit: (data: any) => Promise<void>
  categories: Category[]
  product?: Product
  mode?: "create" | "edit"
}

interface FormErrors {
  name?: string
  description?: string
  price?: string
  images?: string
  categoryId?: string
}

export function ProductForm({ onSubmit, categories, product, mode = "create" }: ProductFormProps) {
  const [formData, setFormData] = useState(
    product
      ? {
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        images: product.images || [""],
        categoryId: product.category.id,
      }
      : {
        name: "",
        description: "",
        price: "",
        images: [""],
        categoryId: "",
      },
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters"
    } else if (formData.name.length > 100) {
      newErrors.name = "Product name must be less than 100 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else {
      const price = Number.parseFloat(formData.price)
      if (isNaN(price) || price <= 0) {
        newErrors.price = "Price must be a positive number"
      } else if (price > 999999) {
        newErrors.price = "Price is too high"
      }
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required"
    }

    if (formData.images.length === 0 || !formData.images[0].trim()) {
      newErrors.images = "At least one image URL is required"
    } else {
      const invalidUrls = formData.images.filter((url) => url.trim() && !isValidUrl(url.trim()))
      if (invalidUrls.length > 0) {
        newErrors.images = "Please enter valid image URLs"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSubmit({
        ...formData,
        images: formData.images.filter((url) => url.trim()),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
    if (errors.images) setErrors({ ...errors, images: undefined })
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    })
  }

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages.length === 0 ? [""] : newImages,
    })
  }

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-[#AD8A64]/20 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Form Header */}
      <div className="border-b border-[#AD8A64]/20 bg-gradient-to-r from-[#A44A3F]/5 to-[#4E6E5D]/5 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4E6E5D] to-[#AD8A64] rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0D1821]">
              {mode === "edit" ? "Edit Product Details" : "Create New Product"}
            </h2>
            <p className="text-[#4E6E5D] text-sm">
              {mode === "edit" ? "Update the product information below" : "Fill in the product details below"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} id="product-form" className="space-y-6">
          {/* Product Name */}
          <div className="space-y-3">
            <label htmlFor="name" className="text-sm font-semibold text-[#0D1821] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A44A3F]" />
              Product Name <span className="text-[#A44A3F]">*</span>
            </label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              onBlur={() => handleFieldBlur("name")}
              disabled={loading}
              className={`h-11 border-2 transition-all duration-300 rounded-xl ${errors.name && touched.name
                  ? "border-[#A44A3F] focus:border-[#A44A3F] focus:ring-2 focus:ring-[#A44A3F]/20"
                  : "border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20"
                }`}
            />
            {errors.name && touched.name && (
              <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-1">
                • {errors.name}
              </p>
            )}
            <p className="text-xs text-[#4E6E5D] font-medium">
              {formData.name.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label htmlFor="description" className="text-sm font-semibold text-[#0D1821] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A44A3F]" />
              Description <span className="text-[#A44A3F]">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value })
                if (errors.description) setErrors({ ...errors, description: undefined })
              }}
              onBlur={() => handleFieldBlur("description")}
              disabled={loading}
              className={`w-full px-3 py-3 border-2 rounded-xl bg-white text-[#0D1821] placeholder-[#4E6E5D]/60 focus:outline-none transition-all duration-300 resize-none h-32 ${errors.description && touched.description
                  ? "border-[#A44A3F] focus:border-[#A44A3F] focus:ring-2 focus:ring-[#A44A3F]/20"
                  : "border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20"
                }`}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-1">
                • {errors.description}
              </p>
            )}
            <p className="text-xs text-[#4E6E5D] font-medium">
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* Price & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-3">
              <label htmlFor="price" className="text-sm font-semibold text-[#0D1821] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#A44A3F]" />
                Price (USD) <span className="text-[#A44A3F]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4E6E5D] font-semibold">$</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value })
                    if (errors.price) setErrors({ ...errors, price: undefined })
                  }}
                  onBlur={() => handleFieldBlur("price")}
                  disabled={loading}
                  className={`h-11 pl-7 border-2 transition-all duration-300 rounded-xl ${errors.price && touched.price
                      ? "border-[#A44A3F] focus:border-[#A44A3F] focus:ring-2 focus:ring-[#A44A3F]/20"
                      : "border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20"
                    }`}
                />
              </div>
              {errors.price && touched.price && (
                <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-1">
                  • {errors.price}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label htmlFor="category" className="text-sm font-semibold text-[#0D1821] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#A44A3F]" />
                Category <span className="text-[#A44A3F]">*</span>
              </label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => {
                  setFormData({ ...formData, categoryId: value })
                  if (errors.categoryId) setErrors({ ...errors, categoryId: undefined })
                }}
                disabled={loading}
              >
                <SelectTrigger
                  id="category"
                  className={`h-11 border-2 transition-all duration-300 rounded-xl ${errors.categoryId && touched.categoryId
                      ? "border-[#A44A3F] focus:border-[#A44A3F] focus:ring-2 focus:ring-[#A44A3F]/20"
                      : "border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20"
                    }`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-2 border-[#AD8A64]/20 rounded-xl">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                      className="hover:bg-[#4E6E5D]/10 focus:bg-[#4E6E5D]/10 transition-colors"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && touched.categoryId && (
                <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-1">
                  • {errors.categoryId}
                </p>
              )}
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4 p-6 bg-gradient-to-br from-[#AD8A64]/5 to-[#4E6E5D]/5 rounded-2xl border-2 border-[#AD8A64]/20">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#0D1821] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#A44A3F]" />
                Product Images <span className="text-[#A44A3F]">*</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
                disabled={loading || formData.images.length >= 5}
                className="h-9 px-3 border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white transition-all duration-300 rounded-lg font-semibold"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Image
              </Button>
            </div>

            <div className="space-y-3">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    disabled={loading}
                    className="flex-1 h-10 text-sm border-2 border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20 rounded-lg transition-all duration-300"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImageField(index)}
                      disabled={loading}
                      className="h-10 px-3 bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0 transition-all duration-300 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {errors.images && touched.images && (
              <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-1">
                • {errors.images}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#AD8A64]/20">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 cursor-pointer font-semibold text-base transition-all duration-300 rounded-xl bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 hover:scale-105 hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {mode === "edit" ? "Updating..." : "Creating..."}
                </span>
              ) : mode === "edit" ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}