'use client';

import { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import {
  Caravan,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Home,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronRight,
  Car,
  MessageSquare,
  Wallet,
  Building2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';
import { AnimatedText } from '@/components/animated-text';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authService } from '@/features/auth/auth.service';
import { useSignOutMutation } from '@/features/auth/auth.slice';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Constants
const SCROLL_THRESHOLD = 50;
const ANIMATION_DURATION = 0.2;

// Định nghĩa Menu Items
const NAV_ITEMS = [
  { key: 'home', translationKey: 'header.navigation.home', href: '/home', icon: Home },
  { key: 'bookings', translationKey: 'header.navigation.bookings', href: '/home/bookings', icon: Calendar },
  { key: 'trips', translationKey: 'header.navigation.trips', href: '/home/trips', icon: MapPin },
];

export const HomeHeader = memo(function HomeHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signOut] = useSignOutMutation();

  // Initialize isScrolled based on current scroll position to prevent flash
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > SCROLL_THRESHOLD;
    }
    return false;
  });

  const user = useMemo(() => authService.getUser(), []);
  // TODO: Fetch notifications count from API
  const hasUnreadNotifications = false; // Placeholder - sẽ được thay thế bằng API call

  // Use framer-motion's useScroll hook for better scroll detection
  const { scrollY } = useScroll();

  // Optimized scroll detection
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  // Sync scroll position on mount to prevent flash
  useEffect(() => {
    const checkScrollPosition = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    checkScrollPosition();
    const timeoutId = setTimeout(checkScrollPosition, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSignOut = useCallback(async () => {
    if (!user?.userId) return;
    try {
      await signOut({ UserId: user.userId }).unwrap();
      authService.clearAuthData();
      toast.success(t('header.signOutSuccess'));
      navigate('/auth/sign-in');
    } catch (error: any) {
      authService.clearAuthData();
      navigate('/auth/sign-in');
    }
  }, [user?.userId, signOut, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Memoize navigation handlers
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleNotificationClick = useCallback(() => {
    // TODO: Open notifications dropdown/modal
    console.log('Open notifications');
  }, []);

  return (
    <motion.header
      className={cn('sticky top-0 z-50', 'border-b border-white/50', 'overflow-hidden')}
      initial={false}
      animate={{
        height: isScrolled ? '4rem' : '5rem', // h-16 : h-20
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-dark-blue)]/20 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[var(--color-light-blue)]/25 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[30%] w-[450px] h-[450px] bg-[var(--color-dark-blue)]/15 rounded-full mix-blend-multiply filter blur-[90px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glass Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full border-b border-white/50"
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          boxShadow: isScrolled
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Content */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <motion.div
            onClick={() => handleNavigate('/home')}
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Caravan className="h-8 w-8 text-[var(--color-dark-blue)]" />
            </motion.div>
            <motion.span
              className="text-2xl font-extrabold text-[var(--color-dark-blue)]"
              initial={false}
              animate={{
                fontSize: isScrolled ? '1.25rem' : '1.5rem',
              }}
              transition={{ duration: 0.3 }}
            >
              DigiTransport
            </motion.span>
          </motion.div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex md:items-center md:space-x-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm rounded-full transition-colors duration-300 flex items-center gap-2',
                    isActive
                      ? 'text-[var(--color-dark-blue)] font-bold'
                      : 'text-[var(--color-dark-blue)]/70 font-semibold hover:text-[var(--color-dark-blue)]'
                  )}
                >
                  {/* Liquid Glass Pill - Chỉ hiện khi Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavGlass"
                      className="absolute inset-0 rounded-full bg-[var(--color-dark-blue)]/10 backdrop-blur-sm border border-[var(--color-dark-blue)]/20 shadow-sm -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Label và Icon */}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className={cn('w-4 h-4', isActive ? 'fill-current' : '')} />
                    <AnimatedText>{t(item.translationKey)}</AnimatedText>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)] transition-colors duration-200"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {hasUnreadNotifications && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"
                />
              )}
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="pl-2 pr-2 py-1.5 h-auto rounded-full hover:bg-[var(--color-light-blue)]/20 border border-transparent hover:border-[var(--color-light-blue)]/30 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-9 w-9 border-white shadow-sm flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-tr from-blue-100 to-purple-100 border border-white">
                        <User className="h-4.5 w-4.5 text-[var(--color-dark-blue)]" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center hidden sm:flex min-w-0">
                      <span className="text-xs font-bold text-[var(--color-dark-blue)] leading-tight truncate max-w-[120px]">
                        {user?.name || 'User'}
                      </span>
                      <span className="text-[10px] text-[var(--color-dark-blue)]/60 leading-tight">
                        <AnimatedText>{t('header.member')}</AnimatedText>
                      </span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-[var(--color-dark-blue)]/60 flex-shrink-0 hidden sm:block" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-xl border-gray-100 bg-white/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-normal px-3 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-tight text-[var(--color-dark-blue)]">{user?.name}</p>
                    <p className="text-xs leading-tight text-[var(--color-dark-blue)]/60">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={() => handleNavigate('/home/trips')}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-[var(--color-dark-blue)]",
                    "hover:bg-[var(--color-light-blue)]/10 hover:text-[var(--color-dark-blue)]",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.yourRides')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--color-dark-blue)]/40 flex-shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate('/home/inbox')}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-[var(--color-dark-blue)]",
                    "hover:bg-[var(--color-light-blue)]/10 hover:text-[var(--color-dark-blue)]",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.inbox')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--color-dark-blue)]/40 flex-shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate('/home/profile')}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-[var(--color-dark-blue)]",
                    "hover:bg-[var(--color-light-blue)]/10 hover:text-[var(--color-dark-blue)]",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.profile')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--color-dark-blue)]/40 flex-shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={() => handleNavigate('/home/transfers')}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-[var(--color-dark-blue)]",
                    "hover:bg-[var(--color-light-blue)]/10 hover:text-[var(--color-dark-blue)]",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.transfers')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--color-dark-blue)]/40 flex-shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate('/home/payments')}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-[var(--color-dark-blue)]",
                    "hover:bg-[var(--color-light-blue)]/10 hover:text-[var(--color-dark-blue)]",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.paymentsRefunds')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--color-dark-blue)]/40 flex-shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2.5 mx-1",
                    "flex items-center justify-between",
                    "text-red-600 hover:text-red-700",
                    "hover:bg-red-50",
                    "transition-colors duration-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium"><AnimatedText>{t('header.userMenu.logout')}</AnimatedText></span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-red-600/40 flex-shrink-0" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMenu}
                variant="ghost"
                size="icon"
                className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-[var(--color-light-blue)]/20"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: ANIMATION_DURATION }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: ANIMATION_DURATION }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-[var(--color-light-blue)]/20"
              role="dialog"
              aria-modal="true"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: ANIMATION_DURATION }}
            >
              <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          'block px-3 py-2 rounded-full text-base relative transition-colors duration-300 flex items-center gap-3',
                          isActive
                            ? 'text-[var(--color-dark-blue)] font-bold'
                            : 'text-[var(--color-dark-blue)]/70 font-semibold hover:text-[var(--color-dark-blue)]'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {/* Liquid Glass Pill - Chỉ hiện khi Active */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavGlassMobile"
                            className="absolute inset-0 rounded-full bg-[var(--color-dark-blue)]/10 backdrop-blur-sm border border-[var(--color-dark-blue)]/20 shadow-sm -z-10"
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Label và Icon */}
                        <span className="relative z-10 flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <AnimatedText>{t(item.translationKey)}</AnimatedText>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-4 pb-3 space-y-1 border-t border-[var(--color-light-blue)]/20">
                  <div className="px-3 pb-2">
                    <LanguageToggle />
                  </div>
                  <Link
                    to="/home/profile"
                    className="block px-3 py-2 rounded-full text-base text-[var(--color-dark-blue)]/70 font-semibold hover:text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <AnimatedText>{t('header.userMenu.profile')}</AnimatedText>
                    </div>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded-full text-base text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="h-5 w-5" />
                      <AnimatedText>{t('header.userMenu.logout')}</AnimatedText>
                    </div>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});
