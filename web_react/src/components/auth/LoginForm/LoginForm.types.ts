/**
 * Type definitions for LoginForm component
 */

export interface LoginFormData {
  tai_khoan: string;
  mat_khau: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  onSubmit?: (values: LoginFormData) => void;
}

export interface LoginVariantProps {
  handleSubmit: (values: LoginFormData) => void;
  isLoading: boolean;
  initValues: LoginFormData;
  captchaRef?: React.RefObject<any>;
  requireRecaptcha?: boolean;
}
