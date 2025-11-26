'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { LocationAutocomplete } from '@/components/ui/location-autocomplete';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/animated-text';
import { itemUpVariants, SEARCH_BAR_CLASSES } from '../constants';
import { useSwapLocations } from '../hooks/use-swap-locations';

interface SearchBarProps {
  fromLocation: string;
  toLocation: string;
  date?: Date;
  onFromLocationChange: (value: string) => void;
  onToLocationChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onSearch: () => void;
}

export function SearchBar({
  fromLocation,
  toLocation,
  date,
  onFromLocationChange,
  onToLocationChange,
  onDateChange,
  onSearch,
}: SearchBarProps) {
  const { t } = useTranslation();
  const { swapState, swap } = useSwapLocations();

  const handleSwap = useCallback(() => {
    swap(fromLocation, toLocation, (newFrom, newTo) => {
      onFromLocationChange(newFrom);
      onToLocationChange(newTo);
    });
  }, [fromLocation, toLocation, swap, onFromLocationChange, onToLocationChange]);

  return (
    <motion.div 
      variants={itemUpVariants}
      className={cn(SEARCH_BAR_CLASSES.container)}
    >
      {/* Input: Điểm đi */}
      <div className="relative flex-1 w-full min-w-0 md:min-w-[120px] overflow-visible">
        <motion.div
          animate={{
            x: swapState === 'swapping' ? 50 : 0,
            opacity: swapState === 'swapping' ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <LocationAutocomplete
            value={fromLocation}
            onChange={onFromLocationChange}
            placeholder={t('userHome.hero.fromPlaceholder')}
            className={cn(SEARCH_BAR_CLASSES.input)}
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
          onClick={handleSwap}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: swapState === 'swapping' ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={cn(SEARCH_BAR_CLASSES.swapButton)}
          aria-label="Đổi chiều"
        >
          <ArrowLeftRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </div>

      {/* Input: Điểm đến */}
      <div className="relative flex-1 w-full min-w-0 md:min-w-[120px] overflow-visible">
        <motion.div
          animate={{
            x: swapState === 'swapping' ? -50 : 0,
            opacity: swapState === 'swapping' ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <LocationAutocomplete
            value={toLocation}
            onChange={onToLocationChange}
            placeholder={t('userHome.hero.toPlaceholder')}
            className={cn(SEARCH_BAR_CLASSES.input)}
            icon={<MapPin className="w-4 h-4 text-[var(--color-dark-blue)]" />}
          />
        </motion.div>
      </div>
      
      <div className={cn(SEARCH_BAR_CLASSES.divider)}></div>

      {/* Input: Ngày đi */}
      <div className="relative w-full md:w-auto md:min-w-[160px]">
        <DatePicker
          date={date}
          onSelect={onDateChange}
          placeholder={t('userHome.hero.datePlaceholder')}
          locale="vi"
          variant="default"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          className={cn(SEARCH_BAR_CLASSES.datePicker)}
        />
      </div>

      {/* Nút Tìm kiếm */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="w-full md:w-auto"
      >
        <Button 
          onClick={onSearch}
          className={cn(SEARCH_BAR_CLASSES.searchButton)}
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <AnimatedText>{t('userHome.hero.searchButton')}</AnimatedText>
        </Button>
      </motion.div>
    </motion.div>
  );
}

