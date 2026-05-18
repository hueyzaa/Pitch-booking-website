import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import VerifyOtpForm from '@app/components/auth/VerifyOtp/VerifyOtp';
import * as S from '@app/components/layouts/AuthLayout/AuthLayout.styles';

/**
 * Verify OTP page component
 * Handles OTP verification for two-factor authentication
 */
export const VerifyOtpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.verifyOtp')}</PageTitle>
      <S.AuthContainer>
        <VerifyOtpForm />
      </S.AuthContainer>
    </>
  );
};

export default VerifyOtpPage;
