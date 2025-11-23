import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Ticket, Clock } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';
import { SmoothWrapper } from '@/components/smooth-wrapper';

function LandingPopularRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routes = [
    {
      key: 'hn-hp',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
      price: '150.000đ',
      duration: '2h 30m',
    },
    {
      key: 'hcm-vt',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      price: '180.000đ',
      duration: '2h 00m',
    },
    {
      key: 'dn-hue',
      image: 'https://images.unsplash.com/photo-1555993538-2e3c5d5a5b5a?w=800&q=80',
      price: '120.000đ',
      duration: '1h 45m',
    },
  ];

  const handleRouteClick = (routeKey: string) => {
    navigate(`/search?route=${routeKey}`);
  };

  // Stagger animation for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 50, damping: 20 }
    },
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50/50" aria-label="Popular routes">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 bg-white -z-30" />
      
      {/* Map lines mờ phía sau */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-cover mix-blend-multiply -z-20" />
      
      {/* Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-light-blue)]/10 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-cream)]/30 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl relative">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="mb-4"
            >
                <Badge
                variant="outline"
                className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm",
                    "bg-white/60 border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)]"
                )}
                >
                <MapPin className="h-3.5 w-3.5" />
                <AnimatedText>{t('popularRoutes.badge')}</AnimatedText>
                </Badge>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight leading-[1.1]">
              <SmoothWrapper className="inline-block">
                <AnimatedText>{t('popularRoutes.title')}</AnimatedText>
              </SmoothWrapper>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              <AnimatedText>{t('popularRoutes.subtitle')}</AnimatedText>
            </p>
          </div>

          {/* Desktop View All Button */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                onClick={() => navigate('/routes')}
                variant="outline"
                className={cn(
                    "rounded-full border-2 h-14 px-8 text-base font-bold transition-all",
                    "border-[var(--color-dark-blue)]/10 text-[var(--color-dark-blue)] bg-transparent",
                    "hover:border-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)] hover:text-white"
                )}
                >
                <AnimatedText>{t('popularRoutes.viewAll')}</AnimatedText>
                <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* --- ROUTES GRID --- */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
          {routes.map((route) => (
            <motion.div
              key={route.key}
              variants={itemVariants}
              onClick={() => handleRouteClick(route.key)}
              className="group relative h-[480px] w-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              {/* 1. Background Image with Zoom Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                    src={route.image}
                    alt={t(`popularRoutes.routes.${route.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>

              {/* 2. Gradient Overlay - Dynamic */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/90 via-[var(--color-dark-blue)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Extra dark gradient at bottom for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

              {/* 3. Top Badges */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                 {/* Location Badge (Optional/Decor) */}
                 <div className="px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium">
                    <AnimatedText>{t('popularRoutes.badge') || 'Popular'}</AnimatedText>
                 </div>

                 {/* Price Badge - Floating Glass */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-lg"
                >
                  <Ticket className="h-4 w-4 text-[var(--color-dark-blue)]" />
                  <span className="text-sm font-bold text-[var(--color-dark-blue)]">
                    <AnimatedText>{t(`popularRoutes.routes.${route.key}.price`) || route.price}</AnimatedText>
                  </span>
                </motion.div>
              </div>

              {/* 4. Content Area */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {/* Duration */}
                <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    <AnimatedText>{route.duration}</AnimatedText>
                  </span>
                </div>

                {/* Route Name */}
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                  <SmoothWrapper className="inline-block">
                    <AnimatedText>{t(`popularRoutes.routes.${route.key}.name`)}</AnimatedText>
                  </SmoothWrapper>
                </h3>
                
                {/* Divider Line */}
                <div className="w-12 h-1 bg-[var(--color-light-blue)] rounded-full mb-4 group-hover:w-20 transition-all duration-500" />

                {/* Action Row - Reveals on Hover */}
                <div className="flex items-center justify-between overflow-hidden">
                    <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        <AnimatedText>{t('popularRoutes.bookNow') || 'Đặt ngay hôm nay'}</AnimatedText>
                    </span>
                    
                    <div className="w-10 h-10 rounded-full bg-white text-[var(--color-dark-blue)] flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500 shadow-lg">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-12 text-center">
          <Button
            onClick={() => navigate('/routes')}
            className="w-full rounded-full bg-[var(--color-dark-blue)] text-white h-14 text-lg font-bold hover:bg-[rgba(74,112,169,0.9)] shadow-lg"
          >
            <AnimatedText>{t('popularRoutes.viewAll')}</AnimatedText>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPopularRoutes;