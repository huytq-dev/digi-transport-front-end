'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Filter,
  Search,
  X,
  CheckCircle,
  Loader2,
  ArrowRight,
  Users,
  Car,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useGetBookingsQuery, useCancelBookingMutation, useGetBookingStatsQuery } from '../bookings.slice';
import type { BookingStatus, BookingType } from '../bookings.type';
import { toast } from 'sonner';

// Status Config
const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bgColor: string; icon: typeof CheckCircle }
> = {
  PENDING: {
    label: 'Chờ xác nhận',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    icon: Clock,
  },
  CONFIRMED: {
    label: 'Đã xác nhận',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: CheckCircle,
  },
  IN_PROGRESS: {
    label: 'Đang di chuyển',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: Loader2,
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
    icon: X,
  },
};

export function BookingsPage() {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<BookingType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: bookingsData, isLoading } = useGetBookingsQuery({
    Status: selectedStatus !== 'ALL' ? selectedStatus : undefined,
    BookingType: selectedType !== 'ALL' ? selectedType : undefined,
    Page: 1,
    PageSize: 20,
  });

  const { data: stats } = useGetBookingStatsQuery();

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const bookings = bookingsData?.Data || [];

  // Filter by search query
  const filteredBookings = useMemo(() => {
    if (!searchQuery) return bookings;
    const query = searchQuery.toLowerCase();
    return bookings.filter(
      (booking) =>
        booking.FromLocation.toLowerCase().includes(query) ||
        booking.ToLocation.toLowerCase().includes(query) ||
        booking.BookingId.toLowerCase().includes(query)
    );
  }, [bookings, searchQuery]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Bạn có chắc chắn muốn hủy đặt chỗ này?')) return;

    try {
      await cancelBooking({ BookingId: bookingId }).unwrap();
      toast.success('Đã hủy đặt chỗ thành công');
    } catch (error: any) {
      toast.error(error?.data?.Message || 'Hủy đặt chỗ thất bại');
    }
  };

  const canCancel = (status: BookingStatus) => {
    return status === 'PENDING' || status === 'CONFIRMED';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] mb-2">Đặt chỗ của tôi</h1>
          <p className="text-gray-500">Quản lý và theo dõi các đặt chỗ của bạn</p>
        </div>
        {stats && (
          <div className="flex gap-2 flex-wrap">
            <div className="bg-white/70 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/50">
              <p className="text-xs text-gray-500">Tổng đặt chỗ</p>
              <p className="text-xl font-bold text-[var(--color-dark-blue)]">{stats.Total}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl px-4 py-2 border border-yellow-100">
              <p className="text-xs text-gray-500">Chờ xác nhận</p>
              <p className="text-xl font-bold text-yellow-700">{stats.Pending}</p>
            </div>
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
              placeholder="Tìm kiếm theo điểm đi, điểm đến hoặc mã đặt chỗ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as BookingStatus | 'ALL')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="PENDING">Chờ xác nhận</SelectItem>
              <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
              <SelectItem value="IN_PROGRESS">Đang di chuyển</SelectItem>
              <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
              <SelectItem value="CANCELLED">Đã hủy</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as BookingType | 'ALL')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Loại đặt chỗ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="CARPOOL">Ghép xe</SelectItem>
              <SelectItem value="PRIVATE">Nguyên chuyến</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-dark-blue)]" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/50">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Chưa có đặt chỗ nào</h3>
          <p className="text-gray-500 mb-6">Hãy đặt chuyến đi đầu tiên của bạn!</p>
          <Button
            onClick={() => window.location.href = '/home'}
            className="bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90"
          >
            Đặt chuyến ngay
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, idx) => {
            const statusConfig = STATUS_CONFIG[booking.Status];
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={booking.BookingId}
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
                            {booking.BookingType === 'CARPOOL' ? 'Ghép xe' : 'Nguyên chuyến'}
                          </Badge>
                          <span className="text-xs text-gray-500">#{booking.BookingId.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Đặt ngày: {format(new Date(booking.CreatedAt), 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="font-bold text-gray-800">{booking.FromLocation}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="font-bold text-gray-800">{booking.ToLocation}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(booking.DepartureDate), 'dd/MM/yyyy HH:mm')}</span>
                          </div>
                          {booking.BookingType === 'CARPOOL' && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{booking.Seats} ghế</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Driver/Vehicle Info */}
                    {(booking.DriverName || booking.VehicleType) && (
                      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                        {booking.DriverName && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.DriverName}</span>
                          </div>
                        )}
                        {booking.VehicleType && (
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {booking.VehicleType} {booking.VehiclePlate && `- ${booking.VehiclePlate}`}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex flex-col items-end gap-4 min-w-[200px]">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
                      <p className="text-2xl font-bold text-[var(--color-dark-blue)]">
                        {booking.TotalPrice.toLocaleString('vi-VN')}đ
                      </p>
                      <Badge
                        className={cn(
                          'mt-2 text-xs',
                          booking.PaymentStatus === 'PAID'
                            ? 'bg-green-100 text-green-700'
                            : booking.PaymentStatus === 'REFUNDED'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {booking.PaymentStatus === 'PAID'
                          ? 'Đã thanh toán'
                          : booking.PaymentStatus === 'REFUNDED'
                          ? 'Đã hoàn tiền'
                          : 'Chưa thanh toán'}
                      </Badge>
                    </div>

                    <div className="flex gap-2 w-full">
                      {canCancel(booking.Status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancel(booking.BookingId)}
                          disabled={isCancelling}
                          className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Hủy
                        </Button>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

