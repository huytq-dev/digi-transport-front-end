'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedText } from '@/components/animated-text';
import { containerVariants, itemUpVariants } from '../constants';
import { SearchBar } from './search-bar';

interface HeroSectionProps {
  fromLocation: string;
  toLocation: string;
  date?: Date;
  onFromLocationChange: (value: string) => void;
  onToLocationChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onSearch: () => void;
}

const HERO_BACKGROUND_IMAGE = "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')";

export function HeroSection({
  fromLocation,
  toLocation,
  date,
  onFromLocationChange,
  onToLocationChange,
  onDateChange,
  onSearch,
}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl mx-auto mb-6 group">
      {/* Background Image - Animation Ken Burns nhẹ (Zoom chậm) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: HERO_BACKGROUND_IMAGE }}
        />
        <div className="absolute inset-0 bg-[var(--color-dark-blue)]/40 backdrop-brightness-95"></div>
      </div>

      {/* Nội dung chính */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] px-4 py-8 md:py-12 text-center"
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

        {/* SEARCH BAR */}
        <SearchBar
          fromLocation={fromLocation}
          toLocation={toLocation}
          date={date}
          onFromLocationChange={onFromLocationChange}
          onToLocationChange={onToLocationChange}
          onDateChange={onDateChange}
          onSearch={onSearch}
        />
      </motion.div>
    </section>
  );
}

