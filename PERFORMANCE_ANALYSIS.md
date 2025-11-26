# Phân Tích Hiệu Năng - TRANSPORT_OJTFA25_FE

## Tổng Quan
Tài liệu này liệt kê tất cả các vấn đề ảnh hưởng đến hiệu năng của trang web được phát hiện sau khi quét toàn bộ thư mục `src`.

---

## 🔴 VẤN ĐỀ NGHIÊM TRỌNG (High Priority)

### 1. **Landing Page Components Không Lazy Load**
**Vị trí:** `src/pages/landing-page/index.tsx`

**Vấn đề:**
- Tất cả các components của landing page được import trực tiếp (eager loading)
- Khi vào trang landing, tất cả components đều được load ngay lập tức
- Làm tăng bundle size ban đầu và thời gian load trang

**Code hiện tại:**
```tsx
import LandingHeader from '@/features/landing-page/components/landing-header';
import LandingHero from '@/features/landing-page/components/landing-hero';
import LandingUSP from '@/features/landing-page/components/landing-usp';
// ... tất cả components khác
```

**Giải pháp:**
- Sử dụng `React.lazy()` và `Suspense` để lazy load các components
- Chỉ load component khi cần thiết (khi scroll đến)

---

### 2. **Thiếu `keepUnusedDataFor` trong baseApi**
**Vị trí:** `src/redux/baseApi.ts`

**Vấn đề:**
- Không có cấu hình `keepUnusedDataFor` mặc định
- Các endpoint không có `keepUnusedDataFor` sẽ không cache dữ liệu
- Dẫn đến việc refetch không cần thiết khi quay lại component

**Code hiện tại:**
```tsx
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({...}),
  tagTypes: ['Bookings', 'Trips', 'Dashboard'],
  endpoints: () => ({}),
});
```

**Giải pháp:**
- Thêm `keepUnusedDataFor: 60` (60 giây) vào cấu hình mặc định

---

### 3. **Thiếu `keepUnusedDataFor` trong Trips API**
**Vị trí:** `src/features/trips/trips.slice.ts`

**Vấn đề:**
- `getTrips`, `getTripDetail`, `getTripLocation`, `getTripStats` không có `keepUnusedDataFor`
- Dữ liệu sẽ bị xóa ngay khi component unmount
- Refetch mỗi lần vào lại trang

**Endpoints bị ảnh hưởng:**
- `getTrips` (line 7-14)
- `getTripDetail` (line 17-20)
- `getTripLocation` (line 36-41) - đặc biệt quan trọng vì là real-time tracking
- `getTripStats` (line 44-55)

**Giải pháp:**
- Thêm `keepUnusedDataFor` phù hợp cho từng endpoint
- `getTripLocation` nên có thời gian cache ngắn hơn (30s) vì là real-time
- Các endpoint khác có thể cache 60-300s

---

### 4. **Thiếu `keepUnusedDataFor` trong Bookings API**
**Vị trí:** `src/features/bookings/bookings.slice.ts`

**Vấn đề:**
- Tất cả endpoints không có `keepUnusedDataFor`
- `getBookings`, `getBookingDetail`, `getBookingStats` sẽ refetch mỗi lần

**Endpoints bị ảnh hưởng:**
- `getBookings` (line 7-14)
- `getBookingDetail` (line 17-20)
- `getBookingStats` (line 33-46)

---

### 5. **Images Không Có Lazy Loading**
**Vị trí:** 
- `src/features/landing-page/components/landing-popular-routes.tsx` (line 147-151)
- `src/features/home/components/user/components/hero-section.tsx` (line 19 - background image)

**Vấn đề:**
- Images trong `landing-popular-routes.tsx` không có `loading="lazy"`
- Background image trong hero section không được optimize
- Images lớn load ngay lập tức làm chậm trang

**Code hiện tại:**
```tsx
<img
    src={route.image}
    alt={t(`popularRoutes.routes.${route.key}.name`)}
    className="w-full h-full object-cover..."
/>
```

**Giải pháp:**
- Thêm `loading="lazy"` cho images
- Sử dụng `srcset` và `sizes` cho responsive images
- Xem xét sử dụng WebP format
- Background images nên được lazy load hoặc preload

---

## 🟡 VẤN ĐỀ TRUNG BÌNH (Medium Priority)

### 6. **Components Thiếu Memoization**
**Vị trí:** Nhiều components trong `src/features/landing-page/components/`

**Vấn đề:**
- Các components landing page không được wrap bằng `memo()`
- Re-render không cần thiết khi parent component update

**Components cần memoize:**
- `LandingHero`
- `LandingUSP`
- `LandingHowItWorks`
- `LandingPricing`
- `LandingTestimonials`
- `LandingContact`
- `LandingPopularRoutes`

**Giải pháp:**
- Wrap các components bằng `React.memo()`
- Đảm bảo props được memoize nếu cần

---

### 7. **Thiếu Debounce cho Search Input**
**Vị trí:**
- `src/features/trips/components/trips-page.tsx` (line 72 - searchQuery)
- `src/features/bookings/components/bookings-page.tsx` (line 73 - searchQuery)

