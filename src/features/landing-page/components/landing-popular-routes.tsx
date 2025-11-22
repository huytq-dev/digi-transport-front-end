import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Ticket, Clock } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';

function LandingPopularRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Dữ liệu mẫu (Nên có thêm giá cụ thể để hiển thị)
  const routes = [
    {
      key: 'hn-hp',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
      price: '150.000đ', // Ví dụ hardcode, thực tế lấy từ t()
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

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white" aria-label="Popular routes">
      {/* --- BACKGROUND DECORATION --- */}
      {/* Map lines mờ phía sau */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-cover mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold mb-4",
                "bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)] border-transparent"
              )}
            >
              <MapPin className="h-4 w-4" />
              <span>{t('popularRoutes.badge')}</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--color-dark-blue)] tracking-tight leading-tight">
              <AnimatedText>{t('popularRoutes.title')}</AnimatedText>
            </h2>
            <p className="text-lg text-gray-600">
              <AnimatedText>{t('popularRoutes.subtitle')}</AnimatedText>
            </p>
          </div>
          {/* Desktop View All Button (Đặt ở đây cho cân đối) */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate('/routes')}
              variant="outline"
              className="rounded-full border-gray-200 text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)] px-6 h-12 text-base font-medium transition-all"
            >
              <AnimatedText>{t('popularRoutes.viewAll')}</AnimatedText>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* --- ROUTES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={route.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleRouteClick(route.key)}
              className="group relative h-[420px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* 1. Background Image */}
              <img
                src={route.image}
                alt={t(`popularRoutes.routes.${route.key}.name`)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* 2. Gradient Overlay (Cải thiện để text dễ đọc hơn) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/95 via-[var(--color-dark-blue)]/60 via-[var(--color-dark-blue)]/30 to-transparent group-hover:from-[var(--color-dark-blue)]/98 group-hover:via-[var(--color-dark-blue)]/70 transition-all duration-500" />

              {/* 3. Top Section - Price Badge */}
              <div className="absolute top-5 right-5 z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/50 shadow-lg group-hover:bg-white group-hover:shadow-xl transition-all duration-300"
                >
                  <Ticket className="h-4 w-4 text-[var(--color-dark-blue)]" />
                  <span className="text-sm font-bold text-[var(--color-dark-blue)] tracking-wide">
                    {t(`popularRoutes.routes.${route.key}.price`) || route.price}
                  </span>
                </motion.div>
              </div>

              {/* 4. Bottom Section - Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                {/* Duration Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30"
                >
                  <Clock className="h-4 w-4 text-[var(--color-light-blue)]" />
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    {route.duration} {t('popularRoutes.duration')}
                  </span>
                </motion.div>

                {/* Route Name */}
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
                  <AnimatedText>{t(`popularRoutes.routes.${route.key}.name`)}</AnimatedText>
                </h3>

                {/* Hidden Arrow Link (Slide up on hover) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                  whileHover={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-2 text-white pt-2 font-semibold">
                    <span className="text-base">{t('popularRoutes.bookNow')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-8 text-center">
          <Button
            onClick={() => navigate('/routes')}
            className="w-full rounded-full bg-[var(--color-dark-blue)] text-white h-12 font-bold hover:bg-[rgba(74,112,169,0.9)]"
          >
            <AnimatedText>{t('popularRoutes.viewAll')}</AnimatedText>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPopularRoutes;

