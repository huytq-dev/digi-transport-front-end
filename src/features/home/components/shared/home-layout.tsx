'use client';

import type { ReactNode } from 'react';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { HomeHeader } from './home-header';

interface HomeLayoutProps {
  children: ReactNode;
}

export const HomeLayout = memo(function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col bg-[var(--color-cream)] relative')}>
      {/* Dot Pattern Background với màu theme */}
      <div className="fixed inset-0 h-full w-full bg-[radial-gradient(var(--color-light-blue)_1px,transparent_1px)] [background-size:16px_16px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header nằm cố định ở trên */}
      <HomeHeader />

      {/* Main Content - Padding top để không bị Header che mất */}
      <main className="flex-1 w-full pt-4 relative z-10">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
});

