import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { NewPasswordFormData } from './NewPasswordForm.types';

/**
 * Custom hook for handling new password submission
 * Manages password reset with token validation
 */
export const useNewPassword = (email: string | string[] | null, token: string | string[] | null) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: NewPasswordFormData) => {
    try {
      setLoading(true);

      const resp: IApiSuccess = await apiInstance.post(`${API_URL.RESET}`, {
        email: email,
        token_reset_pass: token,
        mat_khau_moi: values.password
      });

      if (resp.code === 200) {
        notificationController.success({
          message: 'Tạo thành công mật khẩu mới'
        });
        navigate('/auth/login');
      } else {
        notificationController.error({
          message: resp.message
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
      console.error('New password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
};
