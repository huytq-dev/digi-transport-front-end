// Popular routes data
export const POPULAR_ROUTES = [
  { from: 'Hà Nội', to: 'Hải Phòng', price: '150k', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=500&q=60' },
  { from: 'Đà Nẵng', to: 'Huế', price: '120k', img: 'https://images.unsplash.com/photo-1565060169194-120829d45d47?auto=format&fit=crop&w=500&q=60' },
  { from: 'Sài Gòn', to: 'Vũng Tàu', price: '180k', img: 'https://images.unsplash.com/photo-1582087886689-443447be200b?auto=format&fit=crop&w=500&q=60' },
  { from: 'Hà Nội', to: 'Sapa', price: '350k', img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=500&q=60' },
] as const;

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const itemUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 50, damping: 20 }
  }
};

// Styling constants
export const SEARCH_BAR_CLASSES = {
  container: "p-1.5 rounded-full shadow-2xl w-full max-w-4xl flex flex-col md:flex-row items-center gap-1.5 bg-white/70 backdrop-blur-xl border border-white/40 hover:bg-white/80 transition-colors duration-500",
  input: "h-11 pl-10 pr-4 rounded-full bg-white/50 border-transparent focus:bg-white focus:border-[var(--color-dark-blue)] transition-all shadow-sm hover:shadow-md",
  swapButton: "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white text-[var(--color-dark-blue)] border border-[var(--color-light-blue)]/30 hover:text-white hover:bg-[var(--color-dark-blue)] shadow-lg transition-colors duration-200",
  divider: "hidden md:block w-[1px] h-8 bg-gray-300/50 flex-shrink-0 mx-1",
  datePicker: "w-full [&_button]:h-11 [&_button]:rounded-full [&_button]:bg-white/50 [&_button]:border-transparent [&_button]:hover:bg-white [&_button]:hover:shadow-md [&_button]:transition-all [&_button]:text-[var(--color-dark-blue)] [&_span]:text-[var(--color-dark-blue)] [&_span]:font-medium",
  searchButton: "w-full h-11 px-8 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2",
} as const;

