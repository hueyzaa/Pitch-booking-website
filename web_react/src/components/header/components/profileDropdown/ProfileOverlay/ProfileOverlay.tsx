import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';
import { MdLogout } from 'react-icons/md';
export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <S.Text>
        <Link to='/profile'>{t('profile.title')}</Link>
      </S.Text>
      <S.ItemsDivider />
      <S.Text>
        <Link to='/logout' style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--error-color' }}>
          <MdLogout size={20} />
          <span style={{ marginBottom: '2px' }}>{t('header.logout')}</span>
        </Link>
      </S.Text>
    </div>
  );
};
