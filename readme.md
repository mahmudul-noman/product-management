```markdown
# Product Management

A modern, responsive product management application, featuring a beautiful UI with custom color palette and comprehensive CRUD operations.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components

### State Management
- **Redux Toolkit** - Predictable state container
- **React Redux** - Official React bindings for Redux

### Styling & UI
- **Custom Color Palette**:
  - `#A44A3F` (Rich Terracotta) - Primary actions
  - `#AD8A64` (Warm Sand) - Support elements
  - `#4E6E5D` (Muted Sage) - Secondary actions
  - `#EFF1F3` (Crisp White) - Background
  - `#0D1821` (Almost Black) - Text

## 📁 Project Structure

``
product-management/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── products/
│   │   ├── [slug]/
│   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── create/
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   └── providers.tsx
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ... (other shadcn components)
│   ├── category-filter.tsx
│   ├── delete-confirm-dialog.tsx
│   ├── navbar.tsx
│   ├── pagination.tsx
│   ├── product-card.tsx
│   ├── product-form.tsx
│   └── search-bar.tsx
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── productsSlice.ts
│   ├── store.ts
│   ├── hooks.ts
│   ├── api.ts
│   └── utils.ts
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles/
│   └── globals.css
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
``

## 🎯 Key Features

### Product Management
- ✅ **Create Products** - Add new products with images, descriptions, and pricing
- ✅ **Read Products** - View product listings with search and filtering
- ✅ **Update Products** - Edit existing product information
- ✅ **Delete Products** - Remove products with confirmation dialogs

### User Experience
- 🎨 **Custom Design System** - Consistent color palette and styling
- 📱 **Responsive Design** - Optimized for all device sizes
- ⚡ **Fast Performance** - Optimized loading and smooth animations
- 🔍 **Advanced Search** - Real-time product search functionality
- 🏷️ **Category Filtering** - Filter products by categories
- 🖼️ **Image Gallery** - Product images with magnifier functionality
- 📄 **Pagination** - Efficient data loading and navigation

### Technical Features
- 🔐 **Authentication** - Protected routes and API calls
- 📊 **State Management** - Centralized state with Redux
- 🛡️ **Type Safety** - Full TypeScript implementation
- ♿ **Accessibility** - WCAG compliant components
- 🎭 **Animations** - Smooth transitions and hover effects

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahmudul-noman/product-management.git
   cd product-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🌐 Live URL

**Live Application**: [https://your-product-management-app.vercel.app](https://your-product-management-app.vercel.app)

## 📱 Pages & Features

### Homepage (`/`)
- Product listing with search and filters
- Responsive grid layout
- Pagination support

### Product Details (`/products/[slug]`)
- Detailed product information
- Image gallery with magnifier
- Category and pricing details
- Edit and delete actions

### Create Product (`/products/create`)
- Product creation form
- Image URL management
- Form validation
- Category selection

### Edit Product (`/products/[slug]/edit`)
- Product editing form
- Pre-filled existing data
- Image management
- Real-time validation

### Login (`/login`)
- Authentication page
- Protected route access

## 🎨 Design System

### Color Palette
- **Primary**: `#A44A3F` - Used for buttons, accents, and important actions
- **Secondary**: `#4E6E5D` - Used for secondary buttons and highlights
- **Neutral**: `#AD8A64` - Used for borders, backgrounds, and support elements
- **Background**: `#EFF1F3` - Main background color
- **Text**: `#0D1821` - Primary text color

### Components
- **Product Cards** - Consistent height, hover effects, category badges
- **Forms** - Glass morphism effects, validation states, smooth transitions
- **Navigation** - Sticky header with user info and logout
- **Modals** - Backdrop blur, smooth animations, accessible design

## 🔧 Custom Hooks

- `useAppDispatch` - Typed Redux dispatch
- `useAppSelector` - Typed Redux selector
- `useMobile` - Responsive breakpoint detection
- `useToast` - Notification system

## 📊 State Management

### Redux Slices
- **authSlice** - Authentication state and actions
- **productsSlice** - Products management with CRUD operations

### Features
- Async thunks for API calls
- Loading states management
- Error handling
- Optimistic updates

## 🛠️ Development

### Code Style
- ESLint configuration for code quality
- TypeScript strict mode
- Consistent component structure
- Responsive design principles

### Component Patterns
- Reusable UI components with shadcn/ui
- Compound components for complex UIs
- Prop drilling minimization with Redux
- Custom hooks for business logic

## 👨‍💻 Author

**Your Name**  
- GitHub: [@mahmudul-noman](https://github.com/mahmudul-noman/)
- Email: mhnoman75@gmail.com
- Portfolio: [www.mhnoman.com](www.mhnoman.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
