import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { resetPasswordSchema, type ResetPasswordFormData } from "../auth.schema";
import { useResetPasswordMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/Common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  PasswordField,
  SubmitButton,
} from "./shared/auth-form-components";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      Token: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
  });

  // Lấy token từ URL query params
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setValue("Token", tokenFromUrl);
    } else {
      toast.error(
        t("auth.resetPassword.invalidToken") || "Token không hợp lệ hoặc đã hết hạn"
      );
      setTimeout(() => {
        navigate("/auth/forgot-password");
      }, 2000);
    }
  }, [searchParams, setValue, navigate, t]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await resetPassword(data).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
        toast.success(
          t("auth.resetPassword.successTitle") || "Đặt lại mật khẩu thành công!",
          {
            description:
              t("auth.resetPassword.successMessage") ||
              "Mật khẩu của bạn đã được đặt lại thành công.",
          }
        );

        // Redirect về trang đăng nhập sau 3 giây
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 3000);
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(
          t("auth.resetPassword.errorTitle") || "Đặt lại mật khẩu thất bại",
          {
            description: errorMessage,
          }
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? getApiErrorMessage(error.data as any)
          : t("auth.resetPassword.errorMessage") ||
            "Có lỗi xảy ra. Vui lòng thử lại sau.";

      toast.error(
        t("auth.resetPassword.errorTitle") || "Đặt lại mật khẩu thất bại",
        {
          description: errorMessage,
        }
      );
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-dark-blue)] mb-4" />
        <p className="text-sm text-gray-600">
          <AnimatedText>
            {t("auth.resetPassword.loading") || "Đang kiểm tra token..."}
          </AnimatedText>
        </p>
      </div>
    );
  }

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
            {t("auth.resetPassword.successTitle") || "Đặt lại mật khẩu thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-sm mx-auto leading-relaxed">
          <AnimatedText>
            {t("auth.resetPassword.successMessage") ||
              "Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới."}
          </AnimatedText>
        </p>
        <p className="text-sm text-gray-500 text-center mb-6">
          <AnimatedText>
            {t("auth.resetPassword.redirectMessage") ||
              "Đang chuyển đến trang đăng nhập..."}
          </AnimatedText>
        </p>
        <Button
          onClick={() => navigate("/auth/sign-in")}
          className="bg-[var(--color-dark-blue)] text-white"
        >
          <AnimatedText>
            {t("auth.resetPassword.goToSignIn") || "Đi đến đăng nhập"}
          </AnimatedText>
        </Button>
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
            {t("auth.resetPassword.description") ||
              "Nhập mật khẩu mới của bạn. Mật khẩu phải có ít nhất 6 ký tự."}
          </AnimatedText>
        </p>
      </motion.div>

      {/* New Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="reset-password-new"
          label={t("auth.resetPassword.newPassword") || "Mật khẩu mới"}
          placeholder={
            t("auth.resetPassword.newPasswordPlaceholder") || "Tối thiểu 6 ký tự"
          }
          error={errors.NewPassword?.message}
          register={register("NewPassword")}
          disabled={isLoading}
          focused={focusedField === "NewPassword"}
          onFocus={() => setFocusedField("NewPassword")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="reset-password-confirm"
          label={t("auth.resetPassword.confirmPassword") || "Xác nhận mật khẩu"}
          placeholder={
            t("auth.resetPassword.confirmPasswordPlaceholder") ||
            "Nhập lại mật khẩu mới"
          }
          error={errors.ConfirmPassword?.message}
          register={register("ConfirmPassword")}
          disabled={isLoading}
          focused={focusedField === "ConfirmPassword"}
          onFocus={() => setFocusedField("ConfirmPassword")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.resetPassword.submitting") || "Đang xử lý..."}
          submitText={t("auth.resetPassword.submit") || "Đặt lại mật khẩu"}
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
            {t("auth.resetPassword.backToSignIn") || "Quay lại đăng nhập"}
          </AnimatedText>
        </Link>
      </motion.div>
    </motion.form>
  );
}
