import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { UpdatePassSetting } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/UpdatePassSetting';

/**
 * Update password page component
 * Allows users to change their password
 */
export const UpdatePasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('profile.nav.securitySettings.updatePassword')}</PageTitle>
      <UpdatePassSetting />
    </>
  );
};

export default UpdatePasswordPage;
