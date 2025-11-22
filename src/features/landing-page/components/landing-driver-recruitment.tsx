import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Smartphone, ArrowRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/animated-text';

function LandingDriverRecruitment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Wallet,
      key: 'revenue',
      title: t('driverRecruitment.benefits.revenue.title') || 'Thu nhập hấp dẫn',
      desc: t('driverRecruitment.benefits.revenue.description') || 'Tối ưu hóa ghế trống, gia tăng doanh thu lên đến 40% mỗi chuyến.',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
      border: 'border-[var(--color-light-blue)]/30',
    },
    {
      icon: Smartphone,
      key: 'management',
      title: t('driverRecruitment.benefits.management.title') || 'Quản lý dễ dàng',
      desc: t('driverRecruitment.benefits.management.description') || 'Ứng dụng chuyên nghiệp giúp bạn theo dõi lịch trình và doanh thu chi tiết.',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
      border: 'border-[var(--color-light-blue)]/30',
    },
    {
      icon: Clock,
      key: 'flexible',
      title: t('driverRecruitment.benefits.flexible.title') || 'Thời gian linh hoạt',
      desc: t('driverRecruitment.benefits.flexible.description') || 'Bạn làm chủ thời gian. Chạy xe khi bạn muốn, không áp đặt doanh số.',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
      border: 'border-[var(--color-light-blue)]/30',
    },
  ];

  return (
    <section id="for-partners" className="relative py-20 md:py-32 overflow-hidden" aria-label="Driver recruitment">
      {/* Background Decoration */}
      {/* Main background */}
      <div className="absolute inset-0 bg-[var(--color-cream)]/30 -z-20" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      
      {/* Animated decorative blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(143, 171, 212, 0.2)' }}
      />
      <motion.div
        animate={{
          scale: [1, 0.8, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-0 top-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none -z-10 opacity-50"
        style={{ backgroundColor: 'rgba(74, 112, 169, 0.15)' }}
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
                "inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold mb-6 shadow-sm hover:shadow-md transition-shadow",
                "bg-white border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)]"
              )}
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-light-blue)]"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-dark-blue)]" />
              </span>
              {t('header.forPartners') || 'Dành cho Đối tác & Tài xế'}
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight leading-tight"
          >
            <AnimatedText>{t('driverRecruitment.title')}</AnimatedText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            <AnimatedText>{t('driverRecruitment.subtitle')}</AnimatedText>
          </motion.p>
        </motion.div>

        {/* Benefits Grid (Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
              >
                <Card
                className={cn(
                    'h-full border-0 relative overflow-hidden group',
                    'bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500',
                    'border border-white/50 hover:border-[var(--color-light-blue)]/50',
                    'hover:-translate-y-2'
                  )}
                >
                  {/* Animated gradient bar */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 + 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-light-blue)]/80 to-transparent"
                  />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-light-blue)]/40 to-transparent" />

                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    {/* Icon Circle with enhanced Glow effect */}
                    <motion.div
                      className={cn(
                        'relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6',
                        benefit.bg,
                        benefit.color,
                        'shadow-inner border',
                        benefit.border
                      )}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className={cn(
                          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500',
                          benefit.bg
                        )}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 rounded-2xl border-2 border-[var(--color-light-blue)]/20 opacity-0 group-hover:opacity-100"
                      />
                      <Icon className="h-10 w-10 stroke-[1.5] relative z-10" />
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold mb-3 text-[var(--color-dark-blue)] group-hover:text-[var(--color-dark-blue)]/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {benefit.title}
                    </motion.h3>

                    <p className="text-gray-600 leading-relaxed">
                      {benefit.desc}
                  </p>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Primary Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <Button
            onClick={() => navigate('/register?type=driver')}
            size="lg"
            className={cn(
                'h-14 px-10 rounded-full text-lg font-bold shadow-xl transition-all relative overflow-hidden group',
                'bg-gradient-to-r from-[var(--color-dark-blue)] to-[var(--color-light-blue)] text-white',
                'hover:shadow-[var(--color-dark-blue)]/50'
              )}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative z-10 flex items-center">
            {t('driverRecruitment.cta')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
          </Button>
          </motion.div>

          {/* Secondary Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <Button
            onClick={() => navigate('/driver-app')}
            size="lg"
            variant="outline"
            className={cn(
                'h-14 px-10 rounded-full text-lg font-semibold border-2 transition-all',
                'border-[var(--color-light-blue)]/50 text-[var(--color-dark-blue)]',
                'hover:border-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/10'
            )}
          >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Smartphone className="mr-2 h-5 w-5" />
              </motion.div>
            {t('driverRecruitment.downloadApp')}
          </Button>
          </motion.div>
        </motion.div>

        {/* Small Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          *{t('driverRecruitment.footnote') || 'Thu nhập thực tế có thể thay đổi tùy theo khu vực và thời gian hoạt động.'}
        </motion.p>
      </div>
    </section>
  );
}

export default LandingDriverRecruitment;

