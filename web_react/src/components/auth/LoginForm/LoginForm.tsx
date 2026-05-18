import React from 'react';
import { readAccount } from '@app/services/localStorage.service';
import { useLogin } from './useLogin';
import { useRecaptcha } from './useRecaptcha';
import { useSystemConfig } from './useSystemConfig';
import { LoginFormData } from './LoginForm.types';
import { notificationController } from '@app/controllers/notificationController';
import LoginVariantOne from './variants/One/LoginTypeOne';
import LoginVariantTwo from './variants/Two/LoginTypeTwo';
import LoginVariantThree from './variants/Three/LoginTypeThree';

/**
 * LoginForm component
 * Handles user authentication with multiple UI variants
 * Supports recaptcha, OTP, and remember me functionality
 */
export const LoginForm: React.FC = () => {
  const typeLogin = import.meta.env.VITE_TYPE_LOGIN;
  const initValues: LoginFormData = JSON.parse(readAccount() || '{}');

  // Custom hooks
  const { captchaRef, requireRecaptcha, setRequireRecaptcha, resetCaptcha } = useRecaptcha();
  const { handleSubmit, isLoading } = useLogin(setRequireRecaptcha);
  useSystemConfig();

  // Wrapper to handle recaptcha validation and submission
  const onSubmit = async (values: LoginFormData) => {
    // Validate recaptcha if required
    if (requireRecaptcha) {
      const reCapchaValue = captchaRef?.current?.getValue();
      if (!reCapchaValue) {
        notificationController.error({ message: 'Vui lòng xác thực capcha trước khi đăng nhập' });
        return;
      }
      await handleSubmit(values, reCapchaValue, resetCaptcha);
    } else {
      await handleSubmit(values, undefined, resetCaptcha);
    }
  };

  return (
    <>
      {typeLogin === '1' && (
        <LoginVariantOne
          handleSubmit={onSubmit}
          isLoading={isLoading}
          initValues={initValues}
          captchaRef={captchaRef}
          requireRecaptcha={requireRecaptcha}
        />
      )}
      {typeLogin === '2' && <LoginVariantTwo handleSubmit={onSubmit} isLoading={isLoading} initValues={initValues} />}
      {typeLogin === '3' && (
        <LoginVariantThree
          handleSubmit={onSubmit}
          isLoading={isLoading}
          initValues={initValues}
          captchaRef={captchaRef}
          requireRecaptcha={requireRecaptcha}
        />
      )}
    </>
  );
};
