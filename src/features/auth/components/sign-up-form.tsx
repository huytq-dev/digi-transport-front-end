import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";
import { signUpSchema, type SignUpFormData } from "../auth.schema";
import { useSignUpMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/Common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  TextField,
  EmailField,
  PasswordField,
  SubmitButton,
  SocialLoginButtons,
  Divider,
} from "./shared/auth-form-components";

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      TermsAccepted: false,
    },
  });

  const passwordValue = watch("Password");

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        reset();
        navigate("/auth/sign-in");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset, navigate]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { PasswordConfirm, TermsAccepted, ...submitData } = data;
      const response = await signUp(submitData).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
        toast.success(t("auth.signUp.successTitle") || "Đăng ký thành công!", {
          description:
            t("auth.signUp.successMessage") ||
            "Vui lòng kiểm tra email để xác nhận tài khoản.",
        });
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(t("auth.signUp.errorTitle") || "Đăng ký thất bại", {
          description: errorMessage,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? getApiErrorMessage(error.data as any)
          : t("auth.signUp.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";

      toast.error(t("auth.signUp.errorTitle") || "Đăng ký thất bại", {
        description: errorMessage,
      });
    }
  };

  const getStrengthColor = (index: number, length: number) => {
    // Logic đơn giản hóa cho ngắn gọn
    if (index === 0) return length >= 6 ? "bg-green-500" : "bg-red-500";
    if (index === 1) return length >= 8 ? "bg-green-500" : "bg-gray-200";
    if (index === 2) return length >= 10 ? "bg-green-500" : "bg-gray-200";
    if (index === 3) return length >= 12 ? "bg-green-500" : "bg-gray-200";
    return "bg-gray-200";
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold">
          <AnimatedText>
            {t("auth.signUp.successTitle") || "Đăng ký thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          <AnimatedText>
            {t("auth.signUp.successMessage") ||
              "Vui lòng kiểm tra email để xác nhận tài khoản."}
          </AnimatedText>
        </p>
      </div>
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
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <TextField
          id="signup-name"
          label={t("auth.signUp.name") || "Họ và Tên"}
          placeholder={t("auth.signUp.namePlaceholder") || "Nguyễn Văn A"}
          error={errors.Name?.message}
          register={register("Name")}
          disabled={isLoading}
          focused={focusedField === "Name"}
          onFocus={() => setFocusedField("Name")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <EmailField
          id="signup-email"
          label={t("auth.signUp.email") || "Email"}
          placeholder={t("auth.signUp.emailPlaceholder") || "example@email.com"}
          error={errors.Email?.message}
          register={register("Email")}
          disabled={isLoading}
          focused={focusedField === "Email"}
          onFocus={() => setFocusedField("Email")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="signup-password"
          label={t("auth.signUp.password") || "Mật khẩu"}
          placeholder={t("auth.signUp.passwordPlaceholder") || "Tối thiểu 6 ký tự"}
          error={errors.Password?.message}
          register={register("Password")}
          disabled={isLoading}
          focused={focusedField === "Password"}
          onFocus={() => setFocusedField("Password")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        {/* Password Strength Indicator */}
        <AnimatePresence>
          {passwordValue && passwordValue.length > 0 && !errors.Password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-1 h-1 mt-2"
            >
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={cn(
                    "h-full w-1/4 rounded-full transition-colors duration-300",
                    getStrengthColor(index, passwordValue.length)
                  )}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="signup-password-confirm"
          label={t("auth.signUp.confirmPassword") || "Xác nhận mật khẩu"}
          placeholder={
            t("auth.signUp.confirmPasswordPlaceholder") || "Nhập lại mật khẩu"
          }
          error={errors.PasswordConfirm?.message}
          register={register("PasswordConfirm")}
          disabled={isLoading}
          focused={focusedField === "PasswordConfirm"}
          onFocus={() => setFocusedField("PasswordConfirm")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
        />
      </motion.div>

      {/* Terms & Conditions Checkbox */}
      <motion.div className="flex items-start gap-3 pt-2" variants={itemVariants}>
        <div className="flex items-center pt-0.5">
          <input
            id="terms"
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 transition-all cursor-pointer mt-0.5",
              errors.TermsAccepted
                ? "border-red-500 text-red-500 focus:ring-red-500"
                : "text-[var(--color-dark-blue)] focus:ring-[var(--color-dark-blue)]",
              "focus:ring-2 focus:ring-offset-0"
            )}
            {...register("TermsAccepted")}
            disabled={isLoading}
          />
        </div>
        <div className="flex-1 space-y-1">
          <label
            htmlFor="terms"
            className={cn(
              "text-sm font-medium leading-relaxed cursor-pointer select-none flex flex-wrap items-center",
              errors.TermsAccepted ? "text-red-500" : "text-gray-600"
            )}
          >
            <AnimatedText>{t("auth.signUp.agreeTo") || "Tôi đồng ý với "}</AnimatedText>
            <Link
              to="/terms"
              className="hover:underline font-bold text-[var(--color-dark-blue)] mx-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedText>
                {t("auth.signUp.terms") || "Điều khoản dịch vụ"}
              </AnimatedText>
            </Link>
            &nbsp;&
            <Link
              to="/privacy"
              className="hover:underline font-bold text-[var(--color-dark-blue)] mx-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedText>
                {t("auth.signUp.privacy") || "Chính sách bảo mật"}
              </AnimatedText>
            </Link>
          </label>
          <AnimatePresence>
            {errors.TermsAccepted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <p className="text-[11px] font-medium text-red-500">
                  {errors.TermsAccepted.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.signUp.submitting") || "Đang xử lý..."}
          submitText={t("auth.signUp.submit") || "Đăng ký"}
        />
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants}>
        <Divider
          text={t("auth.signUp.orContinueWith") || "Hoặc tiếp tục với"}
        />
      </motion.div>

      {/* Social Login Buttons */}
      <motion.div variants={itemVariants}>
        <SocialLoginButtons isLoading={isLoading} />
      </motion.div>

      {/* Sign In Link */}
      <motion.div className="text-center pt-4" variants={itemVariants}>
        <p className="text-sm text-gray-600">
          <AnimatedText>
            {t("auth.signUp.haveAccount") || "Đã có tài khoản?"}
          </AnimatedText>{" "}
          <Link
            to="/auth/sign-in"
            className="text-[var(--color-dark-blue)] font-bold hover:underline decoration-2 underline-offset-4 transition-all"
          >
            <AnimatedText>
              {t("auth.signUp.signInLink") || "Đăng nhập"}
            </AnimatedText>
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
}
