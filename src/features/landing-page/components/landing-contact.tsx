import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";

// --- STYLES CONSTANTS ---
const GLASS_INPUT_CLASSES = cn(
  "h-12 rounded-xl transition-all duration-200",
  "bg-white/70 border-white/50 shadow-sm backdrop-blur-sm",
  "hover:bg-white/90 hover:border-[var(--color-light-blue)]/50 hover:shadow-md",
  "focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)]/20 focus-visible:ring-offset-0",
  "focus:border-[var(--color-dark-blue)] focus:bg-white focus:shadow-md",
  "text-[var(--color-dark-blue)] placeholder:text-gray-400"
);

const LABEL_CLASSES = "text-xs font-bold text-gray-600 uppercase tracking-wider pl-1";

// Contact info
interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  contentKey: string;
  subContentKey: string;
  href?: string;
  color: string;
  bg: string;
}

const CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: Phone,
    title: "contact.info.phone.title",
    contentKey: "contact.info.phone.content",
    subContentKey: "contact.info.phone.subContent",
    href: "tel:19001234",
    color: "text-[var(--color-dark-blue)]",
    bg: "bg-[var(--color-light-blue)]/20",
  },
  {
    icon: Mail,
    title: "contact.info.email.title",
    contentKey: "contact.info.email.content",
    subContentKey: "contact.info.email.subContent",
    href: "mailto:support@digitransport.com",
    color: "text-[var(--color-dark-blue)]",
    bg: "bg-[var(--color-light-blue)]/20",
  },
  {
    icon: MapPin,
    title: "contact.info.address.title",
    contentKey: "contact.info.address.content",
    subContentKey: "contact.info.address.subContent",
    href: "https://maps.google.com/?q=Đà+Nẵng,+Việt+Nam",
    color: "text-[var(--color-dark-blue)]",
    bg: "bg-[var(--color-light-blue)]/20",
  },
  {
    icon: Clock,
    title: "contact.info.hours.title",
    contentKey: "contact.info.hours.content",
    subContentKey: "contact.info.hours.subContent",
    color: "text-[var(--color-dark-blue)]",
    bg: "bg-[var(--color-light-blue)]/20",
  },
];

// Zod schema
const createFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, {
        message: t("contact.form.validation.name.min") || "Tên phải có ít nhất 2 ký tự",
      })
      .max(50, {
        message: t("contact.form.validation.name.max") || "Tên không được quá 50 ký tự",
      }),
    phone: z
      .string()
      .regex(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
        message: t("contact.form.validation.phone") || "Số điện thoại không hợp lệ.",
      })
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .min(1, {
        message: t("contact.form.validation.email.required") || "Email là bắt buộc",
      })
      .email({
        message: t("contact.form.validation.email.invalid") || "Email không hợp lệ",
      }),
    subject: z
      .string()
      .min(1, {
        message: t("contact.form.validation.subject") || "Vui lòng chọn chủ đề",
      }),
    message: z
      .string()
      .min(10, {
        message: t("contact.form.validation.message.min") || "Tin nhắn quá ngắn",
      })
      .max(1000, {
        message: t("contact.form.validation.message.max") || "Tin nhắn quá dài",
      }),
  });

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  onReset: () => void;
}

