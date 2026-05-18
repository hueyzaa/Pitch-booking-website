/**
 * Type definitions for NewPasswordForm component
 */

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface NewPasswordFormProps {
  onSuccess?: () => void;
}

export interface ResetPasswordParams {
  email: string | string[] | null;
  token: string | string[] | null;
}
