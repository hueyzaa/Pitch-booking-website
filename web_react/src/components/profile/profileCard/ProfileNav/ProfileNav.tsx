import React from 'react';
import { useTranslation } from 'react-i18next';
import { profileNavData } from '@app/constants/profileNavData';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './ProfileNav.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { readNeedUpdatePassword } from '@app/services/localStorage.service';

export const ProfileNav: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const needUpdatePassword = readNeedUpdatePassword();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredProfileNavData = profileNavData.filter((item) => {
    if (item.id === 3) {
      return user?.need_change_password === 2 && needUpdatePassword;
    }
    return true;
  });
  return (
    <S.Wrapper>
      {filteredProfileNavData.map((item) => (
        <S.Btn
          key={item.id}
          icon={item.icon}
          type='text'
          color={item.color}
          onClick={() => navigate(item.href)}
          $isActive={`/profile/${item.href}` === location.pathname}
        >
          {t(item.name)}
        </S.Btn>
      ))}
    </S.Wrapper>
  );
};
