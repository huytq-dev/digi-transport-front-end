import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Shield, CreditCard, TrendingUp, Car, MapPin, Smartphone, QrCode } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';
import { SmoothWrapper } from '@/components/smooth-wrapper';
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
            <SmoothWrapper className="inline-block">
              <AnimatedText>{t('usp.title')}</AnimatedText>
            </SmoothWrapper>
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
                <p className="text-sm font-medium text-gray-600">
                  <AnimatedText>{stat.label}</AnimatedText>
                </p>
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
                      <SmoothWrapper className="inline-block">
                        <AnimatedText>{t(`usp.items.${item.key}.title`)}</AnimatedText>
                      </SmoothWrapper>
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

        {/* Mobile App CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 md:mt-24"
        >
          <Card className="bg-gradient-to-br from-[var(--color-light-blue)]/20 to-[var(--color-dark-blue)]/10 border-[var(--color-light-blue)]/30 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="h-6 w-6 text-[var(--color-dark-blue)]" />
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-dark-blue)]">
                      <AnimatedText>{t('mobileApp.title')}</AnimatedText>
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    <AnimatedText>{t('mobileApp.subtitle')}</AnimatedText>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="bg-white text-[var(--color-dark-blue)] hover:bg-gray-50 rounded-xl flex items-center gap-2 px-6"
                      onClick={() => window.open('https://play.google.com/store', '_blank')}
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      <AnimatedText>{t('mobileApp.googlePlay')}</AnimatedText>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[var(--color-dark-blue)]/30 text-[var(--color-dark-blue)] hover:bg-white/50 rounded-xl flex items-center gap-2 px-6"
                      onClick={() => window.open('https://apps.apple.com', '_blank')}
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <AnimatedText>{t('mobileApp.appStore')}</AnimatedText>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                    <QrCode className="h-20 w-20 text-[var(--color-dark-blue)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-dark-blue)]">
                        <AnimatedText>{t('mobileApp.scanQR')}</AnimatedText>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{t('mobileApp.platforms')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingUSP;

