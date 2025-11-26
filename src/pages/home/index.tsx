'use client';

import { useState, useCallback } from 'react';
import { HomeLayout } from '@/features/home/components/shared/home-layout';
import { HeroSection } from '@/features/home/components/user/components/hero-section';
import { PopularRoutes } from '@/features/home/components/user/components/popular-routes';
import { BecomeDriverSection } from '@/features/home/components/user/components/become-driver-section';
import { HomeFooter } from '@/features/home/components/shared/home-footer';

export default function HomePage() {
  const [date, setDate] = useState<Date>();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleSearch = useCallback(() => {
    console.log('Search:', { fromLocation, toLocation, date });
    // TODO: Navigate to search results page
  }, [fromLocation, toLocation, date]);

  return (
    <HomeLayout>
      <div className="flex flex-col w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <HeroSection
            fromLocation={fromLocation}
            toLocation={toLocation}
            date={date}
            onFromLocationChange={setFromLocation}
            onToLocationChange={setToLocation}
            onDateChange={setDate}
            onSearch={handleSearch}
          />
          <PopularRoutes />
          <BecomeDriverSection />
        </div>
        {/* Footer trải đều full width */}
        <div className="w-full mt-12">
          <HomeFooter />
        </div>
      </div>
    </HomeLayout>
  );
}

