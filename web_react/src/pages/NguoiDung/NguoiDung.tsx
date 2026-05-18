import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { API_URL } from '@app/configs/api-configs';
import { Actions } from '@app/interfaces/interfaces';
import { getPermissionUser } from '@app/utils/redux.utils';
import { useTranslation } from 'react-i18next';
import DanhSachNguoiDung from './DanhSachNguoiDung';
import ThemNguoiDung from './ThemNguoiDung';

const NguoiDung = () => {
  const path = API_URL.NGUOI_DUNG;
  const page = 'common.nguoi-dung';
  const permission: Actions = getPermissionUser(path);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t(page)}</PageTitle>
      <BaseCard padding='1rem'>
        <BaseRow gutter={[10, 10]}>
          <BaseCol span={12}>
            <BaseTypography.Title level={3} className='typography-title'>
              {t(page).toUpperCase()}
            </BaseTypography.Title>
          </BaseCol>
          <BaseCol span={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
            {permission.create && <ThemNguoiDung path={path} />}
          </BaseCol>
          <BaseCol span={24}>{permission.show && <DanhSachNguoiDung path={path} permission={permission} />}</BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default NguoiDung;
