import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import DanhSachQuanLyUpload from './DanhSachQuanLyUpload';
import { API_URL } from '@app/configs/api-configs';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { Actions } from '@app/interfaces/interfaces';

const QuanLyUpload = () => {
  const path = API_URL.QUAN_LY_UPLOAD;
  const page = 'common.quan-ly-upload';
  const permission: Actions = getPermissionUser(path);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t(page)}</PageTitle>
      <BaseCard padding='1rem'>
        <BaseRow gutter={[10, 10]}>
          <BaseCol span={12}>
            <BaseTypography.Title level={3}>{t(page).toUpperCase()}</BaseTypography.Title>
          </BaseCol>
          <BaseCol span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}></BaseCol>
          <BaseCol span={24}>{permission.show && <DanhSachQuanLyUpload path={path} permission={permission} />}</BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default QuanLyUpload;
