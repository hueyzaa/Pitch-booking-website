import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { ForgotPasswordForm } from '@app/components/auth/ForgotPasswordForm/ForgotPasswordForm';
import * as S from '@app/components/layouts/AuthLayout/AuthLayout.styles';

/**
 * Forgot password page component
 * Handles password reset request
 */
export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.forgotPass')}</PageTitle>
      <S.AuthContainer>
        <ForgotPasswordForm />
      </S.AuthContainer>
    </>
  );
};

export default ForgotPasswordPage;
