import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Car, Search, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/date-picker";
import { AnimatedText } from "@/components/animated-text";

const AnimatedLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Label
    className={cn(
      "text-xs font-semibold text-[var(--color-dark-blue)]/70 uppercase tracking-wider pl-1",
      className
    )}
  >
    <AnimatedText>{children}</AnimatedText>
  </Label>
);

const LocationInput = ({
  value,
  onChange,
  placeholder,
  label,
  iconColor = "dark-blue",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  iconColor?: "dark-blue" | "light-blue";
}) => {
  const bgColor =
    iconColor === "dark-blue"
      ? "bg-[var(--color-dark-blue)]/10"
      : "bg-[var(--color-light-blue)]/10";
  const hoverBgColor =
    iconColor === "dark-blue"
      ? "group-focus-within:bg-[var(--color-dark-blue)]/20"
      : "group-focus-within:bg-[var(--color-light-blue)]/20";
  const textColor =
    iconColor === "dark-blue"
      ? "text-[var(--color-dark-blue)]"
      : "text-[var(--color-light-blue)]";

  return (
    <div className="space-y-1.5 relative z-10">
      <AnimatedLabel>{label}</AnimatedLabel>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
              bgColor,
              hoverBgColor
            )}
          >
            <MapPin
              className={cn(
                "h-4 w-4 transition-colors",
                textColor,
                "group-focus-within:text-[var(--color-dark-blue)]"
              )}
            />
          </div>
        </div>
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(INPUT_BASE_CLASSES, "pl-12 h-11")}
        />
      </div>
    </div>
  );
};

const TabContent = ({
  isActive,
  icon: Icon,
  title,
  description,
  iconBgActive,
  iconTextActive,
}: {
  isActive: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgActive: string;
  iconTextActive: string;
}) => (
  <div className="flex items-center gap-3 w-full justify-center">
    <div
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
        isActive
          ? `${iconBgActive} ${iconTextActive}`
          : "bg-transparent text-slate-400"
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex flex-col items-start text-left">
      <AnimatedText
        className={cn(
          "font-bold text-sm transition-colors duration-300",
          isActive ? "text-[var(--color-dark-blue)]" : "text-slate-500"
        )}
      >
        {title}
      </AnimatedText>
      <AnimatedText
        className={cn(
          "text-[10px] font-medium transition-colors duration-300",
          isActive ? "text-[var(--color-dark-blue)]/70" : "text-slate-400"
        )}
      >
        {description}
      </AnimatedText>
    </div>
  </div>
);

// Constants
const INPUT_BASE_CLASSES = cn(
  "rounded-xl transition-all duration-200",
  "bg-white/50 border-[var(--color-light-blue)]/30",
  "hover:bg-white/80 hover:border-[var(--color-light-blue)]/50",
  "focus-visible:ring-0 focus-visible:ring-offset-0",
  "focus:border-[var(--color-dark-blue)] focus:bg-white"
);

