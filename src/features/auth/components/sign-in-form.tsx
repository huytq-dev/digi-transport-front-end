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
import { useSocialLogin } from "../hooks/use-social-login";
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
  const { handleGoogleLogin, handleFacebookLogin, isLoading: isSocialLoading } = useSocialLogin();

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

      // Log response vào console để debug (chỉ trong development)
      if (import.meta.env.DEV || import.meta.env.MODE === "development") {
        console.log('=== SIGN IN API RESPONSE ===');
        console.log('Full Response:', JSON.stringify(response, null, 2));
        console.log('Response Type:', response.Type || response.type);
        console.log('Response Status:', response.Status || response.status);
        // Không log Data vì có thể chứa thông tin nhạy cảm
        console.log('===========================');
      }

      if (isApiResponseSuccess(response)) {
        // Lưu auth data vào localStorage
        // Normalize - check both PascalCase and lowercase
        const responseData = response.Data || response.data;
        if (responseData) {
          authService.saveAuthData(responseData);
        }

        toast.success(
          t("auth.signIn.successTitle") || "Đăng nhập thành công!",
          {
            description:
              t("auth.signIn.successMessage") || "Chào mừng bạn trở lại!",
          }
        );

        // Redirect về trang home của customer
        navigate("/home");
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", {
          description: errorMessage,
        });
      }
    } catch (error: unknown) {
      // Log error vào console để debug (chỉ trong development)
      if (import.meta.env.DEV || import.meta.env.MODE === "development") {
        console.log('=== SIGN IN API ERROR ===');
        // Không log full error để tránh leak thông tin nhạy cảm
        if (error && typeof error === "object") {
          if ("status" in error) {
            console.log('Error Status:', (error as any).status);
          }
        }
        console.log('========================');
      }

      let errorMessage = t("auth.signIn.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";

      // Handle RTK Query error format và lấy message thân thiện
      if (error && typeof error === "object") {
        if ("data" in error && error.data) {
          errorMessage = getApiErrorMessage(error.data as any);
        } else if ("error" in error && error.error) {
          if (typeof error.error === "string") {
            errorMessage = error.error;
          } else if (typeof error.error === "object" && "data" in error.error) {
            errorMessage = getApiErrorMessage(error.error.data as any);
          }
        } else if ("status" in error) {
          const status = (error as any).status;
          if (status === 500) {
            errorMessage = t("auth.signIn.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          } else if (status === 400) {
            errorMessage = "Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại email và mật khẩu.";
          } else if (status === 401) {
            errorMessage = "Email hoặc mật khẩu không đúng.";
          } else if (status >= 500) {
            errorMessage = t("auth.signIn.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          }
        }
      }

      toast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", {
        description: errorMessage,
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Giảm margin bottom để gắn kết hơn */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] mb-2 tracking-tight">
          <AnimatedText>
            {t("auth.signIn.title") || "Đăng nhập"}
          </AnimatedText>
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          <AnimatedText>
            {t("auth.signIn.subtitle") ||
              "Chào mừng bạn trở lại Digi Transport"}
          </AnimatedText>
        </p>
      </motion.div>

      {/* INPUT GROUP: Gom Email & Password gần nhau hơn */}
      <div className="space-y-4">
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

        <motion.div variants={itemVariants}>
          <div className="relative">
            <PasswordField
              id="signin-password"
              label={t("auth.signIn.password") || "Mật khẩu"}
              placeholder={
                t("auth.signIn.passwordPlaceholder") || "Nhập mật khẩu"
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

            {/* Forgot Password Link - Đặt ngay dưới input password để tạo liên kết */}
            <div className="flex justify-end mt-1.5">
              <Link
                to="/auth/forgot-password"
                className="text-xs font-medium text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:underline transition-colors duration-200"
                tabIndex={-1}
              >
                <AnimatedText>
                  {t("auth.signIn.forgotPassword") || "Quên mật khẩu?"}
                </AnimatedText>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ACTION GROUP: Nút Submit tách biệt một chút */}
      <motion.div variants={itemVariants} className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.signIn.submitting") || "Đang đăng nhập..."}
          submitText={t("auth.signIn.submit") || "Đăng nhập"}
          className="shadow-md hover:shadow-lg transition-all duration-300"
        />
      </motion.div>

      {/* SOCIAL & FOOTER GROUP */}
      <div className="space-y-6">
        <motion.div variants={itemVariants}>
          <Divider
            text={t("auth.signIn.orContinueWith") || "Hoặc tiếp tục với"}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SocialLoginButtons 
            isLoading={isLoading || isSocialLoading}
            onGoogleClick={handleGoogleLogin}
            onFacebookClick={handleFacebookLogin}
          />
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <p className="text-sm text-gray-600">
            <AnimatedText>
              {t("auth.signIn.noAccount") || "Chưa có tài khoản?"}
            </AnimatedText>{" "}
            <Link
              to="/auth/sign-up"
              className="animated-underline text-[var(--color-dark-blue)] font-bold hover:text-[var(--color-dark-blue)]/80 transition-colors duration-200"
            >
              <AnimatedText>
                {t("auth.signIn.signUpLink") || "Đăng ký ngay"}
              </AnimatedText>
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.form>
  );
}
