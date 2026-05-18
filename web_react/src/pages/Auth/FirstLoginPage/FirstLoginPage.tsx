import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import FirstLoginForm from '@app/components/auth/FirstLoginForm/FirstLoginForm';
import AuthLayout from '@app/components/layouts/AuthLayout/AuthLayout';

/**
 * First login page component
 * Handles mandatory password change on first login
 */
export const FirstLoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.firstLogin')}</PageTitle>
      <AuthLayout>
        <FirstLoginForm />
      </AuthLayout>
    </>
  );
};

export default FirstLoginPage;
