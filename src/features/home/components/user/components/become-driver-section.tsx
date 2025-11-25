'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Car, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/animated-text';
import { useNavigate } from 'react-router-dom';

export function BecomeDriverSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative w-full mt-8 mb-6">
      {/* Background container với gradient và effects */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-blue)] via-[var(--color-dark-blue)] to-[#1e3a5f]"></div>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-light-blue)]/20 via-transparent to-[var(--color-light-blue)]/10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Car className="w-full h-full" />
          </motion.div>
        </div>

        {/* Floating decorative circles */}
        <div className="absolute top-6 left-6 w-20 h-20 bg-[var(--color-light-blue)]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-6 right-12 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--color-light-blue)]/5 rounded-full blur-xl"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-10">
          {/* Content bên trái */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 max-w-2xl flex-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white/90"
            >
              <Sparkles className="w-3 h-3 text-[var(--color-light-blue)]" />
              <span>Join 5,000+ Drivers</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <span className="block text-white">
                <AnimatedText>{t('userHome.becomeDriver.title')}</AnimatedText>
              </span>
              <span className="block bg-gradient-to-r from-[var(--color-light-blue)] to-[#60a5fa] bg-clip-text text-transparent mt-2">
                <AnimatedText>{t('userHome.becomeDriver.titleHighlight')}</AnimatedText>
              </span>
            </h2>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/90 mb-6 text-base md:text-lg leading-relaxed max-w-xl"
            >
              <AnimatedText>{t('userHome.becomeDriver.description')}</AnimatedText>
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate('/driver/register')}
                  className="bg-white text-[var(--color-dark-blue)] hover:bg-gray-50 font-bold rounded-full px-6 py-5 text-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <AnimatedText>{t('userHome.becomeDriver.registerButton')}</AnimatedText>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/driver/benefits')}
                  className="text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-full px-6 py-5 text-sm backdrop-blur-sm transition-all duration-300 group"
                >
                  <AnimatedText>{t('userHome.becomeDriver.benefitsButton')}</AnimatedText>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual element bên phải */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative z-10 mt-8 md:mt-0 hidden lg:block"
          >
            {/* Glassmorphism card với icon */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-light-blue)]/20 to-transparent rounded-full blur-2xl"></div>
              
              {/* Main circle */}
              <motion.div 
                className="relative w-56 h-56 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-4 bg-gradient-to-br from-[var(--color-light-blue)]/20 to-transparent rounded-full blur-xl"></div>
                
                {/* Icon container */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10"
                >
                  <Car className="w-28 h-28 text-white/40" strokeWidth={1.5} />
                </motion.div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[var(--color-light-blue)]/60 rounded-full"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${15 + i * 12}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

