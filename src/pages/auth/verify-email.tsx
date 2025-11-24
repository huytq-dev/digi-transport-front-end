import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowLeft, Mail } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AnimatedText } from "@/components/animated-text";
import { Button } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/features/auth/auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/Common/common.type";
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage(
        t("auth.verifyEmail.invalidToken") || "Token không hợp lệ hoặc không tồn tại"
      );
      return;
    }

    // Gọi API verify email
    const verify = async () => {
      try {
        const response = await verifyEmail({ Token: token }).unwrap();

        if (isApiResponseSuccess(response)) {
          setStatus("success");
          toast.success(
            t("auth.verifyEmail.successTitle") || "Xác nhận email thành công!",
            {
              description:
                t("auth.verifyEmail.successMessage") ||
                "Email của bạn đã được xác nhận thành công.",
            }
          );
        } else {
          setStatus("error");
          const errorMsg = getApiErrorMessage(response);
          setErrorMessage(errorMsg);
          toast.error(
            t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại",
            {
              description: errorMsg,
            }
          );
        }
      } catch (error: unknown) {
        setStatus("error");
        const errorMsg =
          error && typeof error === "object" && "data" in error
            ? getApiErrorMessage(error.data as any)
            : t("auth.verifyEmail.errorMessage") ||
              "Có lỗi xảy ra. Vui lòng thử lại sau.";
        setErrorMessage(errorMsg);
        toast.error(
          t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại",
          {
            description: errorMsg,
          }
        );
      }
    };

    verify();
  }, [searchParams, verifyEmail, t]);

  return (
    <AuthLayout>
      {/* Glass Card */}
      <motion.div
        className={cn(
          "w-full max-w-md",
          "bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg",
          "rounded-2xl p-8 sm:p-10",
          "hover:shadow-xl transition-all duration-300"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.2,
        }}
      >
        {/* Loading State */}
        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <Loader2 className="w-16 h-16 animate-spin text-[var(--color-dark-blue)] mb-6" />
            <h3 className="text-xl font-bold text-[var(--color-dark-blue)] mb-2">
              <AnimatedText>
                {t("auth.verifyEmail.verifying") || "Đang xác nhận email..."}
              </AnimatedText>
            </h3>
            <p className="text-sm text-gray-600 text-center">
              <AnimatedText>
                {t("auth.verifyEmail.verifyingMessage") ||
                  "Vui lòng đợi trong giây lát"}
              </AnimatedText>
            </p>
          </motion.div>
        )}

        {/* Success State */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto drop-shadow-lg" />
            </motion.div>
            <h3 className="text-2xl font-bold text-[var(--color-dark-blue)] mb-3 text-center">
              <AnimatedText>
                {t("auth.verifyEmail.successTitle") || "Xác nhận email thành công!"}
              </AnimatedText>
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-sm mx-auto leading-relaxed">
              <AnimatedText>
                {t("auth.verifyEmail.successMessage") ||
                  "Email của bạn đã được xác nhận thành công. Bạn có thể đăng nhập ngay bây giờ."}
              </AnimatedText>
            </p>
            <Button
              onClick={() => navigate("/auth/sign-in")}
              className="bg-[var(--color-dark-blue)] text-white"
            >
              <AnimatedText>
                {t("auth.verifyEmail.goToSignIn") || "Đi đến đăng nhập"}
              </AnimatedText>
            </Button>
          </motion.div>
        )}

        {/* Error State */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <XCircle className="w-20 h-20 text-red-500 mb-6 mx-auto drop-shadow-lg" />
            </motion.div>
            <h3 className="text-2xl font-bold text-red-500 mb-3 text-center">
              <AnimatedText>
                {t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại"}
              </AnimatedText>
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-sm mx-auto leading-relaxed">
              <AnimatedText>{errorMessage}</AnimatedText>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={() => navigate("/auth/sign-in")}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <AnimatedText>
                  {t("auth.verifyEmail.backToSignIn") || "Quay lại đăng nhập"}
                </AnimatedText>
              </Button>
              <Button
                onClick={() => navigate("/auth/sign-up")}
                className="w-full sm:w-auto bg-[var(--color-dark-blue)] text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                <AnimatedText>
                  {t("auth.verifyEmail.resendEmail") || "Đăng ký lại"}
                </AnimatedText>
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AuthLayout>
  );
}

