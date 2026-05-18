/**
 * Type definitions for ForgotPasswordForm component
 */

export interface ForgotPasswordFormData {
  email: string;
  tai_khoan: string;
}

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}
