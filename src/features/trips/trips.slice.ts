import { baseApi } from '@/redux/baseApi';
import type { TripModel, TripListResponse, TripFilter } from './trips.type';

export const tripsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Trips List
    getTrips: builder.query<TripListResponse, TripFilter>({
      query: (params) => ({
        url: '/trips',
        method: 'GET',
        params,
      }),
      providesTags: ['Trips'],
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),

    // Get Trip Detail
    getTripDetail: builder.query<TripModel, string>({
      query: (tripId) => `/trips/${tripId}`,
      providesTags: (_result, _error, tripId) => [{ type: 'Trips', id: tripId }],
      keepUnusedDataFor: 120, // Cache detail for 2 minutes
    }),

    // Rate Trip
    rateTrip: builder.mutation<
      { Message: string },
      { TripId: string; Rating: number; Comment?: string }
    >({
      query: ({ TripId, Rating, Comment }) => ({
        url: `/trips/${TripId}/rate`,
        method: 'POST',
        body: { Rating, Comment },
      }),
      invalidatesTags: (_result, _error, { TripId }) => [{ type: 'Trips', id: TripId }],
    }),

    // Get Trip Location (Real-time tracking)
    getTripLocation: builder.query<
      { lat: number; lng: number; address: string; timestamp: string },
      string
    >({
      query: (tripId) => `/trips/${tripId}/location`,
      keepUnusedDataFor: 30, // Shorter cache for real-time data (30 seconds)
    }),

    // Get Trip Statistics
    getTripStats: builder.query<
      {
        Total: number;
        Upcoming: number;
        InProgress: number;
        Completed: number;
      },
      void
    >({
      query: () => '/trips/stats',
      providesTags: ['Trips'],
      keepUnusedDataFor: 120, // Cache stats for 2 minutes
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripDetailQuery,
  useRateTripMutation,
  useGetTripLocationQuery,
  useGetTripStatsQuery,
} = tripsApi;

