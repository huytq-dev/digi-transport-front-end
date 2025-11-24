// Trip Status Types
export type TripStatus =
  | 'UPCOMING' // Sắp tới
  | 'IN_PROGRESS' // Đang di chuyển
  | 'COMPLETED' // Hoàn thành
  | 'CANCELLED'; // Đã hủy

// Trip Model
export interface TripModel {
  TripId: string;
  BookingId: string;
  FromLocation: string;
  ToLocation: string;
  DepartureDate: string; // ISO date string
  ArrivalDate?: string;
  EstimatedDuration?: number; // minutes
  Status: TripStatus;
  BookingType: 'CARPOOL' | 'PRIVATE';
  
  // Vehicle & Driver Info
  DriverId: string;
  DriverName: string;
  DriverPhone: string;
  DriverAvatar?: string;
  DriverRating?: number;
  VehicleType: string;
  VehiclePlate: string;
  VehicleSeats: number;
  CompanyName?: string;
  
  // Location Tracking
  CurrentLocation?: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  PickupLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  DropoffLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  
  // Passenger Info
  PassengerSeat?: number;
  TotalPassengers?: number;
  
  // Rating
  CanRate: boolean;
  HasRated: boolean;
  Rating?: {
    score: number;
    comment?: string;
    createdAt: string;
  };
  
  // Additional
  Notes?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// Trip List Response
export interface TripListResponse {
  Data: TripModel[];
  Total: number;
  Page: number;
  PageSize: number;
}

// Trip Filter
export interface TripFilter {
  Status?: TripStatus;
  FromDate?: string;
  ToDate?: string;
  Page?: number;
  PageSize?: number;
}

