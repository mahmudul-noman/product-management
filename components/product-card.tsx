"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/slices/productsSlice";
import Image from "next/image";
import {
  Eye,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const hasImages = product.images && product.images.length > 0;
  const imageCount = product.images?.length || 0;

  return (
    <Card
      className="group relative overflow-hidden border border-[#AD8A64]/30 
      bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl 
      transition-all duration-500 hover:-translate-y-2 animate-slide-up
      hover:border-[#4E6E5D]/40 flex flex-col h-full"
    >
      {/* Background Gradient Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#EFF1F3] via-white to-[#AD8A64]/5 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Image Container - Fixed Height */}
      <div className="relative h-48 bg-gradient-to-br from-[#AD8A64]/10 to-[#4E6E5D]/10 overflow-hidden flex-shrink-0">
        {hasImages ? (
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Image Count Badge */}
            {imageCount > 1 && (
              <div
                className="absolute top-3 left-3 bg-[#0D1821]/80 text-white 
                px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm
                flex items-center gap-1 transition-all duration-300 group-hover:scale-105"
              >
                <ImageIcon className="w-3 h-3" />
                {imageCount}
              </div>
            )}
            {/* Image Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0D1821]/10 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A44A3F]/20 to-[#4E6E5D]/20 
                flex items-center justify-center mx-auto shadow-inner"
              >
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-xs text-[#4E6E5D] font-medium">
                No image available
              </p>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span
            className="flex items-center gap-1 text-xs bg-[#4E6E5D] text-white 
            px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm
            transition-all duration-300 group-hover:scale-105"
          >
            <Tag className="w-3 h-3" />
            {product.category.name}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div
          className="absolute inset-0 bg-[#0D1821]/70 opacity-0 group-hover:opacity-100 
          transition-all duration-500 flex items-center justify-center gap-3"
        >
          <Link
            href={`/products/${product.slug}`}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0 
                backdrop-blur-sm transition-all duration-300 hover:scale-110 rounded-xl cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href={`/products/${product.slug}/edit`}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <Button
              size="sm"
              className="bg-[#4E6E5D] hover:bg-[#4E6E5D]/80 text-white border-0 
                transition-all duration-300 hover:scale-110 rounded-xl cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            <Button
              size="sm"
              onClick={onDelete}
              className="bg-[#A44A3F] hover:bg-[#A44A3F]/80 text-white border-0 
                transition-all duration-300 hover:scale-110 rounded-xl cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area - Flexible Height */}
      <div className="flex flex-col flex-1">
        <CardContent className="relative pt-4 pb-3 space-y-3 flex-1">
          {/* Product Name & Description */}
          <div className="flex flex-col flex-1">
            <h3
              className="font-bold text-lg text-[#0D1821] line-clamp-2 
              group-hover:text-[#4E6E5D] transition-colors duration-300 leading-tight mb-2"
            >
              {product.name}
            </h3>
          </div>

          {/* Price & Date Row */}
          <div className="flex justify-between items-center pt-3 border-t border-[#AD8A64]/20 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#A44A3F] bg-gradient-to-r from-[#A44A3F] to-[#AD8A64] bg-clip-text">
                ${product.price.toFixed(2)}
              </span>
              {/* Price indicator based on value */}
              {product.price > 200 && (
                <span className="text-xs text-[#A44A3F] font-semibold bg-[#A44A3F]/10 px-2 py-1 rounded-full">
                  Premium
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#4E6E5D] font-medium">
              <Calendar className="w-3 h-3" />
              {new Date(product.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Visual Separator */}
          <div className="w-full bg-gradient-to-r from-transparent via-[#AD8A64]/20 to-transparent h-px" />
        </CardContent>

        {/* Footer - Fixed Height */}
        <CardFooter className="relative gap-2 pt-3 border-t border-[#AD8A64]/20 flex-shrink-0">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-10 text-sm font-semibold transition-all duration-300 
                border-2 border-[#4E6E5D] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white
                rounded-xl hover:shadow-lg hover:scale-105 bg-transparent cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/products/${product.slug}/edit`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-10 text-sm font-semibold transition-all duration-300 
                border-2 border-[#AD8A64] text-[#AD8A64] hover:bg-[#AD8A64] hover:text-white
                rounded-xl hover:shadow-lg hover:scale-105 bg-transparent cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="flex-1 h-10 text-sm font-semibold transition-all duration-300 
              bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0
              rounded-xl hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </div>

      {/* Corner Accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#A44A3F] 
        rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#4E6E5D] 
        rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#AD8A64] 
        rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4E6E5D] 
        rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
    </Card>
  );
}
