import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

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

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDesktopDotClick = useCallback((pageIndex: number) => {
    setCurrentIndex(pageIndex * 3);
  }, []);

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={cn('h-5 w-5', i < rating ? 'text-yellow-400' : 'text-gray-300')}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-cream)]" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Desktop: Show 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className={cn(
                  'bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                  'flex flex-col h-full min-h-[320px]'
                )}
              >
                <CardContent className="flex flex-col flex-grow p-6 lg:p-8">
                  {/* Rating */}
                  <div className="flex items-center mb-4 flex-shrink-0" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 mb-6 text-sm lg:text-base leading-relaxed flex-grow overflow-hidden">
                    <span className="line-clamp-6">"{testimonial.content}"</span>
                  </blockquote>
                </CardContent>

                {/* Author */}
                <CardFooter className="flex items-center mt-auto flex-shrink-0 pt-0">
                  <Avatar className="h-12 w-12 mr-4 bg-[var(--color-light-blue)]">
                    <AvatarFallback className="text-white font-semibold text-lg bg-[var(--color-light-blue)]">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--color-dark-blue)] truncate">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Mobile: Show 1 column with carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <article key={testimonial.id} className="min-w-full px-2">
                    <Card className="bg-white flex flex-col h-full min-h-[280px]">
                      <CardContent className="flex flex-col flex-grow p-6">
                        {/* Rating */}
                        <div className="flex items-center mb-4 flex-shrink-0" aria-label={`${testimonial.rating} out of 5 stars`}>
                          {renderStars(testimonial.rating)}
                        </div>

                        {/* Content */}
                        <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed flex-grow overflow-hidden">
                          <span className="line-clamp-5">"{testimonial.content}"</span>
                        </blockquote>
                      </CardContent>

                      {/* Author */}
                      <CardFooter className="flex items-center mt-auto flex-shrink-0 pt-0">
                        <Avatar className="h-12 w-12 mr-4 bg-[var(--color-light-blue)]">
                          <AvatarFallback className="text-white font-semibold text-lg bg-[var(--color-light-blue)]">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[var(--color-dark-blue)] truncate">{testimonial.name}</p>
                          <p className="text-sm text-gray-600 truncate">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </article>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <Button
                onClick={handleMobilePrevious}
                size="icon"
                className="rounded-full bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                aria-label="Previous testimonial"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>

              {/* Dots indicator */}
              <div className="flex space-x-2" role="tablist" aria-label="Testimonial navigation">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === currentIndex
                        ? 'w-8 bg-[var(--color-dark-blue)]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === currentIndex ? 'true' : undefined}
                    role="tab"
                  />
                ))}
              </div>

                  <Button
                    onClick={handleMobileNext}
                    size="icon"
                    className="rounded-full bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                    aria-label="Next testimonial"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
            </div>
          </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex justify-center items-center mt-8 space-x-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                  aria-label="Previous testimonials"
                  aria-disabled={currentIndex === 0}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>

            {/* Dots indicator */}
            <div className="flex space-x-2" role="tablist" aria-label="Testimonial page navigation">
              {Array.from({ length: Math.ceil(TESTIMONIALS.length / 3) }, (_, i) => {
                const isActive = Math.floor(currentIndex / 3) === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleDesktopDotClick(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      isActive
                        ? 'w-8 bg-[var(--color-dark-blue)]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    )}
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={isActive ? 'true' : undefined}
                    role="tab"
                  />
                );
              })}
            </div>

                <Button
                  onClick={handleNext}
                  disabled={currentIndex >= maxDesktopIndex}
                  className="bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                  aria-label="Next testimonials"
                  aria-disabled={currentIndex >= maxDesktopIndex}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingTestimonials;

