import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SecurityCodeForm } from '@app/components/auth/SecurityCodeForm/SecurityCodeForm';
import * as S from '@app/components/layouts/AuthLayout/AuthLayout.styles';

/**
 * Security code page component
 * Handles security code verification for password reset
 */
export const SecurityCodePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.securityCode')}</PageTitle>
      <S.AuthContainer>
        <SecurityCodeForm />
      </S.AuthContainer>
    </>
  );
};

export default SecurityCodePage;
