import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { NewPasswordForm } from '@app/components/auth/NewPasswordForm/NewPasswordForm';
import * as S from '@app/components/layouts/AuthLayout/AuthLayout.styles';

/**
 * New password page component
 * Handles setting new password after reset
 */
export const NewPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.newPassword')}</PageTitle>
      <S.AuthContainer>
        <NewPasswordForm />
      </S.AuthContainer>
    </>
  );
};

export default NewPasswordPage;
