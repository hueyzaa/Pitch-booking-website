import avatarImg from '@app/assets/icons/user.svg';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { apiURL } from '@app/configs/configs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import * as S from './ProfileDropdown.styles';
import { generateHashStringAndParamsString } from '@app/utils/utils';
export const ProfileDropdown: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const avatar = user?.avatar
    ? `${apiURL}${user?.avatar}?${generateHashStringAndParamsString({ originalUrl: user?.avatar })}`
    : avatarImg;

  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger='click'>
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align='middle' justify='end'>
        <BaseCol>
          <BaseAvatar src={avatar} alt='User' shape='circle' size={40} />
        </BaseCol>
        <BaseCol>
          <span className='text-white'>{`${user.ho_va_ten}`}</span>
        </BaseCol>
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
