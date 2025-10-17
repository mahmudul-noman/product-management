// "use client"

// import { useRouter } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { logout } from "@/lib/slices/authSlice"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export function Navbar() {
//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   const email = useAppSelector((state) => state.auth.email)

//   const handleLogout = () => {
//     dispatch(logout())
//     router.push("/login")
//   }

//   return (
//     <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20">
//           <Link href="/products" className="flex items-center gap-3 group">
//             <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
//               <span className="text-white font-bold text-lg">PM</span>
//             </div>
//             <span className="font-bold text-lg hidden sm:inline text-foreground group-hover:text-primary transition-colors">
//               Product Manager
//             </span>
//           </Link>

//           <div className="flex items-center gap-4">
//             <div className="hidden sm:flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
//                 <span className="text-xs font-bold text-primary">{email?.charAt(0).toUpperCase()}</span>
//               </div>
//               <span className="text-sm text-muted-foreground truncate max-w-xs">{email}</span>
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleLogout}
//               className="h-9 transition-all hover:shadow-md bg-transparent"
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }


"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/slices/authSlice"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, User, Package } from "lucide-react"

export function Navbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const email = useAppSelector((state) => state.auth.email)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <nav className="border-b border-[#AD8A64]/30 bg-white/80 backdrop-blur-xl sticky top-0 z-50 
      shadow-lg hover:shadow-xl transition-all duration-500">

      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#A44A3F]/5 via-[#4E6E5D]/5 to-[#AD8A64]/5 
        opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo Section */}
          <Link href="/products" className="flex items-center gap-3 group relative">
            {/* Logo Container with Enhanced Design */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A44A3F] to-[#AD8A64] rounded-2xl 
                flex items-center justify-center shadow-lg group-hover:shadow-2xl 
                transition-all duration-500 group-hover:scale-105 
                border border-[#A44A3F]/20">
                <Package className="w-6 h-6 text-white" />
              </div>

              {/* Logo Accent */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4E6E5D] rounded-full 
                border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#0D1821] group-hover:text-[#A44A3F] 
                transition-colors duration-300 tracking-tight">
                Product Manager
              </span>
              <span className="text-xs text-[#4E6E5D] font-medium opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 transform -translate-y-1 group-hover:translate-y-0">
                Manage with style
              </span>
            </div>

            {/* Hover Underline Effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#A44A3F] to-[#4E6E5D] 
              group-hover:w-full transition-all duration-500" />
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">

            {/* User Profile Section */}
            <div className="hidden sm:flex items-center gap-3 group relative p-2 rounded-xl 
              hover:bg-[#EFF1F3] transition-all duration-300">

              {/* User Avatar with Enhanced Design */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4E6E5D] to-[#AD8A64] 
                  flex items-center justify-center shadow-md group-hover:shadow-lg 
                  transition-all duration-300 group-hover:scale-105 
                  border border-[#4E6E5D]/20">
                  <User className="w-5 h-5 text-white" />
                </div>

                {/* Online Indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4E6E5D] rounded-full 
                  border-2 border-white shadow-md" />
              </div>

              {/* User Email */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#0D1821] leading-tight">
                  {email?.split('@')[0]}
                </span>
                <span className="text-xs text-[#4E6E5D] font-medium truncate max-w-[120px]">
                  {email}
                </span>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                group-hover:border-[#AD8A64]/20 transition-all duration-300" />
            </div>

            {/* Logout Button with Enhanced Design */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-11 px-4 transition-all duration-300 
                border-2 border-[#A44A3F] text-[#A44A3F] 
                hover:bg-[#A44A3F] hover:text-white
                rounded-xl hover:shadow-lg hover:scale-105 
                bg-transparent font-semibold
                flex items-center gap-2 group cursor-pointer"
            >
              <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#AD8A64]/30 to-transparent" />
      </div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#A44A3F]/20 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#4E6E5D]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#AD8A64]/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </nav>
  )
}