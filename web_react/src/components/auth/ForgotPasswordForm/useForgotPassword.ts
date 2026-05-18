import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { ForgotPasswordFormData } from './ForgotPasswordForm.types';

/**
 * Custom hook for handling forgot password logic
 * Manages password reset request and navigation
 */
export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      const resp: IApiSuccess = await apiInstance.post(`${API_URL.FORGOTPASS}`, values);

      if (resp.code === 200) {
        // Navigate to security code page on success
        navigate('/auth/security-code');
      } else {
        // Handle specific error cases
        if (resp.message === 'USER_NOT_FOUND') {
          notificationController.error({
            message: 'Không tìm thấy tài khoản'
          });
        } else {
          notificationController.error({
            message: resp.message
          });
        }
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
};
