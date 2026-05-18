import React from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpForm } from '@app/components/auth/SignUpForm/SignUpForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import AuthLayout from '@app/components/layouts/AuthLayout/AuthLayout';

/**
 * Sign up page component
 * Handles new user registration
 */
export const SignUpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.signUp')}</PageTitle>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
};

export default SignUpPage;
