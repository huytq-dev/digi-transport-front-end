import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Shield, CreditCard, TrendingUp, Car, MapPin } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';
import { motion, useInView } from 'framer-motion';

// Component để animate số
interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

function AnimatedNumber({ value, duration = 2, className }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Parse giá trị từ string (ví dụ: "1,000+", "50k+", "200+", "63")
  const parseValue = (val: string): number => {
    const cleanVal = val.replace(/[+,]/g, '').trim();
    if (cleanVal.toLowerCase().endsWith('k')) {
      return parseFloat(cleanVal.toLowerCase().replace('k', '')) * 1000;
    }
    return parseFloat(cleanVal) || 0;
  };

  // Format số với dấu phẩy và ký tự đặc biệt
  const formatValue = (num: number, original: string): string => {
    const rounded = Math.floor(num);
    
    // Giữ lại format gốc (+, k, etc.)
    if (original.includes('k+') || original.includes('K+')) {
      const kValue = rounded / 1000;
      return `${kValue.toFixed(0)}k+`;
    }
    if (original.includes('+')) {
      return `${rounded.toLocaleString('en-US')}+`;
    }
    return rounded.toLocaleString('en-US');
  };

  const targetValue = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = targetValue;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetValue, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? formatValue(count, value) : '0'}
    </span>
  );
}

function LandingUSP() {
  const { t } = useTranslation();

  // Stats data với giá trị số để animate
  const stats = [
    { 
      label: t('usp.stats.dailyTrips') || 'Chuyến đi mỗi ngày', 
      value: '1,000+', 
      icon: TrendingUp 
    },
    { 
      label: t('usp.stats.satisfiedCustomers') || 'Khách hàng hài lòng', 
      value: '50k+', 
      icon: Users 
    },
    { 
      label: t('usp.stats.partners') || 'Đối tác nhà xe', 
      value: '200+', 
      icon: Car 
    },
    { 
      label: t('usp.stats.provinces') || 'Tỉnh thành phủ sóng', 
      value: '63', 
      icon: MapPin 
    },
  ];

  const uspItems = [
    {
      icon: Sparkles,
      key: 'smartMatching',
      iconColor: 'text-[var(--color-dark-blue)]',
      bgColor: 'bg-[var(--color-light-blue)]/20',
      borderColor: 'group-hover:border-[var(--color-light-blue)]/40',
    },
    {
      icon: Users,
      key: 'flexible',
      iconColor: 'text-[var(--color-dark-blue)]',
      bgColor: 'bg-[var(--color-light-blue)]/20',
      borderColor: 'group-hover:border-[var(--color-light-blue)]/40',
    },
    {
      icon: Shield,
      key: 'transparent',
      iconColor: 'text-[var(--color-dark-blue)]',
      bgColor: 'bg-[var(--color-light-blue)]/20',
      borderColor: 'group-hover:border-[var(--color-light-blue)]/40',
    },
    {
      icon: CreditCard,
      key: 'payment',
      iconColor: 'text-[var(--color-dark-blue)]',
      bgColor: 'bg-[var(--color-light-blue)]/20',
      borderColor: 'group-hover:border-[var(--color-light-blue)]/40',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-white" aria-label="Why choose Digi Transport">
      {/* Background Layers */}
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)]/20 via-white to-white -z-10" />
      
      {/* Decorative accent - subtle */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none -z-10 opacity-30"
        style={{ backgroundColor: 'var(--color-light-blue)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold mb-6 shadow-sm",
                "bg-white border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)]"
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span>{t('usp.badge') || t('usp.title')}</span>
            </Badge>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight leading-tight">
            <AnimatedText>{t('usp.title')}</AnimatedText>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 leading-relaxed">
            <AnimatedText>
              {t('usp.subtitle') || 'Chúng tôi không chỉ cung cấp chuyến đi, chúng tôi mang đến trải nghiệm kết nối liền mạch giữa hành khách và đối tác vận tải.'}
            </AnimatedText>
          </p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center mb-2">
                  <StatIcon className="h-5 w-5 text-[var(--color-dark-blue)] mr-2" />
                  <p className="text-3xl font-bold text-[var(--color-dark-blue)]">
                    <AnimatedNumber value={stat.value} duration={2} />
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {uspItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    'group relative h-full border-0',
                    // Glassmorphism Style
                    'bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300',
                    'border border-white/50 hover:border-white/80',
                    item.borderColor,
                    // Hover effect
                    'hover:-translate-y-1'
                  )}
                >
                  <CardHeader className="pb-4">
                    {/* Icon Box */}
                    <div
                className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-transparent transition-all duration-300',
                        item.bgColor,
                        item.borderColor,
                        'group-hover:scale-110 group-hover:rotate-3'
                      )}
                    >
                      <Icon className={cn('h-7 w-7', item.iconColor)} />
                  </div>
                    
                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-[var(--color-dark-blue)] group-hover:text-[var(--color-dark-blue)]/80 transition-colors">
                    <AnimatedText>{t(`usp.items.${item.key}.title`)}</AnimatedText>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {/* Description */}
                    <CardDescription className="text-base leading-relaxed text-gray-600">
                    <AnimatedText>{t(`usp.items.${item.key}.description`)}</AnimatedText>
                    </CardDescription>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingUSP;