function LandingHero() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [bookingType, setBookingType] = useState<"carpool" | "private">(
    "carpool"
  );

  // Form State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [seats, setSeats] = useState("1");

  const handleFindTrip = useCallback(() => {
    const dateString = selectedDate
      ? (() => {
          const [hours, minutes] = selectedTime.split(":");
          const dateTime = new Date(selectedDate);
          dateTime.setHours(parseInt(hours, 10));
          dateTime.setMinutes(parseInt(minutes, 10));
          return format(dateTime, "yyyy-MM-dd'T'HH:mm");
        })()
      : "";

    const params = new URLSearchParams({
      type: bookingType,
      from,
      to,
      date: dateString,
      seats,
    });
    navigate(`/search?${params.toString()}`);
  }, [navigate, bookingType, from, to, selectedDate, selectedTime, seats]);

  const highlightTitle = useMemo(() => {
    const title =
      t("hero.title") ||
      "Smart Inter-Provincial Travel – Intelligent Carpooling, Cost Savings";
    const parts = title.split(
      /(Smart|Intelligent|Cost Savings|Thông minh|Tiết kiệm)/gi
    );
    return parts.map((part, index) => {
      const isHighlight =
        /^(Smart|Intelligent|Cost Savings|Thông minh|Tiết kiệm)$/i.test(part);
      return isHighlight ? (
        <span
          key={index}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dark-blue)] to-[var(--color-light-blue)]"
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  }, [t]);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-12 md:py-24">
      {/* --- 1. BACKGROUND --- */}
      {/* Nền Gradient từ brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cream)] via-[var(--color-light-blue)]/30 to-white -z-20" />

      {/* Họa tiết Noise (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10" />

      {/* Blobs trang trí phía sau */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-dark-blue)]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-light-blue)]/25 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* --- 2. LEFT CONTENT (TEXT) --- */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-light-blue)]/30 border border-[var(--color-light-blue)]/50 text-[var(--color-dark-blue)] text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-dark-blue)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-dark-blue)]"></span>
              </span>
              <AnimatedText>{t("hero.badge")}</AnimatedText>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-text-dark)] tracking-tight mb-6 leading-[1.1]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={t("hero.title")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {highlightTitle}
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-dark-blue)]/80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <AnimatedText>
                {t("hero.subtitle") ||
                  "Kết nối hành khách với hàng ngàn chuyến xe tiện chuyến mỗi ngày. Đặt xe dễ dàng, giá rẻ hơn 40% so với taxi truyền thống."}
              </AnimatedText>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-dark-blue)]/90 text-white shadow-lg shadow-[var(--color-dark-blue)]/30 px-8 h-12 text-base"
              >
                <AnimatedText>{t("hero.downloadApp")}</AnimatedText>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-[var(--color-light-blue)]/50 text-[var(--color-dark-blue)] hover:bg-[var(--color-cream)] px-8 h-12 text-base"
              >
                <AnimatedText className="flex items-center">
                  {t("hero.learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedText>
              </Button>
            </div>
          </motion.div>

          {/* --- 3. RIGHT CONTENT (BOOKING WIDGET) --- */}
          <motion.div
            className="lg:col-span-5 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {/* GLASS CARD CONTAINER */}
            <Card className="border-0 shadow-2xl bg-white/40 backdrop-blur-2xl border-white/30 p-6 md:p-8 rounded-[2rem] ring-1 ring-white/40 relative overflow-hidden">
              {/* Hiệu ứng ánh sáng phản chiếu trên bề mặt kính */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              {/* --- LIQUID TABS SELECTION --- */}
              <Tabs
                value={bookingType}
                onValueChange={(value) =>
                  setBookingType(value as "carpool" | "private")
                }
                className="w-full mb-8"
              >
                {/* Container Tabs: Tạo rãnh sâu (Deep Groove) */}
                <TabsList className="grid w-full grid-cols-2 bg-[var(--color-dark-blue)]/5 backdrop-blur-sm p-1.5 rounded-full h-auto border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] relative">
                  {/* ANIMATED BACKGROUND PILL */}
                  {/* Đây là phần tạo hiệu ứng Liquid trượt qua lại */}
                  <motion.div
                    layoutId="activeTabLiquid"
                    className={cn(
                      "absolute top-[6px] bottom-[6px] rounded-full bg-white shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] ring-1 ring-black/5 z-0",
                      bookingType === "carpool"
                        ? "left-[6px] right-[50%]"
                        : "left-[50%] right-[6px]"
                    )}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />

                  <TabsTrigger
                    value="carpool"
                    className="rounded-full px-4 py-3 transition-colors duration-300 relative z-10 data-[state=active]:bg-transparent hover:bg-transparent"
                  >
                    <TabContent
                      isActive={bookingType === "carpool"}
                      icon={Users}
                      title={t("hero.bookingWidget.carpoolTab")}
                      description={t("hero.bookingWidget.carpoolTabDesc")}
                      iconBgActive="bg-[var(--color-light-blue)]/20"
                      iconTextActive="text-[var(--color-dark-blue)]"
                    />
                  </TabsTrigger>

                  <TabsTrigger
                    value="private"
                    className="rounded-full px-4 py-3 transition-colors duration-300 relative z-10 data-[state=active]:bg-transparent hover:bg-transparent"
                  >
                    <TabContent
                      isActive={bookingType === "private"}
                      icon={Car}
                      title={t("hero.bookingWidget.privateTab")}
                      description={t("hero.bookingWidget.privateTabDesc")}
                      iconBgActive="bg-blue-100"
                      iconTextActive="text-blue-700"
                    />
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* UNIFIED FORM (Gộp form lại để code gọn hơn) */}
              <div className="space-y-5">
                {/* Location Inputs Group */}
                <div className="space-y-4 relative">
                  {/* Hiệu ứng tinh tế thay thế đường nối - Animation pulse giữa 2 icon */}
                  <motion.div
                    className="absolute left-[19px] top-[44px] bottom-[44px] w-[2px] z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="h-full w-full bg-gradient-to-b from-[var(--color-dark-blue)]/20 via-[var(--color-light-blue)]/30 to-transparent"></div>
                  </motion.div>

                  <LocationInput
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder={t("hero.bookingWidget.fromPlaceholder")}
                    label={t("hero.bookingWidget.from")}
                    iconColor="dark-blue"
                  />
                  <LocationInput
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={t("hero.bookingWidget.toPlaceholder")}
                    label={t("hero.bookingWidget.to")}
                    iconColor="light-blue"
                  />
                </div>

                {/* Date & Time Group */}
                <div className="space-y-1.5">
                  <AnimatedLabel>{t("hero.bookingWidget.date")}</AnimatedLabel>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <DatePicker
                        date={selectedDate}
                        onSelect={setSelectedDate}
                        placeholder={t("hero.bookingWidget.datePlaceholder")}
                        locale={i18n.language === "vi" ? "vi" : "en"}
                        className="space-y-0"
                      />
                    </div>
                    <div className="relative group flex-1">
                      <Input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        step="1"
                        className={cn(
                          INPUT_BASE_CLASSES,
                          "h-11 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Seats Group */}
                <div className="space-y-1.5">
                  <AnimatedLabel>{t("hero.bookingWidget.seats")}</AnimatedLabel>
                  <div className="relative group">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-[var(--color-light-blue)] group-focus-within:text-[var(--color-dark-blue)] transition-colors" />
                    <Input
                      type="number"
                      min="1"
                      max="7"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className={cn(INPUT_BASE_CLASSES, "pl-10 h-11")}
                    />
                  </div>
                </div>

                {/* --- BUTTON TÌM KIẾM: STYLE LIQUID GLOW --- */}
                <div className="mt-6 group relative">
                  {/* Lớp Glow phía sau (Tạo hiệu ứng phát sáng lan toả) */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-dark-blue)] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  
                  <Button
                    onClick={handleFindTrip}
                    size="lg"
                    className={cn(
                      "relative w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300 overflow-hidden",
                      // Nền Gradient chính - Sử dụng màu theme của project
                      "bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-dark-blue)]",
                      "text-white",
                      // Hiệu ứng Hover: Nổi lên và bóng đậm hơn
                      "hover:shadow-[0_8px_25px_-5px_rgba(74,112,169,0.4)] hover:-translate-y-0.5 hover:scale-[1.01]",
                      // Viền sáng nhẹ ở trên đầu tạo khối 3D
                      "border-t border-white/20"
                    )}
                  >
                    {/* Hiệu ứng ánh sáng lướt qua (Shimmer) khi hover */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />
                    <div className="relative flex items-center gap-2">
                      <Search className="h-5 w-5 stroke-[2.5]" />
                      <AnimatedText>
                        {bookingType === "carpool"
                          ? t("hero.bookingWidget.findTrip")
                          : t("hero.bookingWidget.findPrivateTrip")}
                      </AnimatedText>
                    </div>
                  </Button>
                </div>

                {/* --- TRUST BADGE (Dòng chữ nhỏ bên dưới) --- */}
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/50 shadow-sm backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 tracking-wide">
                      <AnimatedText>
                        {t("hero.bookingWidget.trustBadge") || "Hơn 1,000+ chuyến xe mỗi ngày"}
                      </AnimatedText>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
