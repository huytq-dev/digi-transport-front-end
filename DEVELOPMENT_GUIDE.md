# Hướng Dẫn Phát Triển - Digi Transport Frontend

## 📋 Mục Lục

1. [Giới Thiệu Dự Án](#giới-thiệu-dự-án)
2. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
3. [Thiết Lập Môi Trường](#thiết-lập-môi-trường)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Thêm API Endpoints](#thêm-api-endpoints)
6. [Quản Lý State với Redux](#quản-lý-state-với-redux)
7. [Tạo Component](#tạo-component)
8. [Styling và CSS Variables](#styling-và-css-variables)
9. [Routing](#routing)
10. [TypeScript Types](#typescript-types)
11. [Utilities](#utilities)

---

## 🚗 Giới Thiệu Dự Án

**Digi Transport** (Transport DigiSoft) là nền tảng đặt xe liên tỉnh thông minh với tính năng **ghép chuyến tự động**, giúp kết nối hành khách với các nhà xe/tài xế một cách hiệu quả và tiết kiệm chi phí.

### Đối Tượng Tham Gia Hệ Thống

1. **Khách hàng (Hành khách)**
   - Người có nhu cầu đặt xe đi liên tỉnh
   - Có thể đi ghép chuyến (chia sẻ ghế ngồi) hoặc đặt nguyên chuyến

2. **Tài xế / Nhà xe**
   - Đăng ký tuyến xe, lịch chạy, số ghế còn trống
   - Nhận đơn đặt xe, xác nhận và liên hệ hành khách
   - Quản lý chuyến và theo dõi doanh thu

3. **Quản trị hệ thống (Admin)**
   - Quản lý nhà xe, tuyến đường, giá vé, khuyến mãi
   - Theo dõi doanh thu, tình trạng hoạt động
   - Xử lý khiếu nại và hỗ trợ khách hàng

### Tính Năng Chính

#### Với Khách Hàng:
- ✅ Đăng ký / đăng nhập
- ✅ Đặt vé ghép hoặc nguyên chuyến
- ✅ Thanh toán online (VNPay, Momo, ZaloPay)
- ✅ Xem lịch sử đặt vé
- ✅ Theo dõi chuyến đi theo thời gian thực (GPS)
- ✅ Đánh giá tài xế và nhà xe

#### Với Tài Xế / Nhà Xe:
- ✅ Đăng ký tuyến, khai báo xe, số ghế
- ✅ Quản lý chuyến, xác nhận đơn
- ✅ Theo dõi doanh thu và báo cáo
- ✅ Cập nhật trạng thái chuyến (Đang đón khách → Đang di chuyển → Hoàn thành)

#### Với Admin:
- ✅ Quản lý người dùng (khách hàng, tài xế, nhà xe)
- ✅ Quản lý tuyến, giá, khuyến mãi
- ✅ Theo dõi báo cáo doanh thu, hiệu suất chuyến
- ✅ Xử lý khiếu nại, hỗ trợ khách hàng

### Điểm Đặc Thù Của Dự Án

1. **Ghép chuyến thông minh**: Tự động tìm hành khách có cùng tuyến để ghép xe, giảm chi phí
2. **Đặt vé linh hoạt**: Chọn ghế hoặc thuê nguyên xe
3. **Liên tỉnh**: Tích hợp nhiều tuyến đường, có thể chạy xuyên tỉnh, xuyên vùng
4. **Thanh toán & hóa đơn điện tử**: Tích hợp thanh toán online, xuất hóa đơn tự động
5. **Bản đồ & định vị GPS**: Tích hợp Google Maps / OpenStreetMap để định tuyến và theo dõi xe theo thời gian thực

### Quy Trình Nghiệp Vụ Chính

#### (A) Đặt xe ghép:
1. Khách hàng nhập điểm đi – điểm đến – ngày giờ dự kiến
2. Hệ thống gợi ý tuyến đường có sẵn, số ghế còn trống, giá vé
3. Khách hàng chọn ghép với chuyến có sẵn hoặc tạo "yêu cầu chuyến" mới
4. Thanh toán trực tuyến hoặc đặt cọc
5. Nhà xe / tài xế xác nhận
6. Hệ thống gửi thông tin vé điện tử + liên hệ tài xế

#### (B) Đặt nguyên chuyến:
1. Khách hàng chọn tuyến đi – đến và loại xe (4 chỗ, 7 chỗ, 16 chỗ,...)
2. Hệ thống hiển thị giá chuyến trọn gói
3. Thanh toán và xác nhận

#### (C) Quản lý chuyến đi:
- Hệ thống phân bổ ghế cho khách hàng
- Tài xế cập nhật trạng thái chuyến theo thời gian thực
- Khách hàng theo dõi vị trí xe qua GPS

#### (D) Quản lý giá vé & doanh thu:
- Vé ghép tính theo khoảng cách / ghế ngồi
- Vé nguyên chuyến tính theo trọn gói xe
- Hệ thống tự động chia doanh thu giữa nhà xe/tài xế và platform

---

## 🏗️ Cấu Trúc Dự Án

Dự án sử dụng:
- **React 19** với TypeScript
- **Vite** làm build tool
- **Redux Toolkit** (RTK Query) cho state management
- **React Router DOM** cho routing
- **Tailwind CSS** cho styling
- **Radix UI** cho UI components
- **Lucide React** cho icons

---

## 🚀 Thiết Lập Môi Trường

### Cài đặt dependencies

```bash
npm install
```

### ⚠️ QUAN TRỌNG: Kiểm tra lỗi trước khi chạy

**LUÔN LUÔN chạy build để kiểm tra lỗi trước khi chạy development server:**

```bash
npm run build
```

Nếu build thành công (exit code 0), bạn có thể tiếp tục chạy development server. Nếu có lỗi, phải sửa hết lỗi trước khi chạy.

### Chạy development server

**Sau khi build thành công**, bạn có thể chạy:

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Workflow đề xuất

1. **Sau khi thay đổi code:**
   ```bash
   npm run build  # Kiểm tra lỗi TypeScript và build
   ```

2. **Nếu build thành công:**
   ```bash
   npm run dev    # Chạy development server
   ```

3. **Nếu build thất bại:**
   - Đọc lỗi trong terminal
   - Sửa tất cả lỗi TypeScript/ESLint
   - Chạy lại `npm run build` cho đến khi thành công
   - Sau đó mới chạy `npm run dev`

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Shared/reusable components
│   ├── layout/         # Layout components (header, footer)
│   └── theme/          # Theme-related components
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

## 🔌 Thêm API Endpoints

### Bước 1: Tạo API file trong `src/redux/api/`

Ví dụ: `src/redux/api/tripApi.ts` (API cho chuyến xe)

```typescript
import { baseApi } from '../baseApi';
import type { ApiResponse } from '@/features/Common/common.type';

// Define request/response types
interface SearchTripsRequest {
  departure: string;
  destination: string;
  date: string;
  passengers?: number;
}

interface Trip {
  id: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  company: {
    id: string;
    name: string;
    rating: number;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
    licenseNumber: string;
  };
  vehicle: {
    id: string;
    type: string;
    plateNumber: string;
    capacity: number;
  };
}

interface BookTripRequest {
  tripId: string;
  passengers: number;
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
}

// Inject endpoints vào baseApi
export const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchTrips: builder.query<ApiResponse<Trip[]>, SearchTripsRequest>({
      query: (params) => ({
        url: 'trips/search',
        method: 'GET',
        params,
      }),
    }),
    getTripDetails: builder.query<ApiResponse<Trip>, string>({
      query: (tripId) => `trips/${tripId}`,
    }),
    bookTrip: builder.mutation<ApiResponse<{ bookingId: string }>, BookTripRequest>({
      query: (data) => ({
        url: 'trips/book',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks để sử dụng trong components
export const {
  useSearchTripsQuery,
  useGetTripDetailsQuery,
  useBookTripMutation,
} = tripApi;
```

### Ví dụ: `src/redux/api/authApi.ts` (API cho authentication)

```typescript
import { baseApi } from '../baseApi';
import type { ApiResponse } from '@/features/Common/common.type';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<ApiResponse<LoginResponse['user']>, void>({
      query: () => 'auth/me',
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
```

### Bước 2: Sử dụng trong Component

```typescript
import { useLoginMutation } from '@/redux/api/authApi';
import { isApiResponseSuccess, getApiErrorMessage } from '@/features/Common/common.type';

function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email: 'user@example.com', password: 'password' }).unwrap();
      
      if (isApiResponseSuccess(result)) {
        // Lưu token
        localStorage.setItem('token', result.Data.token);
        // Navigate to dashboard
      }
    } catch (err) {
      console.error(getApiErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Bước 3: Thêm Tag Types (nếu cần cache invalidation)

Trong `src/redux/baseApi.ts`:

```typescript
tagTypes: ['Auth', 'User', 'Product'], // Thêm tag types
```

Sau đó trong endpoint:

```typescript
invalidatesTags: ['Auth'], // Invalidate cache khi logout
providesTags: ['User'], // Provide tag cho cache
```

---

## 🗄️ Quản Lý State với Redux

### Redux Store Structure

```typescript
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
// import otherSlice from './slices/otherSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // otherSlice: otherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Tạo Redux Slice (cho UI state)

Ví dụ: `src/redux/slices/uiSlice.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  sidebarOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
```

Thêm vào store:

```typescript
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ui: uiSlice,
  },
  // ...
});
```

Sử dụng trong component:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/redux/slices/uiSlice';
import type { RootState } from '@/redux/store';

function Component() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <button onClick={() => dispatch(toggleSidebar())}>
      Toggle Sidebar
    </button>
  );
}
```

---

## 🎨 Tạo Component

### Component Structure

Tạo component trong `src/features/[feature-name]/components/` hoặc `src/components/`:

```typescript
import { cn } from '@/lib/utils';

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

`cn()` là utility function để merge Tailwind classes và xử lý conflicts:

```typescript
import { cn } from '@/lib/utils';

// Merge multiple classes
<div className={cn("px-4", "px-8")}> // → "px-8" (override)

// Conditional classes
<div className={cn("text-red-500", isActive && "text-blue-500")}>

// Combine với CSS variables
<div className={cn("bg-[var(--color-cream)]", className)}>
```

---

## 🧩 UI Components (Reusable Components)

### Tổng Quan

Dự án sử dụng các **UI Components** có thể tái sử dụng được đặt trong `src/components/ui/`. Các components này được xây dựng dựa trên **Radix UI** và **Tailwind CSS**, đảm bảo tính nhất quán và khả năng tái sử dụng cao.

### Danh Sách UI Components

#### 1. **Button** (`src/components/ui/button.tsx`)

Component button với nhiều variants và sizes.

**Variants:**
- `default`: Primary button (mặc định)
- `destructive`: Danger/Delete button
- `outline`: Border button với transparent background
- `secondary`: Muted background button
- `ghost`: No background button
- `link`: Text link style button

**Sizes:**
- `default`: `h-9 px-4 py-2`
- `sm`: `h-8 px-3`
- `lg`: `h-10 px-6`
- `icon`: `size-9` (square)

**Ví dụ sử dụng:**

```typescript
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// Với variant và size
<Button variant="destructive" size="lg">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost" size="icon">
  <Icon />
</Button>

// Với custom className
<Button className="bg-[var(--color-dark-blue)] text-white">
  Custom Button
</Button>

// Với asChild (render as Link)
<Button asChild variant="link">
  <Link to="/about">About</Link>
</Button>
```

#### 2. **Card** (`src/components/ui/card.tsx`)

Component card với các sub-components.

**Sub-components:**
- `Card`: Container chính
- `CardHeader`: Header section
- `CardTitle`: Title trong header
- `CardDescription`: Description trong header
- `CardContent`: Main content area
- `CardFooter`: Footer section
- `CardAction`: Action button area (trong header)

**Ví dụ sử dụng:**

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### 3. **Badge** (`src/components/ui/badge.tsx`)

Component badge để hiển thị labels, tags, hoặc status.

**Variants:**
- `default`: Primary badge (mặc định)
- `secondary`: Secondary badge
- `destructive`: Danger badge
- `outline`: Outline badge

**Ví dụ sử dụng:**

```typescript
import { Badge } from '@/components/ui/badge';

<Badge>New</Badge>
<Badge variant="secondary">Popular</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

#### 4. **Avatar** (`src/components/ui/avatar.tsx`)

Component avatar để hiển thị user profile picture hoặc initials.

**Sub-components:**
- `Avatar`: Container chính
- `AvatarImage`: Image của avatar
- `AvatarFallback`: Fallback khi không có image

**Ví dụ sử dụng:**

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Với image
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Chỉ fallback
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

#### 5. **Switch** (`src/components/ui/switch.tsx`)

Component switch/toggle button.

**Ví dụ sử dụng:**

```typescript
import { Switch } from '@/components/ui/switch';

function Component() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Switch checked={enabled} onCheckedChange={setEnabled} />
  );
}
```

#### 6. **Tabs** (`src/components/ui/tab.tsx`)

Component tabs để tổ chức content thành các tab.

**Sub-components:**
- `Tabs`: Container chính
- `TabsList`: Container cho các tab triggers
- `TabsTrigger`: Individual tab trigger
- `TabsContent`: Content cho mỗi tab

**Ví dụ sử dụng:**

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tab';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Best Practices khi sử dụng UI Components

1. **Luôn import từ `@/components/ui/`**:
   ```typescript
   import { Button } from '@/components/ui/button';
   ```

2. **Sử dụng variants và sizes có sẵn** thay vì custom className khi có thể:
   ```typescript
   // ✅ Good
   <Button variant="outline" size="lg">Click</Button>
   
   // ❌ Avoid (trừ khi thực sự cần custom)
   <Button className="border-2 border-blue-500 h-12">Click</Button>
   ```

3. **Kết hợp với CSS Variables** khi cần custom colors:
   ```typescript
   <Button className="bg-[var(--color-dark-blue)] text-white">
     Custom Color
   </Button>
   ```

4. **Sử dụng `cn()` để merge classes** khi cần override styles:
   ```typescript
   import { cn } from '@/lib/utils';
   
   <Button className={cn("w-full", className)}>
     Full Width
   </Button>
   ```

5. **Tái sử dụng components** thay vì tạo mới:
   - Nếu cần một component tương tự, hãy kiểm tra xem có thể extend UI component hiện có không
   - Chỉ tạo component mới khi thực sự cần thiết và không thể tái sử dụng

### Khi nào tạo UI Component mới?

Tạo UI component mới trong `src/components/ui/` khi:

1. ✅ Component có thể được sử dụng ở **nhiều nơi** trong ứng dụng
2. ✅ Component là **primitive/building block** (như Button, Card, Input)
3. ✅ Component có **logic phức tạp** cần được tách riêng
4. ✅ Component cần **type safety** và **props validation**

**KHÔNG** tạo UI component khi:

1. ❌ Component chỉ được dùng ở **một nơi duy nhất**
2. ❌ Component là **feature-specific** (nên đặt trong `src/features/[feature]/components/`)
3. ❌ Component chỉ là **wrapper đơn giản** không có logic

### Refactoring Landing Page Components

Tất cả landing page components đã được refactor để sử dụng UI components:

- ✅ **LandingHero**: Sử dụng `Button` component
- ✅ **LandingPricing**: Sử dụng `Card`, `Button`, `Badge` components
- ✅ **LandingHeader**: Sử dụng `Button` component
- ✅ **LandingTestimonials**: Sử dụng `Card`, `Avatar`, `Button` components
- ✅ **LandingFooter**: Sử dụng `Button` component

Điều này giúp:
- Code nhất quán và dễ maintain
- Giảm code duplication
- Dễ dàng update styles globally
- Type safety tốt hơn

---

## 🎨 Styling và CSS Variables

### CSS Variables trong `global.css`

```css
:root {
  /* Color Palette */
  --color-cream: #EFECE3;
  --color-light-blue: #8FABD4;
  --color-dark-blue: #4A70A9;
  --color-black: #000000;
  
  /* Semantic Aliases */
  --color-primary: var(--color-dark-blue);
  --color-secondary: var(--color-light-blue);
  --color-background: var(--color-cream);
  --color-text-dark: var(--color-black);
}
```

### Sử dụng CSS Variables trong Tailwind

```typescript
// Background color
<div className="bg-[var(--color-cream)]">

// Text color
<span className="text-[var(--color-dark-blue)]">

// Border color
<div className="border-[var(--color-light-blue)]">

// Hover states
<a className="text-[var(--color-light-blue)] hover:text-white">
```

### Color Palette

- **Cream**: `#EFECE3` - Background chính
- **Light Blue**: `#8FABD4` - Secondary color, links
- **Dark Blue**: `#4A70A9` - Primary color, buttons
- **Black**: `#000000` - Text, footer background

---

## 🛣️ Routing

### Thêm Route mới

Trong `src/router.tsx`:

```typescript
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Protected route example */}
      {/* <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> */}
    </Routes>
  );
};
```

### Navigation trong Component

```typescript
import { useNavigate, useLocation } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <button onClick={handleClick}>Go to Dashboard</button>
  );
}
```

---

## 💰 Mô Hình Pricing

### Cấu Trúc Pricing

Dự án sử dụng mô hình pricing linh hoạt phù hợp với từng đối tượng:

#### 1. **Hành Khách (Miễn phí)**
- ✅ Không có phí đăng ký
- ✅ Không có phí sử dụng dịch vụ
- ✅ Chỉ thanh toán giá vé khi đặt chuyến
- ✅ Tất cả tính năng cơ bản đều miễn phí

#### 2. **Tài Xế / Nhà Xe (Phí hoa hồng)**
- 💰 Phí hoa hồng: **5% trên mỗi đơn hàng thành công**
- ✅ Không có phí đăng ký
- ✅ Chỉ trả phí khi có đơn hàng thành công
- ✅ Tự động trừ phí từ doanh thu

#### 3. **Doanh Nghiệp (Phí hoa hồng ưu đãi)**
- 💰 Phí hoa hồng: **Từ 3%** (tùy theo khối lượng)
- ✅ Phí hoa hồng giảm dần theo số lượng chuyến
- ✅ Hỗ trợ tích hợp API
- ✅ Báo cáo và phân tích nâng cao
- ✅ Hỗ trợ chuyên nghiệp 24/7

### Lưu Ý Quan Trọng

- **Khách hàng**: Không cần trả bất kỳ phí nào ngoài giá vé
- **Tài xế/Nhà xe**: Chỉ trả phí khi có đơn hàng thành công, không có phí cố định
- **Doanh nghiệp**: Liên hệ để được tư vấn gói phù hợp với khối lượng và nhu cầu

---

## 🌐 Đa Ngôn Ngữ (i18n)

### Tổng Quan

Dự án hỗ trợ đa ngôn ngữ với **react-i18next**, cho phép chuyển đổi giữa **Tiếng Việt** và **Tiếng Anh**.

### Cấu Trúc

```
src/
├── i18n.ts                # Cấu hình i18n
├── locales/
│   ├── vi.json            # Translations tiếng Việt
│   └── en.json            # Translations tiếng Anh
└── components/
    └── language-toggle.tsx # Component chuyển đổi ngôn ngữ
```

### Sử Dụng trong Component

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('common.signIn')}</button>
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
{t('mySection.title')}
```

### Translation với Variables

```typescript
// Trong JSON
{
  "footer": {
    "copyright": "© {{year}} DigiCO Transport. All rights reserved."
  }
}

// Trong component
{t('footer.copyright', { year: new Date().getFullYear() })}
```

### Translation với Arrays

```typescript
// Trong JSON
{
  "pricing": {
    "passenger": {
      "features": [
        "Feature 1",
        "Feature 2"
      ]
    }
  }
}

// Trong component
{(t('pricing.passenger.features', { returnObjects: true }) as string[]).map((feature, index) => (
  <li key={index}>{feature}</li>
))}
```

### LanguageToggle Component

Component `LanguageToggle` đã được tích hợp vào header, cho phép người dùng chuyển đổi ngôn ngữ:

```typescript
import { LanguageToggle } from '@/components/language-toggle';

<LanguageToggle />
```

### Lưu Ngôn Ngữ

Ngôn ngữ được lưu trong `localStorage` và tự động phát hiện từ trình duyệt nếu chưa có preference.

### Best Practices

1. ✅ **Luôn sử dụng translation keys** thay vì hardcode text
2. ✅ **Tổ chức translations theo sections** (common, hero, pricing, etc.)
3. ✅ **Sử dụng nested keys** để dễ quản lý: `pricing.passenger.name`
4. ✅ **Đảm bảo cả 2 ngôn ngữ đều có đầy đủ translations**
5. ✅ **Sử dụng variables** cho dynamic content: `{{year}}`, `{{name}}`

---

## 📝 TypeScript Types

### Common Types

File: `src/features/Common/common.type.ts`

```typescript
// API Response structure
export interface ApiResponse<T = unknown> {
  Type: string;
  Title: string;
  Status: number;
  Detail: string;
  Errors: Record<string, string[]>;
  Data: T | null;
}

// Helper functions
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

## 🛠️ Utilities

### `cn()` Function

Đã được giải thích ở phần [Tạo Component](#tạo-component).

### Config

File: `src/config.ts`

```typescript
export const host = ""; // API host
// export const host = 'http://localhost:8080';

export const api_version = 'api/v1';
export const baseUrl = `${host}/${api_version}/`;
```

---

## 📚 Thư Viện Đã Cài Đặt

### UI Libraries
- **@radix-ui/react-dialog**: Dialog/Modal components
- **@radix-ui/react-dropdown-menu**: Dropdown menu
- **@radix-ui/react-select**: Select component
- **@radix-ui/react-tabs**: Tabs component
- **@radix-ui/react-slot**: Slot component
- **lucide-react**: Icon library

### Utilities
- **class-variance-authority**: Component variants
- **clsx**: Conditional classnames
- **tailwind-merge**: Merge Tailwind classes

### State Management
- **@reduxjs/toolkit**: Redux Toolkit
- **react-redux**: React bindings cho Redux

### Routing
- **react-router-dom**: Client-side routing

---

## 🔧 Best Practices

1. **Component Organization**: Tổ chức theo feature, không theo type
2. **Type Safety**: Luôn định nghĩa types cho props và API responses
3. **CSS Variables**: Sử dụng CSS variables thay vì hardcode colors
4. **cn() Function**: Luôn dùng `cn()` để merge Tailwind classes
5. **API Error Handling**: Luôn sử dụng helper functions để handle errors
6. **Path Aliases**: Sử dụng `@/` thay vì relative paths
7. **Code Splitting**: Tách code theo feature để optimize bundle size
8. **User Experience**: 
   - Hiển thị loading states khi fetch data
   - Validate form inputs trước khi submit
   - Hiển thị error messages rõ ràng
   - Optimistic updates cho better UX

## 🚗 Tính Năng Chính Của Ứng Dụng

### 1. Tìm Kiếm Chuyến Xe
- Người dùng có thể tìm kiếm chuyến xe theo:
  - Điểm đi và điểm đến
  - Ngày giờ khởi hành
  - Số lượng hành khách
  - Loại xe (nếu có)

### 2. Xem Chi Tiết Chuyến
- Hiển thị thông tin:
  - Công ty vận tải
  - Tài xế và số điện thoại
  - Loại xe và biển số
  - Số ghế còn trống
  - Giá vé

### 3. Đặt Chỗ
- Cho phép người dùng:
  - Chọn số lượng ghế
  - Nhập thông tin hành khách
  - Xác nhận và thanh toán

### 4. Ghép Xe
- Tính năng ghép xe giúp:
  - Tìm hành khách cùng tuyến đường
  - Giảm chi phí cho mỗi hành khách
  - Tối ưu hóa việc sử dụng xe

---

## 🐛 Troubleshooting

### Build thất bại

**Luôn chạy `npm run build` trước khi `npm run dev` để phát hiện lỗi sớm.**

Các lỗi thường gặp:

1. **TypeScript errors:**
   ```bash
   npm run build
   # Sửa tất cả lỗi TypeScript được hiển thị
   ```

2. **JSX syntax errors:**
   - Kiểm tra các tag đóng/mở đúng chưa
   - Kiểm tra các props có đúng type không

3. **Import errors:**
   - Kiểm tra path alias `@/` có đúng không
   - Kiểm tra `tsconfig.app.json` có cấu hình `paths` đúng chưa

### Links vẫn hiển thị màu xanh mặc định

Đã được fix trong `global.css` - các CSS rules mặc định cho `a` đã được loại bỏ.

### CSS Variables không hoạt động

Đảm bảo bạn đang sử dụng syntax: `bg-[var(--color-name)]` trong Tailwind classes.

### Import errors với path alias

Kiểm tra `tsconfig.app.json` có cấu hình `paths` đúng chưa.

### Lỗi "JSX element has no corresponding closing tag"

Kiểm tra tất cả các JSX elements đã được đóng đúng chưa. Sử dụng linter hoặc IDE để phát hiện lỗi này.

---

## 📞 Liên Hệ

Nếu có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ team phát triển.

