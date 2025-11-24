'use client';

import { HomeLayout } from '@/features/home/components/shared/home-layout';
import { BookingsPage } from '@/features/bookings/components/bookings-page';

export default function BookingsPageRoute() {
  return (
    <HomeLayout>
      <BookingsPage />
    </HomeLayout>
  );
}

