"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, X, AlertTriangle } from "lucide-react"

interface DeleteConfirmDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  description: string
  isLoading?: boolean
}

export function DeleteConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="animate-scale-in bg-white/95 backdrop-blur-xl border-2 border-[#AD8A64]/30 rounded-2xl shadow-2xl p-0 overflow-hidden">
        {/* Header with Warning Icon */}
        <div className="bg-gradient-to-r from-[#A44A3F]/10 to-[#A44A3F]/5 p-6 border-b border-[#AD8A64]/20">
          <AlertDialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#A44A3F] rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <AlertDialogTitle className="text-xl font-bold text-[#0D1821]">
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[#4E6E5D] font-medium">
                  {description}
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gradient-to-b from-white to-[#EFF1F3]/50">
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel
              disabled={isLoading}
              className="h-11 px-6 border-2 border-[#AD8A64] text-[#AD8A64] hover:bg-[#AD8A64] hover:text-white transition-all duration-300 rounded-xl font-semibold bg-transparent cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              disabled={isLoading}
              className="h-11 px-6 bg-[#A44A3F] hover:bg-[#A44A3F]/90 text-white border-0 transition-all duration-300 rounded-xl font-semibold hover:scale-105 hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </div>
        </div>

        {/* Warning Footer */}
        <div className="bg-[#A44A3F]/5 border-t border-[#AD8A64]/20 px-6 py-3">
          <p className="text-xs text-[#4E6E5D] font-medium text-center">
            ⚠️ This action cannot be undone
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}