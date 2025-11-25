import { baseApi } from '@/redux/baseApi';
import type {
  GetDashboardRequestModel,
  UserDashboardResponseModel,
  DriverDashboardResponseModel,
  CompanyDashboardResponseModel,
} from './home.type';

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/home/dashboard - Get dashboard data based on user role
    getDashboard: builder.query<
      UserDashboardResponseModel | DriverDashboardResponseModel | CompanyDashboardResponseModel,
      GetDashboardRequestModel
    >({
      query: (params) => ({
        url: `home/dashboard`,
        method: 'GET',
        params: {
          userId: params.UserId,
          roleName: params.RoleName,
        },
      }),
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    // GET /api/home/stats - Get statistics
    getStats: builder.query<any, { UserId: string; RoleName: string }>({
      query: (params) => ({
        url: `home/stats`,
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 300,
    }),

    // GET /api/home/recent-activities - Get recent activities
    getRecentActivities: builder.query<any, { UserId: string; RoleName: string; Limit?: number }>({
      query: (params) => ({
        url: `home/recent-activities`,
        method: 'GET',
        params: {
          userId: params.UserId,
          roleName: params.RoleName,
          limit: params.Limit || 10,
        },
      }),
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useLazyGetDashboardQuery,
  useGetStatsQuery,
  useLazyGetStatsQuery,
  useGetRecentActivitiesQuery,
  useLazyGetRecentActivitiesQuery,
} = homeApi;

