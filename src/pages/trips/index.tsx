'use client';

import { HomeLayout } from '@/features/home/components/shared/home-layout';
import { TripsPage } from '@/features/trips/components/trips-page';

export default function TripsPageRoute() {
  return (
    <HomeLayout>
      <TripsPage />
    </HomeLayout>
  );
}

