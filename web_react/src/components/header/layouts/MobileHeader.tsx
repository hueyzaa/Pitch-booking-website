import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import * as S from '../Header.styles';
import RoleSelect from '../components/RoleSelect/RoleSelect';

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
  return (
    <BaseRow justify='space-between' align='middle'>
      <BaseCol>
        <ProfileDropdown />
      </BaseCol>
      <BaseCol span={3} sm={6}>
        <BaseRow justify='end'>
          <RoleSelect />
        </BaseRow>
      </BaseCol>
      <BaseCol>
        <BaseRow justify='end'>
          <BaseCol>
            <NotificationsDropdown />
          </BaseCol>

          {/* <BaseCol>
            <SettingsDropdown />
          </BaseCol> */}
        </BaseRow>
      </BaseCol>

      <S.BurgerCol>
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </BaseRow>
  );
};
