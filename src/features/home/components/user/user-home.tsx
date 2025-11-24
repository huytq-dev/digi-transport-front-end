'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, User, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { LocationAutocomplete } from '@/components/ui/location-autocomplete';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/animated-text';

// Popular routes data
const POPULAR_ROUTES = [
  { from: 'Hà Nội', to: 'Hải Phòng', price: '150k', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=500&q=60' },
  { from: 'Đà Nẵng', to: 'Huế', price: '120k', img: 'https://images.unsplash.com/photo-1565060169194-120829d45d47?auto=format&fit=crop&w=500&q=60' },
  { from: 'Sài Gòn', to: 'Vũng Tàu', price: '180k', img: 'https://images.unsplash.com/photo-1582087886689-443447be200b?auto=format&fit=crop&w=500&q=60' },
  { from: 'Hà Nội', to: 'Sapa', price: '350k', img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=500&q=60' },
];

// Định nghĩa animation variants để tái sử dụng và đồng bộ
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay giữa các phần tử con
      delayChildren: 0.1
    }
  }
};

const itemUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 50, damping: 20 }
  }
};

export function UserHome() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  
  // State để control hướng animation khi swap
  const [swapState, setSwapState] = useState<'idle' | 'swapping'>('idle');

  const handleSearch = useCallback(() => {
    console.log('Search:', { fromLocation, toLocation, date });
    // TODO: Navigate to search results page
  }, [fromLocation, toLocation, date]);

  const handleSwapLocations = useCallback(() => {
    if (swapState === 'swapping') return; // Chặn spam click
    setSwapState('swapping');
    
    // Logic animation: Chờ 200ms (thời gian bay đi) -> Đổi data -> Bay về
    setTimeout(() => {
      const temp = fromLocation;
      setFromLocation(toLocation);
      setToLocation(temp);
      
      // Reset state sau khi animation hoàn tất
      setTimeout(() => {
        setSwapState('idle');
      }, 200);
    }, 200);
  }, [fromLocation, toLocation, swapState]);

  return (
    <div className="flex flex-col h-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full flex-1 min-h-0 rounded-3xl overflow-hidden shadow-2xl mx-auto mb-6 group">
        {/* Background Image - Animation Ken Burns nhẹ (Zoom chậm) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
          />
          <div className="absolute inset-0 bg-[var(--color-dark-blue)]/40 backdrop-brightness-95"></div>
        </div>

        {/* Nội dung chính */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
        >
          <motion.h1 
            variants={itemUpVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            <AnimatedText>{t('userHome.hero.title')}</AnimatedText>
          </motion.h1>
          
          <motion.p 
            variants={itemUpVariants}
            className="text-lg text-white/90 mb-8 max-w-2xl drop-shadow-md"
          >
            <AnimatedText>{t('userHome.hero.subtitle')}</AnimatedText>
          </motion.p>

          {/* SEARCH BAR CONTAINER */}
          <motion.div 
            variants={itemUpVariants}
            className={cn(
              "p-1.5 rounded-full shadow-2xl w-full max-w-4xl flex flex-col md:flex-row items-center gap-1.5",
              "bg-white/70 backdrop-blur-xl border border-white/40",
              "hover:bg-white/80 transition-colors duration-500"
            )}
          >
            {/* Input: Điểm đi */}
            <div className="relative flex-1 w-full min-w-0 md:min-w-[120px] overflow-visible">
              <motion.div
                // Animation logic: Khi swap, trượt sang phải 50px và mờ đi, sau đó về 0 từ trái
                animate={{
                  x: swapState === 'swapping' ? 50 : 0,
                  opacity: swapState === 'swapping' ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <LocationAutocomplete
                  value={fromLocation}
                  onChange={setFromLocation}
                  placeholder={t('userHome.hero.fromPlaceholder')}
                  className="h-11 pl-10 pr-4 rounded-full bg-white/50 border-transparent focus:bg-white focus:border-[var(--color-dark-blue)] transition-all shadow-sm hover:shadow-md"
                  icon={
                    <div className="w-2 h-2 rounded-full bg-[var(--color-dark-blue)] ring-4 ring-[var(--color-light-blue)]/20"></div>
                  }
                />
              </motion.div>
            </div>

            {/* Nút đổi chiều (Swap Locations) */}
            <div className="relative z-20 -my-3 md:my-0">
              <motion.button
                type="button"
                onClick={handleSwapLocations}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: swapState === 'swapping' ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center",
                  "bg-white text-[var(--color-dark-blue)] border border-[var(--color-light-blue)]/30",
                  "hover:text-white hover:bg-[var(--color-dark-blue)] shadow-lg",
                  "transition-colors duration-200"
                )}
                aria-label="Đổi chiều"
              >
                <ArrowLeftRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>

            {/* Input: Điểm đến */}
            <div className="relative flex-1 w-full min-w-0 md:min-w-[120px] overflow-visible">
              <motion.div
                // Animation logic: Khi swap, trượt sang trái 50px và mờ đi
                animate={{
                  x: swapState === 'swapping' ? -50 : 0,
                  opacity: swapState === 'swapping' ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <LocationAutocomplete
                  value={toLocation}
                  onChange={setToLocation}
                  placeholder={t('userHome.hero.toPlaceholder')}
                  className="h-11 pl-10 pr-4 rounded-full bg-white/50 border-transparent focus:bg-white focus:border-[var(--color-dark-blue)] transition-all shadow-sm hover:shadow-md"
                  icon={<MapPin className="w-4 h-4 text-[var(--color-dark-blue)]" />}
                />
              </motion.div>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-gray-300/50 flex-shrink-0 mx-1"></div>

            {/* Input: Ngày đi */}
            <div className="relative w-full md:w-auto md:min-w-[160px]">
              <DatePicker
                date={date}
                onSelect={setDate}
                placeholder={t('userHome.hero.datePlaceholder')}
                locale="vi"
                variant="default"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className={cn(
                  "w-full [&_button]:h-11 [&_button]:rounded-full [&_button]:bg-white/50 [&_button]:border-transparent",
                  "[&_button]:hover:bg-white [&_button]:hover:shadow-md [&_button]:transition-all",
                  "[&_button]:text-[var(--color-dark-blue)]",
                  "[&_span]:text-[var(--color-dark-blue)]",
                  "[&_span]:font-medium"
                )}
              />
            </div>

            {/* Nút Tìm kiếm */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              <Button 
                onClick={handleSearch}
                className="w-full h-11 px-8 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <AnimatedText>{t('userHome.hero.searchButton')}</AnimatedText>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. POPULAR ROUTES */}
      <section className="flex-shrink-0 pb-6">
        <div className="flex justify-between items-end mb-6 px-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-dark-blue)]">
              <AnimatedText>{t('userHome.popularRoutes.title')}</AnimatedText>
            </h2>
            <p className="text-[var(--color-dark-blue)]/70 mt-1 text-xs md:text-sm">
              <AnimatedText>{t('userHome.popularRoutes.subtitle')}</AnimatedText>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" className="text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/10 group">
              <AnimatedText>{t('userHome.popularRoutes.viewAll')}</AnimatedText> 
              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {POPULAR_ROUTES.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 50 
              }}
              whileHover={{ 
                y: -8, 
                transition: { type: "spring", stiffness: 300 } 
              }}
              className={cn(
                "group relative rounded-2xl overflow-hidden cursor-pointer",
                "bg-white shadow-md border border-gray-100",
                "hover:shadow-2xl hover:border-[var(--color-light-blue)]/30"
              )}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.to} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className={cn(
                  "absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md",
                  "bg-white/90 text-[var(--color-dark-blue)]",
                  "group-hover:scale-105 transition-transform"
                )}>
                  Từ {item.price}
                </div>
              </div>
              <div className="p-4 bg-white relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-[var(--color-dark-blue)] text-sm md:text-base">{item.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-bold text-[var(--color-dark-blue)] text-sm md:text-base">{item.to}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    <User className="w-3 h-3" /> 
                    <span>25+ <AnimatedText>{t('userHome.popularRoutes.driversAvailable')}</AnimatedText></span>
                  </div>
                  {/* Nút Book ẩn hiện khi hover */}
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    className="text-[var(--color-dark-blue)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
