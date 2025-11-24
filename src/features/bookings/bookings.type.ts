// Booking Status Types
export type BookingStatus =
  | 'PENDING' // Đang chờ xác nhận
  | 'CONFIRMED' // Đã xác nhận
  | 'IN_PROGRESS' // Đang di chuyển
  | 'COMPLETED' // Hoàn thành
  | 'CANCELLED'; // Đã hủy

export type BookingType = 'CARPOOL' | 'PRIVATE'; // Ghép xe hoặc Nguyên chuyến

// Booking Model
export interface BookingModel {
  BookingId: string;
  TripId: string;
  UserId: string;
  BookingType: BookingType;
  Status: BookingStatus;
  FromLocation: string;
  ToLocation: string;
  DepartureDate: string; // ISO date string
  ArrivalDate?: string;
  Seats: number;
  Price: number;
  TotalPrice: number;
  PaymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  PaymentMethod?: string;
  CreatedAt: string;
  UpdatedAt: string;
  
  // Related Info
  DriverName?: string;
  DriverPhone?: string;
  VehicleType?: string;
  VehiclePlate?: string;
  CompanyName?: string;
  
  // Additional
  Notes?: string;
  CancellationReason?: string;
}

// Booking List Response
export interface BookingListResponse {
  Data: BookingModel[];
  Total: number;
  Page: number;
  PageSize: number;
}

// Booking Filter
export interface BookingFilter {
  Status?: BookingStatus;
  BookingType?: BookingType;
  FromDate?: string;
  ToDate?: string;
  Page?: number;
  PageSize?: number;
}