**Vấn đề:**
- Search input filter ngay lập tức mỗi khi user gõ
- `useMemo` chạy lại mỗi lần searchQuery thay đổi
- Có thể gây lag trên mobile với danh sách lớn

**Giải pháp:**
- Sử dụng `useDebounce` hook
- Debounce search query 300-500ms

---

### 8. **Scroll Event Listeners Không Được Throttle**
**Vị trí:**
- `src/features/landing-page/components/landing-header.tsx` (line 87-100)
- `src/features/home/components/shared/home-header.tsx` (line 81-83)

**Vấn đề:**
- `useMotionValueEvent` chạy mỗi lần scroll
- Có thể gây performance issue trên mobile
- Nên throttle hoặc debounce

**Giải pháp:**
- Sử dụng `throttle` hoặc `debounce` cho scroll events
- Hoặc sử dụng `requestAnimationFrame`

---

### 9. **localStorage.getItem() Trong Render**
**Vị trí:**
- `src/features/landing-page/components/landing-header.tsx` (line 52)
- `src/features/home/components/shared/home-header.tsx` (line 73)

**Vấn đề:**
- `localStorage.getItem()` được gọi trong `useMemo` nhưng dependency array rỗng
- Có thể không update khi localStorage thay đổi
- Nên cache trong state hoặc context

**Code hiện tại:**
```tsx
const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);
const user = useMemo(() => authService.getUser(), []);
```

**Giải pháp:**
- Sử dụng state hoặc context để quản lý auth state
- Tránh đọc localStorage trong render

---

### 10. **Thiếu Error Boundaries**
**Vị trí:** Toàn bộ ứng dụng

**Vấn đề:**
- Không có Error Boundaries
- Nếu một component crash, toàn bộ app sẽ crash
- Không có fallback UI

**Giải pháp:**
- Thêm Error Boundaries ở các route chính
- Wrap các sections quan trọng

---

## 🟢 VẤN ĐỀ NHỎ (Low Priority)

### 11. **Framer Motion Animations Có Thể Tối Ưu Hơn**
**Vị trí:** Nhiều components sử dụng framer-motion

**Vấn đề:**
- Một số animations có thể được tắt trên mobile để cải thiện performance
- `whileInView` có thể trigger nhiều lần

**Giải pháp:**
- Sử dụng `viewport={{ once: true }}` để chỉ animate một lần
- Tắt animations trên mobile nếu cần

---

### 12. **Thiếu Prefetching cho Routes**
**Vị trí:** `src/router.tsx`

**Vấn đề:**
- Routes được lazy load nhưng không prefetch
- User phải đợi khi click vào route mới

**Giải pháp:**
- Prefetch routes khi user hover vào link
- Hoặc prefetch routes quan trọng sau khi page load

---

### 13. **Thiếu Virtual Scrolling cho Long Lists**
**Vị trí:**
- `src/features/trips/components/trips-page.tsx`
- `src/features/bookings/components/bookings-page.tsx`

**Vấn đề:**
- Nếu danh sách trips/bookings rất dài, render tất cả items sẽ chậm
- Không có pagination hoặc virtual scrolling

**Giải pháp:**
- Implement pagination
- Hoặc sử dụng virtual scrolling (react-window, react-virtual)

---

### 14. **Thiếu Service Worker / PWA**
**Vị trí:** Toàn bộ ứng dụng

**Vấn đề:**
- Không có service worker để cache assets
- Không có offline support
- Không có PWA capabilities

**Giải pháp:**
- Implement service worker
- Cache static assets và API responses

---

## ✅ ĐIỂM TỐT (Đã Tối Ưu)

1. **Code Splitting:** Routes đã được lazy load ✅
2. **Manual Chunks:** Vite config đã có manual chunks cho vendors ✅
3. **useMemo/useCallback:** Nhiều components đã sử dụng ✅
4. **API Caching:** Một số endpoints đã có `keepUnusedDataFor` ✅
5. **Memo Components:** Một số components đã được memoize ✅
6. **Lazy Loading Images:** Một số images đã có `loading="lazy"` ✅

---

## 📊 Tổng Kết

### Thống Kê:
- **Vấn đề Nghiêm Trọng:** 5
- **Vấn đề Trung Bình:** 5
- **Vấn đề Nhỏ:** 4
- **Điểm Tốt:** 6

### Ưu Tiên Sửa:
1. ✅ Thêm `keepUnusedDataFor` cho tất cả API endpoints
2. ✅ Lazy load landing page components
3. ✅ Thêm lazy loading cho images
4. ✅ Memoize landing page components
5. ✅ Debounce search inputs
6. ✅ Throttle scroll events

---

## 🔧 Các Công Cụ Đề Xuất

1. **React DevTools Profiler:** Để phát hiện re-renders không cần thiết
2. **Lighthouse:** Để đo performance metrics
3. **Bundle Analyzer:** Để phân tích bundle size
4. **React Query DevTools:** Để debug API caching

---

*Tài liệu được tạo tự động sau khi quét toàn bộ thư mục `src`*

