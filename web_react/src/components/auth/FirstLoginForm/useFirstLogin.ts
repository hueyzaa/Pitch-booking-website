import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { ChangePassword } from '@app/api/auth.api';
import { doLogout } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { FirstLoginFormData } from './FirstLoginForm.types';

/**
 * Custom hook for handling first login password change
 * Manages password change on first login and logout
 */
export const useFirstLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: FirstLoginFormData) => {
    try {
      setLoading(true);

      // Change password with first login flag
      const data = await ChangePassword({
        ...values,
        is_first_change: 1
      });

      if (data?.code === 200) {
        // Logout after successful password change
        const result: IApiSuccess = await apiInstance.post(`${API_URL.LOGOUT}`);

        if (result.code === 200) {
          dispatch(doLogout());
        }

        // Navigate to login page
        navigate('/auth/login');
      }
    } catch (error: any) {
      notificationController.error({
        message: error.message
      });
      console.error('First login password change error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
};
