import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Login } from '@app/api/auth.api';
import { doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import {
  persistAccount,
  persistNeedUpdatePassword,
  persistRequireOtp,
  deleteTimeOut,
  deleteRecaptcha
} from '@app/services/localStorage.service';
import { IUser } from '@app/interfaces/interfaces';
import { LoginFormData } from './LoginForm.types';

/**
 * Custom hook for handling login logic
 * Manages login flow, OTP, recaptcha, and navigation
 */
export const useLogin = (setRequireRecaptcha?: (value: boolean) => void) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormData, reCapchaValue?: string, resetCaptcha?: () => void) => {
    try {
      setLoading(true);
      const resp: IUser = await Login(values, reCapchaValue);

      if (resp) {
        // Handle OTP requirement
        if (resp.requireOtp) {
          persistRequireOtp(true);
          return navigate(`/auth/verify-otp?email=${resp.email}`);
        }

        // Handle recaptcha requirement from server
        if (resp.requireRecaptcha) {
          setRequireRecaptcha?.(true);
          notificationController.warning({ message: 'Vui lòng xác thực reCAPTCHA để tiếp tục' });
          return;
        }

        // Handle remember me
        if (values.rememberMe) {
          persistAccount(JSON.stringify(values));
        } else {
          persistAccount(JSON.stringify({ rememberMe: false }));
        }

        // Handle password update flag
        if (resp.need_update_password) {
          persistNeedUpdatePassword(true);
        }

        // Clear recaptcha data on successful login
        deleteTimeOut();
        deleteRecaptcha();

        // Dispatch login action and navigate
        await dispatch(doLogin(resp)).unwrap();

        if (resp.need_change_password === 1) {
          navigate('/first-login');
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      // Reset captcha on error
      resetCaptcha?.();

      // Show error notification
      notificationController.error({ message: error.message });

      // Log error for debugging (can be sent to error tracking service)
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading
  };
};
