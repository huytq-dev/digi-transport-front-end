import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Smartphone, ArrowRight, Wallet, ShieldCheck, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/animated-text';
import { SmoothWrapper } from '@/components/smooth-wrapper';

function LandingDriverRecruitment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Wallet,
      key: 'revenue',
      title: t('driverRecruitment.benefits.revenue.title') || 'Thu nhập hấp dẫn',
      desc: t('driverRecruitment.benefits.revenue.description') || 'Tối ưu hóa ghế trống, gia tăng doanh thu lên đến 40% mỗi chuyến.',
      gradient: 'from-emerald-400 to-emerald-600',
      shadow: 'shadow-emerald-500/20',
      iconColor: 'text-emerald-50',
    },
    {
      icon: Smartphone,
      key: 'management',
      title: t('driverRecruitment.benefits.management.title') || 'Quản lý dễ dàng',
      desc: t('driverRecruitment.benefits.management.description') || 'Ứng dụng chuyên nghiệp giúp bạn theo dõi lịch trình và doanh thu chi tiết.',
      gradient: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-500/20',
      iconColor: 'text-blue-50',
    },
    {
      icon: Clock,
      key: 'flexible',
      title: t('driverRecruitment.benefits.flexible.title') || 'Thời gian linh hoạt',
      desc: t('driverRecruitment.benefits.flexible.description') || 'Bạn làm chủ thời gian. Chạy xe khi bạn muốn, không áp đặt doanh số.',
      gradient: 'from-orange-400 to-orange-600',
      shadow: 'shadow-orange-500/20',
      iconColor: 'text-orange-50',
    },
  ];

  // Animation variants cho container để stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="for-partners" className="relative py-24 md:py-32 overflow-hidden" aria-label="Driver recruitment">
      {/* --- Background Layers --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-cream)]/20 to-white -z-20" />
      
      {/* Grid Pattern mờ */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Animated Blobs - Màu sắc điều chỉnh lại cho nhã nhặn hơn */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-5%] top-20 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none -z-10 opacity-30"
        style={{ backgroundColor: 'var(--color-light-blue)' }}
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] bottom-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none -z-10 opacity-20"
        style={{ backgroundColor: 'var(--color-dark-blue)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          {/* Glass Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className={cn(
                "inline-flex items-center gap-2.5 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-md",
                "bg-white/50 border-[var(--color-light-blue)]/40 text-[var(--color-dark-blue)] rounded-full"
              )}
            >
              <Car className="w-4 h-4 text-[var(--color-light-blue)]" />
              <AnimatedText>{t('header.forPartners') || 'Dành cho Đối tác & Tài xế'}</AnimatedText>
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight leading-[1.15]"
          >
            <SmoothWrapper className="inline-block">
              <AnimatedText>{t('driverRecruitment.title')}</AnimatedText>
            </SmoothWrapper>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            <AnimatedText>{t('driverRecruitment.subtitle')}</AnimatedText>
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.key}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    'h-full border-0 relative overflow-hidden group rounded-[2rem]',
                    'bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]', // Bóng đổ mềm
                    'border border-white/60', // Viền kính
                    'hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-500'
                  )}
                >
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />

                  <CardContent className="p-8 lg:p-10 flex flex-col items-center text-center h-full relative z-10">
                    {/* Icon Container - Floating Orb Style */}
                    <div className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-500",
                      "bg-gradient-to-br", benefit.gradient, benefit.shadow
                    )}>
                      <Icon className={cn("h-10 w-10 stroke-[1.5]", benefit.iconColor)} />
                      
                      {/* Inner glow for icon */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-[var(--color-dark-blue)] group-hover:text-black transition-colors">
                      <AnimatedText>{benefit.title}</AnimatedText>
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-base">
                      <AnimatedText>{benefit.desc}</AnimatedText>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA - Premium Button Style */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/register?type=driver')}
              size="lg"
              className={cn(
                'h-16 px-10 rounded-full text-lg font-bold shadow-xl transition-all relative overflow-hidden group',
                'bg-[var(--color-dark-blue)] text-white',
                'hover:shadow-[0_20px_40px_-10px_rgba(28,64,110,0.4)]' // Deep blue shadow
              )}
            >
              {/* Gradient overlay that moves */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10 flex items-center gap-3">
                <AnimatedText>{t('driverRecruitment.cta')}</AnimatedText>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/driver-app')}
              size="lg"
              variant="outline"
              className={cn(
                'h-16 px-8 rounded-full text-lg font-semibold border-2 transition-all bg-transparent backdrop-blur-sm',
                'border-[var(--color-dark-blue)]/10 text-[var(--color-dark-blue)]',
                'hover:bg-[var(--color-light-blue)]/10 hover:border-[var(--color-dark-blue)]/20'
              )}
            >
              <Smartphone className="mr-2 h-5 w-5" />
              <AnimatedText>{t('driverRecruitment.downloadApp')}</AnimatedText>
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicator / Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/50">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-500 font-medium">
                    *{t('driverRecruitment.footnote') || 'Thu nhập đã được kiểm chứng bởi hơn 5,000 tài xế.'}
                </p>
            </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingDriverRecruitment;