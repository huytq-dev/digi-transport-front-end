import { baseApi } from '@/redux/baseApi';
import type { BookingModel, BookingListResponse, BookingFilter } from './bookings.type';

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Bookings List
    getBookings: builder.query<BookingListResponse, BookingFilter>({
      query: (params) => ({
        url: '/bookings',
        method: 'GET',
        params,
      }),
      providesTags: ['Bookings'],
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),

    // Get Booking Detail
    getBookingDetail: builder.query<BookingModel, string>({
      query: (bookingId) => `/bookings/${bookingId}`,
      providesTags: (_result, _error, bookingId) => [{ type: 'Bookings', id: bookingId }],
      keepUnusedDataFor: 120, // Cache detail for 2 minutes
    }),

    // Cancel Booking
    cancelBooking: builder.mutation<{ Message: string }, { BookingId: string; Reason?: string }>({
      query: ({ BookingId, Reason }) => ({
        url: `/bookings/${BookingId}/cancel`,
        method: 'POST',
        body: { Reason },
      }),
      invalidatesTags: ['Bookings'],
    }),

    // Get Booking Statistics
    getBookingStats: builder.query<
      {
        Total: number;
        Pending: number;
        Confirmed: number;
        InProgress: number;
        Completed: number;
        Cancelled: number;
      },
      void
    >({
      query: () => '/bookings/stats',
      providesTags: ['Bookings'],
      keepUnusedDataFor: 120, // Cache stats for 2 minutes
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailQuery,
  useCancelBookingMutation,
  useGetBookingStatsQuery,
} = bookingsApi;

