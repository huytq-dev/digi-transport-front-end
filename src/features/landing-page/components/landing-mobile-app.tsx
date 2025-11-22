import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Navigation, Star, Car } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';

function LandingMobileApp() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden bg-white" aria-label="Mobile app">
      {/* Background Layers */}
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)]/20 via-white to-white -z-20" />

      {/* Gradient Glow behind phone */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(143, 171, 212, 0.3)' }}
      />
      <motion.div
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(74, 112, 169, 0.2)' }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-dark-blue)]"
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
                  "inline-flex items-center gap-2 px-3 py-1 text-sm font-medium mb-6 shadow-sm",
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
                Mobile App
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-[var(--color-dark-blue)]"
            >
              <AnimatedText>{t('mobileApp.title')}</AnimatedText>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl mb-10 text-gray-600 leading-relaxed max-w-lg"
            >
              <AnimatedText>{t('mobileApp.subtitle')}</AnimatedText>
            </motion.p>

            {/* Download Buttons Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {/* Google Play Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-14 px-6 bg-white text-[var(--color-dark-blue)] hover:bg-white/90 border-0 rounded-xl flex items-center gap-3 shadow-lg transition-all"
                  onClick={() => window.open('https://play.google.com/store', '_blank')}
                >
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold tracking-wide opacity-70">Get it on</div>
                    <div className="text-base font-bold leading-none">Google Play</div>
                  </div>
                </Button>
              </motion.div>

              {/* App Store Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-14 px-6 bg-[var(--color-light-blue)]/10 backdrop-blur-md border border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/20 rounded-xl flex items-center gap-3 shadow-lg transition-all"
                  onClick={() => window.open('https://apps.apple.com', '_blank')}
                >
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05,20.28L14.18,17.41C13.32,18.35 12.2,19 11,19A6,6 0 0,1 5,13C5,11.8 5.65,10.68 6.59,9.82L3.72,6.95C2.25,8.27 1.39,10.16 1.39,12.25C1.39,16.04 4.36,19.11 8.15,19.11C10.24,19.11 12.13,18.25 13.45,16.78M19.96,6.7C19.96,2.91 16.89,-0.06 13.1,-0.06C11,-0.06 9.11,0.8 7.78,2.27L10.65,5.14C11.51,4.2 12.63,3.55 13.83,3.55A6,6 0 0,1 19.83,9.55C19.83,10.75 19.18,11.87 18.24,12.73L21.11,15.6C22.59,14.27 23.45,12.38 23.45,10.29C23.45,8.2 22.59,6.31 21.11,5L19.96,6.7Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold tracking-wide opacity-70">Download on the</div>
                    <div className="text-base font-bold leading-none">App Store</div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Glass QR Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-4 p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-[var(--color-light-blue)]/20 shadow-sm"
            >
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <QrCode className="h-16 w-16 text-[var(--color-dark-blue)]" />
              </div>
              <div className="pr-4">
                <p className="text-sm font-semibold text-[var(--color-dark-blue)]">
                  <AnimatedText>{t('mobileApp.scanQR')}</AnimatedText>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('mobileApp.platforms')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D PHONE MOCKUP */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
              {/* PHONE FRAME */}
              <div className="relative w-[300px] h-[600px] bg-[var(--color-dark-blue)] rounded-[3rem] border-[8px] border-black/50 shadow-2xl ring-1 ring-white/20 overflow-hidden">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-20" />

                {/* Screen Content */}
                <div className="w-full h-full bg-white relative flex flex-col">
                  {/* App Header */}
                  <div className="pt-10 pb-4 px-6 bg-white shadow-sm z-10">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 bg-[var(--color-light-blue)]/20 px-3 py-1 rounded-full">
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-green-500 rounded-full"
                        />
                        <span className="text-xs font-bold text-[var(--color-dark-blue)]">Online</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[var(--color-light-blue)]/20 border border-[var(--color-light-blue)]/30" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-dark-blue)]">Xin chào, Khách hàng!</h3>
                    <p className="text-xs text-gray-500">Bạn muốn đi đâu hôm nay?</p>
                  </div>

                  {/* App Map Simulation */}
                  <div className="flex-1 bg-[var(--color-light-blue)]/10 relative overflow-hidden">
                    {/* Map Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Route Path */}
                    <svg className="absolute top-0 left-0 w-full h-full z-0" style={{ opacity: 0.3 }}>
                      <path
                        d="M50 100 Q 150 200 250 350 T 150 500"
                        stroke="var(--color-dark-blue)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="10 5"
                      />
                    </svg>

                    {/* Floating Elements on Screen */}
                    <motion.div
                      className="absolute top-[25%] left-[20%] p-2 bg-white rounded-xl shadow-lg flex items-center gap-2 z-10"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="bg-[var(--color-dark-blue)] p-1.5 rounded-lg text-white">
                        <Navigation className="h-3 w-3" />
                      </div>
                      <div className="text-[10px] font-bold text-[var(--color-dark-blue)]">Đang đến...</div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-[30%] right-[10%] p-3 bg-white rounded-2xl shadow-xl z-10 w-40"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-[var(--color-light-blue)]/20 p-1.5 rounded-lg">
                          <Car className="h-4 w-4 text-[var(--color-dark-blue)]" />
                        </div>
                        <div className="flex text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-[10px] text-gray-600 ml-1">4.9</span>
                        </div>
                      </div>
                      <div className="h-1.5 w-20 bg-gray-100 rounded-full mb-1">
                        <div className="h-full w-12 bg-[var(--color-dark-blue)] rounded-full" />
                      </div>
                      <div className="text-[10px] text-gray-400">Toyota Innova • 30A-123.45</div>
                    </motion.div>
                  </div>

                  {/* App Bottom Nav */}
                  <div className="h-16 bg-white border-t border-gray-100 flex justify-around items-center px-2">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)] flex items-center justify-center">
                      <Navigation className="h-5 w-5" />
                    </div>
                    <div className="w-10 h-10 rounded-xl text-gray-300 flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-200 rounded-md" />
                    </div>
                    <div className="w-10 h-10 rounded-xl text-gray-300 flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-200 rounded-md" />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-[var(--color-dark-blue)] rounded-full opacity-20" />
                </div>
              </div>

              {/* Shadow under phone */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[250px] h-[20px] bg-black/30 blur-xl rounded-[100%]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMobileApp;

