import type {
  ApiResponse,
  RoleName,
} from "../Common/common.type";

// Dashboard Data Models
export interface DashboardStatsModel {
  TotalTrips?: number;
  TotalRevenue?: number;
  TotalBookings?: number;
  PendingTrips?: number;
  CompletedTrips?: number;
  UpcomingTrips?: number;
  [key: string]: number | undefined; // Allow additional stats
}

export interface RecentActivityModel {
  ActivityId: string;
  ActivityType: string;
  Description: string;
  CreatedAt: string;
  RelatedId?: string;
}

export interface UpcomingTripModel {
  TripId: string;
  FromLocation: string;
  ToLocation: string;
  DepartureDate: string;
  Status: string;
  PassengerCount?: number;
  DriverName?: string;
}

// Dashboard Response Models
export interface UserDashboardDataModel {
  Stats: DashboardStatsModel;
  RecentActivities: RecentActivityModel[];
  UpcomingTrips: UpcomingTripModel[];
}

export interface DriverDashboardDataModel {
  Stats: DashboardStatsModel;
  RecentTrips: UpcomingTripModel[];
  Earnings: {
    Today: number;
    ThisWeek: number;
    ThisMonth: number;
  };
  AvailableTrips: UpcomingTripModel[];
}

export interface CompanyDashboardDataModel {
  Stats: DashboardStatsModel;
  FleetInfo: {
    TotalVehicles: number;
    ActiveVehicles: number;
    InMaintenance: number;
  };
  RecentBookings: RecentActivityModel[];
  Revenue: {
    Today: number;
    ThisWeek: number;
    ThisMonth: number;
  };
}

// Request Models
export interface GetDashboardRequestModel {
  UserId: string; // Guid
  RoleName: RoleName;
}

// Response Models
export type UserDashboardResponseModel = ApiResponse<UserDashboardDataModel>;
export type DriverDashboardResponseModel = ApiResponse<DriverDashboardDataModel>;
export type CompanyDashboardResponseModel = ApiResponse<CompanyDashboardDataModel>;

// Union type for all dashboard responses
export type DashboardResponseModel =
  | UserDashboardResponseModel
  | DriverDashboardResponseModel
  | CompanyDashboardResponseModel;

