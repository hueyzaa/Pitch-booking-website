import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import * as S from '../Header.styles';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { RoleSelect } from '@app/components/header/components/RoleSelect/RoleSelect';
// import MenuSearch from '@app/components/menuSearch/menuSearch';

export const DesktopHeader = () => {
  return (
    <BaseRow justify='space-between' align='middle'>
      {/* {leftSide} */}
      <BaseCol span={6}>{/* <MenuSearch /> */}</BaseCol>
      <BaseCol span={18} style={{ alignItems: 'right' }}>
        <S.ProfileColumn xl={24} xxl={24}>
          <BaseRow align='middle' justify='end' gutter={[5, 5]}>
            <BaseCol span={3} sm={6}>
              <BaseRow justify='end'>
                <RoleSelect />
              </BaseRow>
            </BaseCol>
            <BaseCol span={1} sm={2}>
              <BaseRow justify='end' gutter={[{ xxl: 5 }, { xxl: 5 }]}>
                {/* <BaseCol>
                  <HeaderFullscreen />
                </BaseCol> */}

                <BaseCol>
                  <NotificationsDropdown />
                </BaseCol>

                {/* <BaseCol>
                  <SettingsDropdown />
                </BaseCol> */}
              </BaseRow>
            </BaseCol>
            <BaseCol>
              <ProfileDropdown />
            </BaseCol>
          </BaseRow>
        </S.ProfileColumn>
      </BaseCol>
    </BaseRow>
  );
};
