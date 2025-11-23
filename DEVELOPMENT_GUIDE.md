# Hướng Dẫn Phát Triển - Digi Transport Frontend

## 📋 Mục Lục

1. [🤖 AI Development Guidelines](#-ai-development-guidelines)
2. [🚗 Giới Thiệu Dự Án](#-giới-thiệu-dự-án)
3. [🏗️ Cấu Trúc Dự Án](#️-cấu-trúc-dự-án)
4. [🚀 Thiết Lập Môi Trường](#-thiết-lập-môi-trường)
5. [📁 Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
6. [🔌 API Endpoints](#-api-endpoints)
7. [🗄️ Redux State Management](#️-redux-state-management)
8. [🎨 Styling & Design Tokens](#-styling--design-tokens)
9. [🔮 Glassmorphism Effect](#-glassmorphism-effect)
10. [🎭 Liquid Glass Pill Animation](#-liquid-glass-pill-animation)
11. [🧩 Component Architecture](#-component-architecture)
12. [📝 Form Styling Standards](#-form-styling-standards)
13. [🌐 i18n & AnimatedText](#-i18n--animatedtext)
14. [📝 TypeScript Types](#-typescript-types)
15. [🛣️ Routing](#️-routing)

---

## 🤖 AI Development Guidelines

**SYSTEM ROLE**: Senior Frontend React Developer specialising in UI/UX, Animation, and Performance.

**MANDATE**: Follow these rules strictly. Do not hallucinate styles or libraries outside this stack.

### 1. 🛠️ Technology Stack (Immutable)

- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + CSS Variables (Theme)
- **Icons**: `lucide-react` ONLY
- **Animation**: `framer-motion` ONLY (Spring animations preferred)
- **State**: Redux Toolkit (RTK Query)
- **Routing**: `react-router-dom`
- **I18n**: `react-i18next`
- **UI Primitives**: Headless UI / Radix UI wrapped in `src/components/ui`

### 2. 🎨 Design Tokens & Theming

#### 🌈 Color Palette (MUST use CSS Variables)

Never use raw hex codes or default Tailwind colors for main elements.

- **Primary/Actions**: `bg-[var(--color-dark-blue)]` (Text: `text-white`)
- **Secondary/Accents**: `bg-[var(--color-light-blue)]`
- **Background**: `bg-[var(--color-cream)]` (or `bg-white/xx` for glass)
- **Text**: `text-[var(--color-dark-blue)]` (Primary), `text-gray-600` (Secondary)

#### 🔮 Glassmorphism (Signature Style)

Apply this pattern for Cards, Modals, and Floating Elements:

```typescript
// Standard Glass Class
className={cn(
  "bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg",
  "hover:shadow-xl transition-all duration-300" // If interactive
)}
```

### 3. 🧩 Component Architecture Rules

#### Rule 3.1: Text & Translation (CRITICAL)

- **NEVER** hardcode text. Use `t('key')`
- **ALWAYS** wrap dynamic text in `<AnimatedText>` for language switch effects

```typescript
// ✅ CORRECT
<h3><AnimatedText>{t('hero.title')}</AnimatedText></h3>

// ❌ WRONG
<h3>{t('hero.title')}</h3>
```

#### Rule 3.2: Layout Animation

- Use `<SmoothWrapper>` for containers that change size dynamically
- Use `layout` prop for elements that shift position

```typescript
<SmoothWrapper className="inline-block">
  <AnimatedText>{content}</AnimatedText>
</SmoothWrapper>
```

#### Rule 3.3: UI Components

- Always import from `@/components/ui/...`
- Do not create new buttons/inputs from scratch. Use the provided primitives

### 4. 📝 Form & Input Standards

**MANDATORY**: All form inputs (Input, Select, Textarea) MUST use the shared styling constant to maintain consistency.

```typescript
// 1. Define Base Classes
const INPUT_BASE_CLASSES = cn(
  "rounded-xl transition-all duration-200",
  "bg-white/50 border-[var(--color-light-blue)]/30",
  "hover:bg-white/80 hover:border-[var(--color-light-blue)]/50",
  "focus-visible:ring-0 focus-visible:ring-offset-0",
  "focus:border-[var(--color-dark-blue)] focus:bg-white"
);

// 2. Usage
<Input className={cn(INPUT_BASE_CLASSES, "h-12")} {...props} />
```

### 5. 🚀 Coding Patterns (Do's & Don'ts)

#### ✅ DO:

- Use `cn()` for class merging
- Use `useCallback` and `useMemo` for expensive renders/functions
- Use framer-motion's `AnimatePresence` with `mode="popLayout"` for smooth exit animations
- Place images in `public/assets` or use Unsplash URLs for prototypes

#### ❌ DON'T:

- Do not use `useEffect` for derived state (use `useMemo`)
- Do not use default HTML `<button>` or `<input>`
- Do not use z-index arbitrarily (follow a scale)
- Do not use inline styles (use Tailwind arbitrary values `[]` if necessary)

### 6. 📂 File Structure

- **Pages**: `src/pages/Landing[SectionName].tsx`
- **Components**: `src/components/[kebab-case].tsx`
- **UI Lib**: `src/components/ui/[kebab-case].tsx`
- **Hooks**: `src/hooks/use-[hook-name].ts`

### 7. 🌟 Specialized Visual Effects

#### "Titanium" Border (for Mockups)

```typescript
"border-[6px] border-[#3a3a3a] ring-1 ring-white/20 bg-black rounded-[3rem]"
```

#### Liquid Tab Pill (Framer Motion)

Always use `layoutId` for floating active states in Navbars/Tabs.

```typescript
<motion.div
  layoutId="activePill"
  className="absolute inset-0 bg-[var(--color-light-blue)]/20 rounded-full"
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

---

## 🚗 Giới Thiệu Dự Án

**Digi Transport** là nền tảng đặt xe liên tỉnh thông minh với tính năng **ghép chuyến tự động**, giúp kết nối hành khách với các nhà xe/tài xế một cách hiệu quả và tiết kiệm chi phí.

### Đối Tượng Tham Gia

1. **Khách hàng (Hành khách)**: Đặt vé ghép hoặc nguyên chuyến
2. **Tài xế / Nhà xe**: Quản lý tuyến, chuyến và doanh thu
3. **Quản trị hệ thống (Admin)**: Quản lý toàn bộ hệ thống

---

## 🏗️ Cấu Trúc Dự Án

- **React 19** với TypeScript
- **Vite** làm build tool
- **Redux Toolkit** (RTK Query) cho state management
- **React Router DOM** cho routing
- **Tailwind CSS** cho styling
- **Radix UI** cho UI components
- **Lucide React** cho icons
- **Framer Motion** cho animations

---

## 🚀 Thiết Lập Môi Trường

### ⚠️ QUAN TRỌNG: Kiểm tra lỗi trước khi chạy

**LUÔN LUÔN chạy build để kiểm tra lỗi trước khi chạy development server:**

```bash
npm install
npm run build  # Kiểm tra lỗi TypeScript và build
npm run dev    # Chạy development server (chỉ sau khi build thành công)
```

### Build production

```bash
npm run build
npm run preview  # Preview production build
```

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Shared/reusable components
│   ├── ui/             # UI primitives (Button, Card, etc.)
│   └── layout/         # Layout components (header, footer)
├── features/           # Feature-based modules
│   ├── auth/           # Authentication feature
│   ├── Common/         # Common utilities, types, services
│   └── landing-page/   # Landing page feature
├── hooks/              # Custom React hooks
├── lib/                # Library utilities
│   └── utils.ts       # Utility functions (cn, etc.)
├── locales/            # i18n translations
├── pages/              # Page components
├── redux/              # Redux store và API
│   ├── api/           # API endpoints (RTK Query)
│   ├── slices/        # Redux slices
│   ├── baseApi.ts     # Base API configuration
│   └── store.ts       # Redux store configuration
├── router.tsx         # Route definitions
├── provider.tsx       # App providers (Redux, Router)
├── config.ts          # App configuration
├── global.css         # Global styles và CSS variables
└── main.tsx           # Entry point
```

---

## 🔌 API Endpoints

### Tạo API file trong `src/redux/api/`

```typescript
import { baseApi } from '../baseApi';
import type { ApiResponse } from '@/features/Common/common.type';

interface SearchTripsRequest {
  departure: string;
  destination: string;
  date: string;
  passengers?: number;
}

export const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchTrips: builder.query<ApiResponse<Trip[]>, SearchTripsRequest>({
      query: (params) => ({
        url: 'trips/search',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useSearchTripsQuery } = tripApi;
```

### Sử dụng trong Component

```typescript
import { useSearchTripsQuery } from '@/redux/api/tripApi';
import { isApiResponseSuccess, getApiErrorMessage } from '@/features/Common/common.type';

function Component() {
  const { data, isLoading, error } = useSearchTripsQuery({ departure: 'HN', destination: 'HCM', date: '2024-01-01' });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{getApiErrorMessage(error)}</div>;
  if (data && isApiResponseSuccess(data)) {
    return <div>{/* Render trips */}</div>;
  }
}
```

---

## 🗄️ Redux State Management

### Redux Store Structure

```typescript
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Tạo Redux Slice (cho UI state)

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: false, theme: 'light' },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
```

---

## 🎨 Styling & Design Tokens

### CSS Variables trong `global.css`

```css
:root {
  --color-cream: #EFECE3;
  --color-light-blue: #8FABD4;
  --color-dark-blue: #4A70A9;
  --color-black: #000000;
}
```

### Sử dụng CSS Variables trong Tailwind

```typescript
<div className="bg-[var(--color-cream)]">
<span className="text-[var(--color-dark-blue)]">
<div className="border-[var(--color-light-blue)]">
```

### Color Palette

- **Cream**: `#EFECE3` - Background chính
- **Light Blue**: `#8FABD4` - Secondary color, links
- **Dark Blue**: `#4A70A9` - Primary color, buttons
- **Black**: `#000000` - Text, footer background

---

## 🔮 Glassmorphism Effect

### Standard Glass Class

```typescript
className={cn(
  "bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg",
  "hover:shadow-xl transition-all duration-300"
)}
```

### Variants

- **Light**: `bg-white/10 backdrop-blur-sm border-white/10`
- **Medium**: `bg-[var(--color-dark-blue)]/20 backdrop-blur-md border-white/20`
- **Heavy**: `bg-[var(--color-dark-blue)]/40 backdrop-blur-lg border-white/30`

### Best Practices

1. ✅ Sử dụng với backdrop có màu sắc
2. ✅ Không lạm dụng - chỉ cho elements quan trọng
3. ✅ Đảm bảo contrast cho text
4. ✅ Sử dụng CSS Variables
5. ✅ Thêm `z-10` cho content bên trong

---

## 🎭 Liquid Glass Pill với Spring Animation

### Cấu Trúc Code Chuẩn

```typescript
<TabsList className="relative ...">
  {/* Liquid Glass Pill */}
  {activeTab === "tab1" && (
    <motion.div
      layoutId="activeTabGlass"  // CÙNG layoutId cho tất cả pills!
      className="absolute left-[...] top-[...] bottom-[...] right-[...] rounded-full bg-white shadow-lg -z-0"
      transition={{
        type: "spring",
        stiffness: 300,  // Cân bằng tốt
        damping: 30,     // Cân bằng tốt
      }}
    />
  )}
  
  {/* Tab triggers với z-index cao hơn */}
  <TabsTrigger className="relative z-10 ...">Tab 1</TabsTrigger>
</TabsList>
```

### Key Points

1. ✅ **Cùng `layoutId`** cho tất cả pills ở các vị trí khác nhau
2. ✅ **Container phải `relative`**
3. ✅ **Z-index layering**: Pill ở `-z-0`, content ở `z-10`
4. ✅ **Spring parameters**: `stiffness: 300, damping: 30` (khuyến nghị)
5. ✅ **Conditional rendering**: Chỉ render pill khi active

---

## 🧩 Component Architecture

### Component Structure

```typescript
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/animated-text';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

### Sử dụng `cn()` function

```typescript
import { cn } from '@/lib/utils';

// Merge multiple classes
<div className={cn("px-4", "px-8")}> // → "px-8" (override)

// Conditional classes
<div className={cn("text-red-500", isActive && "text-blue-500")}>

// Combine với CSS variables
<div className={cn("bg-[var(--color-cream)]", className)}>
```

### UI Components

Luôn import từ `@/components/ui/`:

- `Button` - Variants: default, destructive, outline, secondary, ghost, link
- `Card` - Sub-components: CardHeader, CardTitle, CardContent, CardFooter
- `Badge` - Variants: default, secondary, destructive, outline
- `Input`, `Select`, `Textarea` - Form inputs
- `Tabs` - Tab navigation
- `Avatar` - User avatars
- `Switch` - Toggle switches

---

## 📝 Form Styling Standards

### INPUT_BASE_CLASSES Constant

```typescript
import { cn } from '@/lib/utils';

const INPUT_BASE_CLASSES = cn(
  "rounded-xl transition-all duration-200",
  "bg-white/50 border-[var(--color-light-blue)]/30",
  "hover:bg-white/80 hover:border-[var(--color-light-blue)]/50",
  "focus-visible:ring-0 focus-visible:ring-offset-0",
  "focus:border-[var(--color-dark-blue)] focus:bg-white"
);
```

### Usage

```typescript
<Input
  className={cn(INPUT_BASE_CLASSES, "h-12", errors.name && "border-red-500 bg-red-50/50")}
  {...register("name")}
/>

<SelectTrigger className={cn(INPUT_BASE_CLASSES, "h-12")}>
  <SelectValue placeholder="Select..." />
</SelectTrigger>

<Textarea
  className={cn(INPUT_BASE_CLASSES, "resize-none")}
  rows={4}
/>
```

### Lưu Ý Quan Trọng

1. ✅ **LUÔN sử dụng `INPUT_BASE_CLASSES`** cho tất cả form inputs
2. ✅ **KHÔNG thêm `ring` hoặc `ring-offset`** khi focus
3. ✅ **Height chuẩn**: `h-12` cho Input và Select
4. ✅ **Placeholder color**: `placeholder:text-gray-400`
5. ✅ **Text color**: `text-[var(--color-dark-blue)]`

---

## 🌐 i18n & AnimatedText

### Sử Dụng trong Component

```typescript
import { useTranslation } from 'react-i18next';
import { AnimatedText } from '@/components/animated-text';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* ✅ ĐÚNG: Wrap translation với AnimatedText */}
      <h1>
        <AnimatedText>{t('hero.title')}</AnimatedText>
      </h1>
      
      {/* ❌ SAI: Không wrap AnimatedText */}
      <h1>{t('hero.title')}</h1>
    </div>
  );
}
```

### Thêm Translation Mới

1. **Thêm vào file JSON** (`src/locales/vi.json` và `src/locales/en.json`):

```json
{
  "mySection": {
    "title": "Tiêu đề",
    "description": "Mô tả"
  }
}
```

2. **Sử dụng trong component**:

```typescript
<AnimatedText>{t('mySection.title')}</AnimatedText>
```

### Translation với Variables

```typescript
// Trong JSON
{ "footer": { "copyright": "© {{year}} Digi Transport. All rights reserved." } }

// Trong component
{t('footer.copyright', { year: new Date().getFullYear() })}
```

### Best Practices

1. ✅ **Luôn wrap translations với AnimatedText**
2. ✅ **Sử dụng cho tất cả user-visible text**
3. ✅ **Tổ chức translations theo sections**
4. ✅ **Sử dụng nested keys**: `pricing.passenger.name`

---

## 📝 TypeScript Types

### Common Types

File: `src/features/Common/common.type.ts`

```typescript
export interface ApiResponse<T = unknown> {
  Type: string;
  Title: string;
  Status: number;
  Detail: string;
  Errors: Record<string, string[]>;
  Data: T | null;
}

export function isApiResponseSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { Data: T } {
  return response.Type === 'SUCCESS' && response.Status >= 200 && response.Status < 300;
}

export function getApiErrorMessage<T>(response: ApiResponse<T>): string {
  if (response.Detail) return response.Detail;
  if (Object.keys(response.Errors).length > 0) {
    const firstError = Object.values(response.Errors)[0];
    return firstError?.[0] || 'An error occurred';
  }
  return response.Title || 'Unknown error';
}
```

### Path Aliases

Sử dụng `@/` để import từ `src/`:

```typescript
import { cn } from '@/lib/utils';
import { baseApi } from '@/redux/baseApi';
import type { ApiResponse } from '@/features/Common/common.type';
```

---

## 🛣️ Routing

### Thêm Route mới

Trong `src/router.tsx`:

```typescript
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
```

### Navigation trong Component

```typescript
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/dashboard');
  };
  
  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

---

## 🔧 Best Practices

1. ✅ **Component Organization**: Tổ chức theo feature, không theo type
2. ✅ **Type Safety**: Luôn định nghĩa types cho props và API responses
3. ✅ **CSS Variables**: Sử dụng CSS variables thay vì hardcode colors
4. ✅ **cn() Function**: Luôn dùng `cn()` để merge Tailwind classes
5. ✅ **API Error Handling**: Luôn sử dụng helper functions
6. ✅ **Path Aliases**: Sử dụng `@/` thay vì relative paths
7. ✅ **Code Splitting**: Tách code theo feature để optimize bundle size
8. ✅ **User Experience**: 
   - Hiển thị loading states khi fetch data
   - Validate form inputs trước khi submit
   - Hiển thị error messages rõ ràng

---

## 🐛 Troubleshooting

### Build thất bại

**Luôn chạy `npm run build` trước khi `npm run dev` để phát hiện lỗi sớm.**

Các lỗi thường gặp:
- **TypeScript errors**: Sửa tất cả lỗi TypeScript được hiển thị
- **JSX syntax errors**: Kiểm tra các tag đóng/mở đúng chưa
- **Import errors**: Kiểm tra path alias `@/` có đúng không

---

## 📚 Thư Viện Đã Cài Đặt

- **UI**: @radix-ui/*, lucide-react
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **State**: @reduxjs/toolkit, react-redux
- **Routing**: react-router-dom
- **Animation**: framer-motion
- **i18n**: react-i18next
