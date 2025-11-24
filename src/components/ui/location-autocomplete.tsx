'use client';

import * as React from 'react';
import { Check, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationOption {
  value: string;
  label: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: LocationOption[];
  className?: string;
  icon?: React.ReactNode;
}

// Default popular locations in Vietnam
const DEFAULT_LOCATIONS: LocationOption[] = [
  { value: 'Hà Nội', label: 'Hà Nội' },
  { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh (Sài Gòn)' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Hải Phòng', label: 'Hải Phòng' },
  { value: 'Cần Thơ', label: 'Cần Thơ' },
  { value: 'Huế', label: 'Huế' },
  { value: 'Nha Trang', label: 'Nha Trang' },
  { value: 'Vũng Tàu', label: 'Vũng Tàu' },
  { value: 'Sapa', label: 'Sapa' },
  { value: 'Đà Lạt', label: 'Đà Lạt' },
];

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Chọn địa điểm...',
  options = DEFAULT_LOCATIONS,
  className,
  icon,
}: LocationAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  const selectedOption = options.find((option) => option.value === value);

  // Reset search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            {icon}
          </div>
        )}
        <PopoverTrigger asChild>
          <Input
            value={open ? searchValue : (selectedOption?.label || value || '')}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchValue(newValue);
              onChange(newValue);
              if (newValue) {
                setOpen(true);
              }
            }}
            onFocus={() => {
              setSearchValue(value || '');
              setOpen(true);
            }}
            placeholder={placeholder}
            className={cn(
              'h-10 rounded-full text-sm font-medium truncate w-full',
              'bg-white/50 border-[var(--color-light-blue)]/30',
              'hover:bg-white/80 hover:border-[var(--color-light-blue)]/50',
              'focus:bg-white focus:border-[var(--color-dark-blue)]',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'text-[var(--color-dark-blue)] placeholder:text-gray-400',
              'transition-all duration-200',
              icon && 'pl-9 pr-3',
              !icon && 'px-3',
              className
            )}
          />
        </PopoverTrigger>
      </div>
      <PopoverContent 
        className={cn(
          "w-[var(--radix-popover-trigger-width)] p-0 z-[100]",
          "bg-white/95 backdrop-blur-xl",
          "border-2 border-[var(--color-dark-blue)]/20",
          "shadow-2xl",
          "rounded-2xl overflow-hidden"
        )} 
        align="start"
      >
        <div className="p-3 bg-gradient-to-b from-white to-[var(--color-light-blue)]/5">
          <Input
            placeholder="Tìm kiếm địa điểm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={cn(
              "mb-2 h-10 rounded-full",
              "bg-white border-[var(--color-light-blue)]/30",
              "focus:border-[var(--color-dark-blue)]",
              "shadow-sm"
            )}
          />
          <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
            <AnimatePresence>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setSearchValue('');
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                        'hover:bg-[var(--color-light-blue)]/20 hover:shadow-md',
                        'transition-all duration-200',
                        'text-left border border-transparent hover:border-[var(--color-light-blue)]/30',
                        value === option.value && 'bg-[var(--color-light-blue)]/30 border-[var(--color-dark-blue)]/20 shadow-sm'
                      )}
                    >
                      <MapPin className={cn(
                        "h-4 w-4 flex-shrink-0",
                        value === option.value 
                          ? "text-[var(--color-dark-blue)]" 
                          : "text-[var(--color-dark-blue)]/70"
                      )} />
                      <span className={cn(
                        "flex-1",
                        value === option.value 
                          ? "text-[var(--color-dark-blue)] font-bold" 
                          : "text-[var(--color-dark-blue)]"
                      )}>{option.label}</span>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-[var(--color-dark-blue)] flex-shrink-0 font-bold" />
                      )}
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-[var(--color-dark-blue)]/60 text-center bg-gray-50 rounded-xl">
                  Không tìm thấy địa điểm
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