function ContactForm({
  onSubmit,
  isSubmitting,
  isSuccess,
  onReset,
}: ContactFormProps) {
  const { t } = useTranslation();
  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const subjectValue = watch("subject");

  useEffect(() => {
    const timer = setTimeout(() => {
      const nameInput = document.getElementById("contact-name");
      if (nameInput && !isSuccess) {
        nameInput.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      const timer = setTimeout(() => {
        onReset();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset, onReset]);

  const onSubmitForm = async (data: FormData) => {
    await onSubmit(data);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
        className="flex flex-col items-center justify-center py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 mx-auto drop-shadow-lg" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-2 text-center">
          <AnimatedText>
            {t("contact.form.successTitle") || "Gửi thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-xs mx-auto">
          <AnimatedText>{t("contact.form.successMessage")}</AnimatedText>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 py-2"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        duration: 0.4,
        bounce: 0.2,
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className={LABEL_CLASSES}>
            <AnimatedText>{t("contact.form.name")}</AnimatedText>
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="contact-name"
            {...register("name")}
            className={cn(
              GLASS_INPUT_CLASSES,
              errors.name && "border-red-500 bg-red-50/50 focus:border-red-500"
            )}
            placeholder={t("contact.form.placeholders.name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone" className={LABEL_CLASSES}>
            <AnimatedText>{t("contact.form.phone")}</AnimatedText>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            {...register("phone")}
            className={cn(
              GLASS_INPUT_CLASSES,
              errors.phone && "border-red-500 bg-red-50/50 focus:border-red-500"
            )}
            placeholder={t("contact.form.placeholders.phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email" className={LABEL_CLASSES}>
          <AnimatedText>{t("contact.form.email")}</AnimatedText>
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="contact-email"
          type="email"
          {...register("email")}
          className={cn(
            GLASS_INPUT_CLASSES,
            errors.email && "border-red-500 bg-red-50/50 focus:border-red-500"
          )}
          placeholder={t("contact.form.placeholders.email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className={LABEL_CLASSES}>
          <AnimatedText>{t("contact.form.subject")}</AnimatedText>
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={subjectValue}
          onValueChange={(value) => setValue("subject", value)}
        >
          <SelectTrigger
            id="contact-subject"
            className={cn(
              GLASS_INPUT_CLASSES,
              errors.subject && "border-red-500 bg-red-50/50 focus:border-red-500"
            )}
          >
            <SelectValue placeholder={t("contact.form.selectSubject")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="booking">{t("contact.form.options.booking")}</SelectItem>
            <SelectItem value="partnership">{t("contact.form.options.partnership")}</SelectItem>
            <SelectItem value="support">{t("contact.form.options.support")}</SelectItem>
            <SelectItem value="other">{t("contact.form.options.other")}</SelectItem>
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className={LABEL_CLASSES}>
          <AnimatedText>{t("contact.form.message")}</AnimatedText>
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea
          id="contact-message"
          {...register("message")}
          rows={4}
          className={cn(
            GLASS_INPUT_CLASSES,
            "resize-none pt-3",
            errors.message && "border-red-500 bg-red-50/50 focus:border-red-500"
          )}
          placeholder={t("contact.form.placeholders.message")}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1 font-medium ml-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className={cn(
          "w-full h-12 text-base font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98]",
          "bg-gradient-to-r from-[var(--color-dark-blue)] to-[#3a5a8a]",
          "hover:shadow-xl hover:shadow-[var(--color-dark-blue)]/20",
          "text-white disabled:opacity-70 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <AnimatedText>{t("contact.form.sending")}</AnimatedText>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            <AnimatedText>{t("contact.form.submit")}</AnimatedText>
          </span>
        )}
      </Button>
    </motion.form>
  );
}

function LandingContact() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = useCallback(
    async (_data: FormData) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success(t("contact.form.successMessage"), {
          description:
            t("contact.form.successSubtext") ||
            "Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.",
          duration: 5000,
        });
        setIsSuccess(true);
      } catch (error) {
        toast.error(
          t("contact.form.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [t]
  );

  const handleReset = useCallback(() => {
    setIsSuccess(false);
    setOpen(false);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) setIsSuccess(false);
  }, []);

  const ContactButton = (
    <Button
      size="lg"
      className={cn(
        "h-12 px-6 md:px-8 rounded-xl text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95",
        "bg-[var(--color-dark-blue)] hover:bg-[rgba(74,112,169,0.9)] text-white",
        "shadow-[var(--color-dark-blue)]/20",
        "group relative overflow-hidden" // Thêm hiệu ứng cho nút
      )}
    >
      {/* Hiệu ứng loang sáng nhẹ khi hover */}
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
      <MessageCircle className="h-5 w-5 mr-2 relative z-10" />
      <AnimatedText className="relative z-10">{t("contact.form.title")}</AnimatedText>
    </Button>
  );

  return (
    <>
      <section
        id="contact"
        // CẬP NHẬT: Thêm pattern background lưới mờ để tạo chiều sâu (Grid Pattern)
        className="relative py-16 md:py-24 overflow-hidden bg-gray-50"
        aria-label="Contact"
      >
        {/* --- BACKGROUND PATTERN --- */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
             {/* Pattern Grid Kỹ thuật số */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
             {/* Gradient phủ mờ để grid không quá gắt ở viền */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
        </div>

        {/* Blobs trang trí (giữ nguyên nhưng chỉnh opacity) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[var(--color-light-blue)]/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-cream)]/30 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section - Thêm tiêu đề nhỏ dẫn dắt */}
          <div className="text-center mb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-dark-blue)]/5 border border-[var(--color-dark-blue)]/10 text-[var(--color-dark-blue)] text-sm font-semibold mb-4"
            >
                 <Sparkles className="w-4 h-4" />
                 <AnimatedText>{t("contact.supportBadge")}</AnimatedText>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-[var(--color-dark-blue)]"
            >
                <AnimatedText>{t("contact.title") || "Liên hệ với chúng tôi"}</AnimatedText>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-10 rounded-[2rem]",
              // CẬP NHẬT STYLE CARD: Tăng độ nổi khối
              "bg-gradient-to-br from-white/80 via-white/60 to-white/40", // Gradient chéo nhẹ
              "backdrop-blur-xl",
              "border border-white/60",
              "shadow-[0_8px_30px_rgba(0,0,0,0.06)]", // Bóng đổ mềm và sâu hơn
              "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500" // Hiệu ứng hover nhẹ
            )}
          >
            {/* Contact Info - Grid giữ nguyên nhưng chỉnh margin */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 flex-1 w-full">
              {CONTACT_INFO.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-3 min-w-0 group"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300",
                        "bg-white/80 backdrop-blur-md border border-white/60",
                        "group-hover:scale-110 group-hover:bg-white group-hover:shadow-md" // Icon nảy lên khi hover
                      )}
                    >
                      <Icon className={cn("h-6 w-6", info.color)} />
                    </div>
                    <div className="min-w-0 w-full space-y-1.5">
                      {info.href ? (
                        <a
                          href={info.href}
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-base font-bold text-[var(--color-dark-blue)] hover:text-[#3a5a8a] transition-colors block leading-tight"
                        >
                          {t(info.contentKey)}
                        </a>
                      ) : (
                        <p className="text-base font-bold text-[var(--color-dark-blue)] leading-tight">
                          {t(info.contentKey)}
                        </p>
                      )}
                      <p className="text-sm font-medium text-gray-500 leading-snug">
                        {t(info.subContentKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button Area */}
            <div className="flex-shrink-0 pt-4 lg:pt-0">
                {isMobile ? (
                <Drawer open={open} onOpenChange={handleOpenChange}>
                    <DrawerTrigger asChild>{ContactButton}</DrawerTrigger>
                    <DrawerContent className="max-h-[90vh] bg-white/95 backdrop-blur-2xl border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold text-[var(--color-dark-blue)]">
                        <AnimatedText>{t("contact.form.title")}</AnimatedText>
                        </DrawerTitle>
                        <DrawerDescription>
                        <AnimatedText>{t("contact.subtitle")}</AnimatedText>
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-6 pb-6 overflow-y-auto">
                        <ContactForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isSuccess={isSuccess}
                        onReset={handleReset}
                        />
                    </div>
                    </DrawerContent>
                </Drawer>
                ) : (
                <Dialog open={open} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>{ContactButton}</DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl sm:rounded-[2rem] p-0">
                    <div className="p-8 md:p-10">
                        <DialogHeader className="mb-6 text-center">
                        <DialogTitle className="text-3xl font-extrabold text-[var(--color-dark-blue)] tracking-tight">
                            <AnimatedText>{t("contact.form.title")}</AnimatedText>
                        </DialogTitle>
                        <DialogDescription className="text-base font-medium text-gray-500 mt-2">
                            <AnimatedText>{t("contact.subtitle")}</AnimatedText>
                        </DialogDescription>
                        </DialogHeader>
                        <ContactForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isSuccess={isSuccess}
                        onReset={handleReset}
                        />
                    </div>
                    </DialogContent>
                </Dialog>
                )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default LandingContact;