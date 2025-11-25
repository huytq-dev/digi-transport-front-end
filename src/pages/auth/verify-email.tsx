import { useEffect, useState, useRef, useCallback } from "react";
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
import type { ApiResponse } from "@/features/Common/common.type";
import { cn } from "@/lib/utils";

type VerifyStatus = "loading" | "success" | "error";

// Helper function để log API request/response (chỉ trong development)
const logApiCall = (type: "request" | "response" | "error", data: unknown) => {
  // Chỉ log trong development mode
  if (import.meta.env.DEV || import.meta.env.MODE === "development") {
    const prefix = type === "request" ? "REQUEST" : type === "response" ? "RESPONSE" : "ERROR";
    console.log(`=== VERIFY EMAIL API ${prefix} ===`);
    if (typeof data === "object" && data !== null) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(data);
    }
    console.log("=".repeat(30));
  }
};

// Helper function để normalize response
const normalizeResponse = <T,>(response: ApiResponse<T>) => {
  const status = response.Status ?? response.status ?? 0;
  const type = (response.Type || response.type || "").toUpperCase();
  return { status, type };
};

// Helper function để xử lý success
const handleSuccess = (
  setStatus: (status: VerifyStatus) => void,
  showToast: (title: string, description: string) => void,
  t: (key: string) => string
) => {
  setStatus("success");
  showToast(
    t("auth.verifyEmail.successTitle") || "Xác nhận email thành công!",
    t("auth.verifyEmail.successMessage") || "Email của bạn đã được xác nhận thành công."
  );
};

// Helper function để xử lý error
const handleError = (
  response: ApiResponse | null | undefined,
  setStatus: (status: VerifyStatus) => void,
  setErrorMessage: (message: string) => void,
  showToast: (title: string, description: string) => void,
  t: (key: string) => string
) => {
  setStatus("error");
  const errorMsg = getApiErrorMessage(response);
  setErrorMessage(errorMsg);
  showToast(
    t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại",
    errorMsg
  );
};

// Helper function để xử lý RTK Query error
const extractErrorMessage = (error: unknown, t: (key: string) => string): string => {
  if (!error || typeof error !== "object") {
    return t("auth.verifyEmail.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";
  }

  // RTK Query error format: { data: ApiResponse, status: number }
  if ("data" in error && error.data) {
    return getApiErrorMessage(error.data as ApiResponse);
  }

  if ("error" in error && error.error) {
    if (typeof error.error === "string") {
      return error.error;
    }
    if (typeof error.error === "object" && "data" in error.error) {
      return getApiErrorMessage(error.error.data as ApiResponse);
    }
  }

  if ("status" in error) {
    const status = (error as { status: number }).status;
    if (status === 400 || status === 401 || status === 403) {
      return "Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu email xác nhận mới.";
    }
    if (status >= 500) {
      return t("auth.verifyEmail.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
    }
  }

  return t("auth.verifyEmail.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";
};

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasVerifiedRef = useRef(false);

  // Helper để hiển thị toast success
  const showSuccessToast = useCallback(
    (title: string, description: string) => {
      toast.success(title, { description });
    },
    []
  );

  // Helper để hiển thị toast error
  const showErrorToast = useCallback(
    (title: string, description: string) => {
      toast.error(title, { description });
    },
    []
  );

  // Xử lý response từ API
  const handleApiResponse = useCallback(
    (response: ApiResponse) => {
      logApiCall("response", {
        type: response.Type || response.type,
        status: response.Status ?? response.status,
        data: response.Data || response.data,
      });

      const { status: responseStatus, type: responseType } = normalizeResponse(response);

      // Priority 1: Check type field first (the most reliable indicator)
      if (responseType === "SUCCESS") {
        handleSuccess(setStatus, showSuccessToast, t);
        return;
      }

      // Priority 2: Check bằng hàm isApiResponseSuccess (fallback)
      if (isApiResponseSuccess(response)) {
        handleSuccess(setStatus, showSuccessToast, t);
        return;
      }

      // Priority 3: Status >= 400 means error
      if (responseStatus >= 400) {
        handleError(response, setStatus, setErrorMessage, showErrorToast, t);
        return;
      }

      // Fallback: treat as error if not clearly success
      handleError(response, setStatus, setErrorMessage, showErrorToast, t);
    },
    [t, showSuccessToast, showErrorToast]
  );

  // Xử lý error từ API
  const handleApiError = useCallback(
    (error: unknown) => {
      logApiCall("error", error);
      const errorMsg = extractErrorMessage(error, t);
      setStatus("error");
      setErrorMessage(errorMsg);
      showErrorToast(
        t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại",
        errorMsg
      );
    },
    [t, showErrorToast]
  );

  useEffect(() => {
    // Đảm bảo chỉ gọi API một lần
    if (hasVerifiedRef.current) {
      return;
    }

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage(
        t("auth.verifyEmail.invalidToken") || "Token không hợp lệ hoặc không tồn tại"
      );
      hasVerifiedRef.current = true;
      return;
    }

    // Đánh dấu đã bắt đầu verify
    hasVerifiedRef.current = true;

    // Gọi API verify email
    const verify = async () => {
      try {
        logApiCall("request", { Token: token });
        const response = await verifyEmail({ Token: token }).unwrap();
        handleApiResponse(response);
      } catch (error) {
        handleApiError(error);
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <AuthLayout>
      {/* Glass Card */}
      <motion.div
        className={cn(
          "w-full max-w-md mx-auto",
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
                {t("auth.verifyEmail.verifyingMessage") || "Vui lòng đợi trong giây lát"}
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
