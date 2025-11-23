import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { signInSchema, type SignInFormData } from "../auth.schema";
import { useSignInMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/Common/common.type";
import { authService } from "../auth.service";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  EmailField,
  PasswordField,
  SubmitButton,
  SocialLoginButtons,
  Divider,
} from "./shared/auth-form-components";

export function SignInForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [signIn, { isLoading }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data).unwrap();

      if (isApiResponseSuccess(response)) {
        // Lưu auth data vào localStorage
        authService.saveAuthData(response.Data);

        toast.success(
          t("auth.signIn.successTitle") || "Đăng nhập thành công!",
          {
            description:
              t("auth.signIn.successMessage") || "Chào mừng bạn trở lại!",
          }
        );

        // Redirect về trang chủ hoặc trang được chỉ định
        navigate("/");
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", {
          description: errorMessage,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? getApiErrorMessage(error.data as any)
          : t("auth.signIn.errorMessage") ||
            "Có lỗi xảy ra. Vui lòng thử lại sau.";

      toast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", {
        description: errorMessage,
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <EmailField
          id="signin-email"
          label={t("auth.signIn.email") || "Email"}
          placeholder={t("auth.signIn.emailPlaceholder") || "example@email.com"}
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
          id="signin-password"
          label={t("auth.signIn.password") || "Mật khẩu"}
          placeholder={
            t("auth.signIn.passwordPlaceholder") || "Nhập mật khẩu của bạn"
          }
          error={errors.Password?.message}
          register={register("Password")}
          disabled={isLoading}
          focused={focusedField === "Password"}
          onFocus={() => setFocusedField("Password")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </motion.div>

      {/* Forgot Password Link */}
      <motion.div className="flex justify-end pt-1" variants={itemVariants}>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-[var(--color-dark-blue)] hover:underline font-medium"
        >
          <AnimatedText>
            {t("auth.signIn.forgotPassword") || "Quên mật khẩu?"}
          </AnimatedText>
        </Link>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.signIn.submitting") || "Đang đăng nhập..."}
          submitText={t("auth.signIn.submit") || "Đăng nhập"}
        />
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants}>
        <Divider
          text={t("auth.signIn.orContinueWith") || "Hoặc tiếp tục với"}
        />
      </motion.div>

      {/* Social Login Buttons */}
      <motion.div variants={itemVariants}>
        <SocialLoginButtons isLoading={isLoading} />
      </motion.div>

      {/* Sign Up Link */}
      <motion.div className="text-center pt-4" variants={itemVariants}>
        <p className="text-sm text-gray-600">
          <AnimatedText>
            {t("auth.signIn.noAccount") || "Chưa có tài khoản?"}
          </AnimatedText>{" "}
          <Link
            to="/auth/sign-up"
            className="text-[var(--color-dark-blue)] font-bold hover:underline decoration-2 underline-offset-4 transition-all"
          >
            <AnimatedText>
              {t("auth.signIn.signUpLink") || "Đăng ký ngay"}
            </AnimatedText>
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
}
