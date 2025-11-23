import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AnimatedText } from '@/components/animated-text';
import { SmoothWrapper } from '@/components/smooth-wrapper';
import { Quote, Star } from 'lucide-react';
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

  // Tính số nhóm testimonials (mỗi nhóm 3)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  // Lấy testimonials hiện tại để hiển thị
  const displayedTestimonials = useMemo(() => {
    const start = currentIndex * itemsPerPage;
    return TESTIMONIALS.slice(start, start + itemsPerPage);
  }, [currentIndex]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000); // Chuyển đổi mỗi 5 giây

    return () => clearInterval(interval);
  }, [totalPages]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
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
    <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--color-cream)]/20" aria-label="Customer testimonials">
      {/* Background Decoration */}
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)]/30 via-[var(--color-cream)]/20 to-white -z-20" />
      
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
            <SmoothWrapper className="inline-block">
              <AnimatedText>{t('testimonials.title')}</AnimatedText>
            </SmoothWrapper>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <AnimatedText>{t('testimonials.subtitle')}</AnimatedText>
          </p>
        </motion.div>

        {/* Testimonials Grid with Auto-play */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {displayedTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] border-t border-white/60">
                    <CardContent className="p-6 md:p-8 flex-grow relative">
                      {/* Decorative Quote Icon */}
                      <Quote className="absolute top-4 right-4 h-8 w-8 text-[var(--color-light-blue)]/20 -z-0 rotate-12" />

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-4 relative z-10">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Content */}
                      <blockquote className="text-gray-700 text-sm md:text-base leading-relaxed relative z-10 mb-4">
                        "{testimonial.content}"
                      </blockquote>
                    </CardContent>
                    <CardFooter className="p-6 md:p-8 pt-0 flex items-center gap-4 border-t border-gray-100/50 mt-auto">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-[var(--color-dark-blue)] to-[var(--color-light-blue)] text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[var(--color-dark-blue)] truncate text-sm md:text-base">{testimonial.name}</p>
                        <p className="text-xs font-medium text-[var(--color-dark-blue)]/70 truncate uppercase tracking-wide">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  currentIndex === i
                    ? 'w-8 h-2 bg-[var(--color-dark-blue)]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[var(--color-light-blue)]/50'
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingTestimonials;

