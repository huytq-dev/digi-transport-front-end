import type {
  UserDashboardDataModel,
  DriverDashboardDataModel,
  CompanyDashboardDataModel,
  DashboardStatsModel,
} from './home.type';
import type { RoleName } from '../Common/common.type';

/**
 * Home Service - Helper functions for home/dashboard operations
 */
export const homeService = {
  /**
   * Format dashboard stats for display
   */
  formatStats: (stats: DashboardStatsModel): Record<string, string> => {
    const formatted: Record<string, string> = {};
    
    Object.entries(stats).forEach(([key, value]) => {
      if (typeof value === 'number') {
        // Format numbers with thousand separators
        formatted[key] = value.toLocaleString('vi-VN');
      }
    });
    
    return formatted;
  },

  /**
   * Get default stats based on role
   */
  getDefaultStats: (roleName: RoleName): DashboardStatsModel => {
    switch (roleName) {
      case 'USER':
        return {
          TotalTrips: 0,
          TotalBookings: 0,
          UpcomingTrips: 0,
          CompletedTrips: 0,
        };
      case 'DRIVER':
        return {
          TotalTrips: 0,
          TotalRevenue: 0,
          PendingTrips: 0,
          CompletedTrips: 0,
        };
      case 'ADMIN':
      default:
        return {
          TotalTrips: 0,
          TotalRevenue: 0,
          TotalBookings: 0,
        };
    }
  },

  /**
   * Check if dashboard data is empty
   */
  isEmptyDashboard: (
    data: UserDashboardDataModel | DriverDashboardDataModel | CompanyDashboardDataModel
  ): boolean => {
    const stats = data.Stats || {};
    return Object.values(stats).every((value) => value === 0 || value === undefined);
  },

  /**
   * Get role-specific dashboard route
   */
  getDashboardRoute: (roleName: RoleName): string => {
    switch (roleName) {
      case 'USER':
        return '/home';
      case 'DRIVER':
        return '/driver/home';
      case 'ADMIN':
        return '/admin/home';
      default:
        return '/home';
    }
  },
};

