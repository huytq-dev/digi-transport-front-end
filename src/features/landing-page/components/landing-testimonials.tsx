import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/animated-text';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    role: 'Hành khách thường xuyên',
    company: 'Hà Nội - Sài Gòn',
    content:
      'Tôi thường xuyên đi lại giữa Hà Nội và Sài Gòn. Digi Transport giúp tôi dễ dàng tìm và đặt chỗ trên các chuyến xe phù hợp. Giao diện rất trực quan, có thể xem được các công ty xe và tài xế trước khi đặt.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Trần Thị Hương',
    role: 'Sinh viên',
    company: 'Đà Nẵng - Huế',
    content:
      'Là sinh viên, tôi cần tìm các chuyến xe giá rẻ. Nền tảng này cho phép tôi so sánh giá và chọn chuyến phù hợp nhất. Đặc biệt là tính năng ghép xe giúp tiết kiệm chi phí đáng kể.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Lê Minh Đức',
    role: 'Doanh nhân',
    company: 'Hà Nội - Hải Phòng',
    content:
      'Tôi đi công tác thường xuyên và cần đặt xe nhanh chóng. Digi Transport cho phép tôi xem chi tiết các chuyến xe, công ty vận tải và tài xế. Dịch vụ rất chuyên nghiệp và đáng tin cậy.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Phạm Thị Lan',
    role: 'Du lịch',
    company: 'Sài Gòn - Đà Lạt',
    content:
      'Tôi thích tính năng có thể xem được thông tin công ty xe và tài xế trước khi đặt. Điều này giúp tôi yên tâm hơn khi đi đường dài. Chuyến đi của tôi luôn an toàn và thoải mái.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Hoàng Văn Nam',
    role: 'Hành khách',
    company: 'Nhiều tuyến đường',
    content:
      'Tôi đã sử dụng Digi Transport cho nhiều chuyến đi khác nhau. Hệ thống tìm kiếm chuyến xe rất tiện lợi, có thể lọc theo điểm đi, điểm đến, thời gian và công ty xe. Rất hài lòng với dịch vụ.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Vũ Thị Mai',
    role: 'Nhân viên văn phòng',
    company: 'Hà Nội - Quảng Ninh',
    content:
      'Tôi đi làm về quê cuối tuần thường xuyên. Digi Transport giúp tôi đặt chỗ dễ dàng và có thể xem được các xe còn trống. Dịch vụ hỗ trợ khách hàng rất tốt, luôn giải đáp thắc mắc nhanh chóng.',
    rating: 5,
  },
] as const;

function LandingTestimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxDesktopIndex = useMemo(() => Math.max(0, TESTIMONIALS.length - 3), []);
  const maxMobileIndex = useMemo(() => Math.max(0, TESTIMONIALS.length - 1), []);

  const visibleTestimonials = useMemo(() => {
    const endIndex = Math.min(currentIndex + 3, TESTIMONIALS.length);
    return TESTIMONIALS.slice(currentIndex, endIndex);
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxDesktopIndex;
      return prev - 1;
    });
  }, [maxDesktopIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxDesktopIndex) return 0;
      return prev + 1;
    });
  }, [maxDesktopIndex]);

  const handleMobilePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxMobileIndex;
      return prev - 1;
    });
  }, [maxMobileIndex]);

  const handleMobileNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxMobileIndex) return 0;
      return prev + 1;
    });
  }, [maxMobileIndex]);

  const handleDesktopDotClick = useCallback((pageIndex: number) => {
    setCurrentIndex(pageIndex * 3);
  }, []);

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn('h-4 w-4 fill-current', i < rating ? 'text-amber-400' : 'text-gray-200')}
      />
    ));
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white" aria-label="Customer testimonials">
      {/* Background Decoration */}
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-cream)]/10 to-white -z-20" />
      
      {/* Decorative blobs - different positions and colors */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 right-[-150px] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(143, 171, 212, 0.25)' }}
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-[-100px] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(74, 112, 169, 0.2)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold mb-6 shadow-sm",
                "bg-white border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)]"
              )}
            >
              <Star className="h-4 w-4 fill-current text-amber-400" />
              <span>{t('testimonials.badge') || 'Đánh giá từ khách hàng'}</span>
            </Badge>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight">
            <AnimatedText>{t('testimonials.title')}</AnimatedText>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <AnimatedText>{t('testimonials.subtitle')}</AnimatedText>
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:block relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="grid grid-cols-3 gap-8"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] border-t border-white/60">
                    <CardContent className="p-8 flex-grow relative">
                      {/* Decorative Quote Icon */}
                      <Quote className="absolute top-6 right-6 h-10 w-10 text-[var(--color-light-blue)]/20 -z-0 rotate-12" />

                      {/* Stars */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className="flex items-center gap-1 mb-6 relative z-10"
                      >
                        {renderStars(testimonial.rating)}
                      </motion.div>

                      {/* Content */}
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        className="text-gray-700 text-base leading-relaxed relative z-10"
                      >
                        "{testimonial.content}"
                      </motion.blockquote>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex items-center gap-4 border-t border-gray-100/50 mt-auto">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.4 }}
                      >
                        <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                          <AvatarFallback className="bg-gradient-to-br from-[var(--color-dark-blue)] to-[var(--color-light-blue)] text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.5 }}
                        className="flex-1 min-w-0"
                      >
                        <p className="font-bold text-[var(--color-dark-blue)] truncate">{testimonial.name}</p>
                        <p className="text-xs font-medium text-[var(--color-dark-blue)]/70 truncate uppercase tracking-wide">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative overflow-hidden py-4 min-h-[300px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="px-2"
            >
              <Card className="h-full flex flex-col border-0 bg-white/80 backdrop-blur-md shadow-lg rounded-3xl p-6 border-t border-white/50">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-1 mb-4"
                >
                  {renderStars(TESTIMONIALS[currentIndex].rating)}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 mb-6 text-sm leading-relaxed min-h-[80px]"
                >
                  "{TESTIMONIALS[currentIndex].content}"
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mt-auto"
                >
                  <div className="h-10 w-10 rounded-full bg-[var(--color-light-blue)]/20 flex items-center justify-center text-[var(--color-dark-blue)] font-bold">
                    {TESTIMONIALS[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-dark-blue)] text-sm">{TESTIMONIALS[currentIndex].name}</p>
                    <p className="text-xs text-gray-500">{TESTIMONIALS[currentIndex].role}</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(TESTIMONIALS.length / 3) }, (_, i) => {
              const isActive = Math.floor(currentIndex / 3) === i;
              return (
                <button
                  key={i}
                  onClick={() => handleDesktopDotClick(i)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-500',
                    isActive ? 'w-8 bg-[var(--color-dark-blue)]' : 'w-2 bg-gray-300 hover:bg-[var(--color-light-blue)]/50'
                  )}
                  aria-label={`Go to page ${i + 1}`}
                />
              );
            })}
          </div>

          {/* Arrow Buttons (Desktop Only) */}
          <div className="hidden md:flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200 hover:bg-white hover:border-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)] transition-all disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex >= maxDesktopIndex}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200 hover:bg-white hover:border-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)] transition-all disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Arrows */}
          <div className="flex md:hidden gap-4">
            <Button onClick={handleMobilePrevious} size="icon" variant="outline" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handleMobileNext} size="icon" variant="outline" className="rounded-full">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingTestimonials;

