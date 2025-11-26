'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Navigation,
  Star,
  Users,
  Car,
  Filter,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Phone,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useGetTripsQuery, useGetTripStatsQuery } from '../trips.slice';
import type { TripStatus } from '../trips.type';

// Status Config
const STATUS_CONFIG: Record<
  TripStatus,
  { label: string; color: string; bgColor: string; icon: typeof CheckCircle }
> = {
  UPCOMING: {
    label: 'Sắp tới',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: Clock,
  },
  IN_PROGRESS: {
    label: 'Đang di chuyển',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: Navigation,
  },
  COMPLETED: {
    label: 'Hoàn thành',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Đã hủy',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: AlertCircle,
  },
};

export function TripsPage() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<TripStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'in-progress' | 'completed'>('upcoming');

  const { data: tripsData, isLoading } = useGetTripsQuery({
    Status: selectedStatus !== 'ALL' ? selectedStatus : undefined,
    Page: 1,
    PageSize: 20,
  });

  const { data: stats } = useGetTripStatsQuery();

  const trips = tripsData?.Data || [];

  // Filter by search query
  const filteredTrips = useMemo(() => {
    if (!searchQuery) return trips;
    const query = searchQuery.toLowerCase();
    return trips.filter(
      (trip) =>
        trip.FromLocation.toLowerCase().includes(query) ||
        trip.ToLocation.toLowerCase().includes(query) ||
        trip.TripId.toLowerCase().includes(query) ||
        trip.DriverName.toLowerCase().includes(query)
    );
  }, [trips, searchQuery]);

  // Group trips by status
  const groupedTrips = useMemo(() => {
    return {
      upcoming: filteredTrips.filter((t) => t.Status === 'UPCOMING'),
      inProgress: filteredTrips.filter((t) => t.Status === 'IN_PROGRESS'),
      completed: filteredTrips.filter((t) => t.Status === 'COMPLETED'),
    };
  }, [filteredTrips]);

  const displayTrips = useMemo(() => {
    switch (activeTab) {
      case 'upcoming':
        return groupedTrips.upcoming;
      case 'in-progress':
        return groupedTrips.inProgress;
      case 'completed':
        return groupedTrips.completed;
      default:
        return [];
    }
  }, [activeTab, groupedTrips]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] mb-2">Chuyến đi của tôi</h1>
          <p className="text-gray-500">Theo dõi và quản lý các chuyến đi của bạn</p>
        </div>
        {stats && (
          <div className="flex gap-2 flex-wrap">
            <div className="bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/50">
              <p className="text-xs text-gray-500">Tổng chuyến</p>
              <p className="text-xl font-bold text-[var(--color-dark-blue)]">{stats.Total}</p>
            </div>
            <div className="bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
              <p className="text-xs text-gray-500">Sắp tới</p>
              <p className="text-xl font-bold text-blue-700">{stats.Upcoming}</p>
            </div>
            {stats.InProgress > 0 && (
              <div className="bg-green-50 rounded-xl px-4 py-2 border border-green-100">
                <p className="text-xs text-gray-500">Đang đi</p>
                <p className="text-xl font-bold text-green-700">{stats.InProgress}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo điểm đi, điểm đến, tài xế hoặc mã chuyến..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as TripStatus | 'ALL')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="UPCOMING">Sắp tới</SelectItem>
              <SelectItem value="IN_PROGRESS">Đang di chuyển</SelectItem>
              <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
              <SelectItem value="CANCELLED">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-xl">
          <TabsTrigger value="upcoming" className="relative">
            Sắp tới
            {groupedTrips.upcoming.length > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">
                {groupedTrips.upcoming.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="relative">
            Đang đi
            {groupedTrips.inProgress.length > 0 && (
              <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                {groupedTrips.inProgress.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Đã hoàn thành
            {groupedTrips.completed.length > 0 && (
              <Badge className="ml-2 bg-gray-100 text-gray-700 text-xs">
                {groupedTrips.completed.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Trips List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-dark-blue)]" />
          </div>
        ) : displayTrips.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/50 mt-4">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {activeTab === 'upcoming'
                ? 'Chưa có chuyến đi sắp tới'
                : activeTab === 'in-progress'
                ? 'Không có chuyến đang di chuyển'
                : 'Chưa có chuyến đi đã hoàn thành'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'upcoming'
                ? 'Hãy đặt chuyến đi đầu tiên của bạn!'
                : 'Các chuyến đi đã hoàn thành sẽ hiển thị ở đây'}
            </p>
            {activeTab === 'upcoming' && (
              <Button
                onClick={() => navigate('/home')}
                className="bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90"
              >
                Đặt chuyến ngay
              </Button>
            )}
          </div>
        ) : (
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {displayTrips.map((trip, idx) => {
                const statusConfig = STATUS_CONFIG[trip.Status];
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={trip.TripId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left: Route Info */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={cn('text-xs font-bold', statusConfig.bgColor, statusConfig.color)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {trip.BookingType === 'CARPOOL' ? 'Ghép xe' : 'Nguyên chuyến'}
                              </Badge>
                              <span className="text-xs text-gray-500">#{trip.TripId.slice(0, 8).toUpperCase()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-bold text-gray-800">{trip.FromLocation}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="font-bold text-gray-800">{trip.ToLocation}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{format(new Date(trip.DepartureDate), 'dd/MM/yyyy HH:mm')}</span>
                              </div>
                              {trip.EstimatedDuration && (
                                <span className="text-xs text-gray-500">
                                  ~{Math.floor(trip.EstimatedDuration / 60)}h {trip.EstimatedDuration % 60}m
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Driver Info */}
                        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                              {trip.DriverAvatar ? (
                                <img src={trip.DriverAvatar} alt={trip.DriverName} className="w-full h-full object-cover" />
                              ) : (
                                <Users className="w-5 h-5 text-[var(--color-dark-blue)]" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{trip.DriverName}</p>
                              <div className="flex items-center gap-1">
                                {trip.DriverRating ? (
                                  <>
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">{trip.DriverRating}</span>
                                  </>
                                ) : (
                                  <span className="text-xs text-gray-500">Chưa có đánh giá</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Car className="w-4 h-4" />
                            <span>
                              {trip.VehicleType} {trip.VehiclePlate}
                            </span>
                          </div>
                        </div>

                        {/* Current Location (if in progress) */}
                        {trip.Status === 'IN_PROGRESS' && trip.CurrentLocation && (
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <div className="flex items-center gap-2">
                              <Navigation className="w-4 h-4 text-green-600 animate-pulse" />
                              <span className="text-sm font-medium text-green-700">Đang di chuyển</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{trip.CurrentLocation.address}</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col items-end gap-4 min-w-[200px]">
                        <div className="flex flex-col items-end gap-2 w-full">
                          {trip.Status === 'IN_PROGRESS' && (
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                // TODO: Open map tracking
                                console.log('Track trip:', trip.TripId);
                              }}
                            >
                              <Map className="w-4 h-4 mr-1" />
                              Theo dõi
                            </Button>
                          )}
                          {trip.DriverPhone && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                window.location.href = `tel:${trip.DriverPhone}`;
                              }}
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Gọi tài xế
                            </Button>
                          )}
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90"
                            onClick={() => {
                              // TODO: Navigate to trip detail
                              console.log('View trip detail:', trip.TripId);
                            }}
                          >
                            Chi tiết
                          </Button>
                          {trip.Status === 'COMPLETED' && trip.CanRate && !trip.HasRated && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                              onClick={() => {
                                // TODO: Open rating modal
                                console.log('Rate trip:', trip.TripId);
                              }}
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Đánh giá
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

