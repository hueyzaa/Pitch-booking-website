import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import AuthLayout from '@app/components/layouts/AuthLayout/AuthLayout';

/**
 * Login page component
 * Handles user authentication
 */
export const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
