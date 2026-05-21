import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import ThemTrangThaiSan from './ThemTrangThaiSan';
import DanhSachTrangThaiSan from './DanhSachTrangThaiSan';
import { API_URL } from '@app/configs/api-configs';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Actions } from '@app/interfaces/interfaces';
import ExportTable from '@app/components/customs/exportExcel/ExportTable';


const TrangThaiSan = () => {
  const path = API_URL.TRANG_THAI_SAN;
  const page = 'common.trang-thai-san';
  const permission: Actions = getPermissionUser(path);
  const query = useAppSelector((state) => state.app.queryData);
  const columns = useAppSelector((state) => state.app.columns);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t(page)}</PageTitle>
      <BaseCard padding='2rem'>
        <BaseRow gutter={[10, 40]}>
          <BaseCol span={24}>
            <BaseRow justify='space-between' align='middle'>
              <BaseCol>
                <BaseTypography.Title level={4} className='typography-title'>
                {t(page).toUpperCase()}
                </BaseTypography.Title>
              </BaseCol>
              <BaseCol style={{ display: 'flex', gap: '1rem' }}>
                {permission.export && <ExportTable columns={columns} path={path} params={query} />}
                {permission.create && <ThemTrangThaiSan path={path} />}
              </BaseCol>
            </BaseRow>
          </BaseCol>
          <BaseCol span={24}>
            {permission.show && <DanhSachTrangThaiSan path={path} permission={permission}  />}
          </BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default TrangThaiSan;
