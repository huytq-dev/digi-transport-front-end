import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../auth.schema";
import { useForgotPasswordMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/Common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  EmailField,
  SubmitButton,
} from "./shared/auth-form-components";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      Email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
        toast.success(
          t("auth.forgotPassword.successTitle") || "Email đã được gửi!",
          {
            description:
              t("auth.forgotPassword.successMessage") ||
              "Vui lòng kiểm tra email để đặt lại mật khẩu.",
          }
        );
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(
          t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
          {
            description: errorMessage,
          }
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? getApiErrorMessage(error.data as any)
          : t("auth.forgotPassword.errorMessage") ||
            "Có lỗi xảy ra. Vui lòng thử lại sau.";

      toast.error(
        t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
        {
          description: errorMessage,
        }
      );
    }
  };

  if (isSuccess) {
    return (
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
            {t("auth.forgotPassword.successTitle") || "Email đã được gửi!"}
          </AnimatedText>
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-sm mx-auto leading-relaxed">
          <AnimatedText>
            {t("auth.forgotPassword.successMessage") ||
              "Vui lòng kiểm tra email của bạn. Chúng tôi đã gửi link đặt lại mật khẩu đến địa chỉ email bạn đã cung cấp."}
          </AnimatedText>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            onClick={() => navigate("/auth/sign-in")}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <AnimatedText>
              {t("auth.forgotPassword.backToSignIn") || "Quay lại đăng nhập"}
            </AnimatedText>
          </Button>
          <Button
            onClick={() => {
              setIsSuccess(false);
            }}
            className="w-full sm:w-auto bg-[var(--color-dark-blue)] text-white"
          >
            <AnimatedText>
              {t("auth.forgotPassword.resendEmail") || "Gửi lại email"}
            </AnimatedText>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Description */}
      <motion.div className="mb-6" variants={itemVariants}>
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          <AnimatedText>
            {t("auth.forgotPassword.description") ||
              "Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn."}
          </AnimatedText>
        </p>
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <EmailField
          id="forgot-password-email"
          label={t("auth.forgotPassword.email") || "Email"}
          placeholder={
            t("auth.forgotPassword.emailPlaceholder") || "example@email.com"
          }
          error={errors.Email?.message}
          register={register("Email")}
          disabled={isLoading}
          focused={focusedField === "Email"}
          onFocus={() => setFocusedField("Email")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.forgotPassword.submitting") || "Đang gửi..."}
          submitText={
            t("auth.forgotPassword.submit") || "Gửi link đặt lại mật khẩu"
          }
        />
      </motion.div>

      {/* Back to Sign In Link */}
      <motion.div className="text-center pt-4" variants={itemVariants}>
        <Link
          to="/auth/sign-in"
          className="text-sm text-[var(--color-dark-blue)] hover:underline font-medium inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <AnimatedText>
            {t("auth.forgotPassword.backToSignIn") || "Quay lại đăng nhập"}
          </AnimatedText>
        </Link>
      </motion.div>
    </motion.form>
  );
}
