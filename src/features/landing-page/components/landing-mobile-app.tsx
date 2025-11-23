import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Navigation, Star, Car, Smartphone, Map } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { SmoothWrapper } from "@/components/smooth-wrapper";

function LandingMobileApp() {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-24 overflow-hidden bg-white"
      aria-label="Mobile app"
    >
      {/* --- Background Layers --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-cream)]/10 to-white -z-20" />

      {/* Grid Pattern mờ để tạo chiều sâu không gian */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-light-blue)]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-dark-blue)]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-dark-blue)]"
          >
            {/* Badge: Glass style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6"
            >
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium shadow-sm bg-white/80 backdrop-blur-md border-[var(--color-light-blue)]/30 text-[var(--color-dark-blue)] rounded-full"
              >
                <Smartphone className="w-4 h-4 text-[var(--color-light-blue)]" />
                <AnimatedText>Mobile App</AnimatedText>
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.15] tracking-tight"
            >
              <SmoothWrapper className="inline-block">
                <AnimatedText>{t("mobileApp.title")}</AnimatedText>
              </SmoothWrapper>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed max-w-lg"
            >
              <AnimatedText>{t("mobileApp.subtitle")}</AnimatedText>
            </motion.p>

            {/* Download Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Google Play */}
              <Button
                size="lg"
                className="h-14 px-6 rounded-xl bg-[var(--color-dark-blue)] text-white hover:bg-[var(--color-dark-blue)]/90 shadow-lg shadow-[var(--color-dark-blue)]/20 transition-all hover:-translate-y-1 flex items-center gap-3"
                onClick={() =>
                  window.open("https://play.google.com/store", "_blank")
                }
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-70 leading-none mb-0.5">
                    Get it on
                  </div>
                  <div className="text-sm font-bold leading-none">
                    Google Play
                  </div>
                </div>
              </Button>

              {/* App Store */}
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-6 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[var(--color-dark-blue)] transition-all hover:-translate-y-1 flex items-center gap-3 shadow-sm"
                onClick={() => window.open("https://apps.apple.com", "_blank")}
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.05,20.28L14.18,17.41C13.32,18.35 12.2,19 11,19A6,6 0 0,1 5,13C5,11.8 5.65,10.68 6.59,9.82L3.72,6.95C2.25,8.27 1.39,10.16 1.39,12.25C1.39,16.04 4.36,19.11 8.15,19.11C10.24,19.11 12.13,18.25 13.45,16.78M19.96,6.7C19.96,2.91 16.89,-0.06 13.1,-0.06C11,-0.06 9.11,0.8 7.78,2.27L10.65,5.14C11.51,4.2 12.63,3.55 13.83,3.55A6,6 0 0,1 19.83,9.55C19.83,10.75 19.18,11.87 18.24,12.73L21.11,15.6C22.59,14.27 23.45,12.38 23.45,10.29C23.45,8.2 22.59,6.31 21.11,5L19.96,6.7Z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-70 leading-none mb-0.5">
                    Download on the
                  </div>
                  <div className="text-sm font-bold leading-none">
                    App Store
                  </div>
                </div>
              </Button>
            </motion.div>

            {/* QR Code Block: Giữ nguyên layout nhưng thêm Glassmorphism nhẹ */}
            <motion.div
              className="inline-flex items-center gap-4 p-1.5 pr-6 rounded-2xl bg-white/60 border border-white/60 shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                <QrCode className="w-12 h-12 text-[var(--color-dark-blue)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-dark-blue)]">
                  <AnimatedText>{t("mobileApp.scanQR")}</AnimatedText>
                </p>
                <p className="text-xs text-gray-500">iOS & Android</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT: PREMIUM PHONE MOCKUP --- */}
          <div className="relative flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* PHONE FRAME: Titanium Style Border */}
                <div className="relative w-[300px] h-[600px] rounded-[3rem] bg-black shadow-2xl border-[6px] border-[#3a3a3a] ring-1 ring-white/20 overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-30" />

                  {/* Screen Shine/Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />

                  {/* Screen Content */}
                  <div className="w-full h-full bg-white relative flex flex-col">
                    {/* App Header (Glass style) */}
                    <div className="pt-12 pb-4 px-6 bg-white/90 backdrop-blur-md border-b border-gray-100 z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 bg-gray-100 px-2.5 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold text-gray-600">
                            Online
                          </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--color-light-blue)] to-[var(--color-dark-blue)]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-dark-blue)]">
                        Xin chào!
                      </h3>
                      <p className="text-xs text-gray-500">
                        Bạn muốn đi đâu hôm nay?
                      </p>
                    </div>

                    {/* Map Simulation */}
                    <div className="flex-1 bg-slate-50 relative overflow-hidden">
                      {/* Map Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />

                      {/* Map Decoration */}
                      <Map className="absolute -right-10 top-20 w-40 h-40 text-gray-200/50 rotate-12" />

                      {/* Route Path Animation */}
                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0"
                        style={{ opacity: 0.4 }}
                      >
                        <path
                          d="M50 150 Q 150 250 250 400"
                          stroke="var(--color-dark-blue)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8 4"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="150"
                          r="4"
                          fill="var(--color-dark-blue)"
                        />
                        <circle
                          cx="250"
                          cy="400"
                          r="4"
                          fill="var(--color-light-blue)"
                        />
                      </svg>

                      {/* Floating Notification 1: Navigation */}
                      <motion.div
                        className="absolute top-[30%] left-[15%] p-2.5 bg-white/90 backdrop-blur-md border border-white/50 rounded-xl shadow-lg flex items-center gap-3 z-10 max-w-[180px]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      >
                        <div className="bg-[var(--color-dark-blue)] p-2 rounded-lg text-white shrink-0">
                          <Navigation className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-[var(--color-dark-blue)] truncate">
                            Đang tìm tài xế...
                          </div>
                          <div className="text-[9px] text-gray-500">
                            Khoảng 2 phút
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating Notification 2: Driver Info */}
                      <motion.div
                        className="absolute bottom-[25%] right-[10%] p-3 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl z-10 w-44"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1, y: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="bg-[var(--color-light-blue)]/10 p-1.5 rounded-lg">
                            <Car className="h-4 w-4 text-[var(--color-dark-blue)]" />
                          </div>
                          <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-600">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            <span className="text-[9px] font-bold ml-1">
                              4.9
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-[var(--color-light-blue)] rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "70%" }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[9px] font-medium text-gray-500">
                            Toyota Innova
                          </div>
                          <div className="text-[9px] font-bold text-[var(--color-dark-blue)]">
                            30A-123.45
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shadow under phone */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[220px] h-[20px] bg-black/20 blur-2xl rounded-[100%]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMobileApp;
