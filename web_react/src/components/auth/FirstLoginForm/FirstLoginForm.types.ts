/**
 * Type definitions for FirstLoginForm component
 */

export interface FirstLoginFormData {
  mat_khau_moi: string;
  mat_khau_moi_xac_nhan: string;
}

export interface FirstLoginFormProps {
  onSuccess?: () => void;
}
