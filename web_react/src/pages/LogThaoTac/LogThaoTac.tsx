import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import DanhSachLogThaoTac from './DanhSachLogThaoTac';
import { API_URL } from '@app/configs/api-configs';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { Actions } from '@app/interfaces/interfaces';

const LogThaoTac = () => {
  const path = API_URL.LOG_THAO_TAC;
  const page = 'common.log-thao-tac';
  const permission: Actions = getPermissionUser(path);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t(page)}</PageTitle>
      <BaseCard padding='1rem'>
        <BaseRow gutter={[10, 10]}>
          <BaseCol span={24}>
            <BaseTypography.Title className='typography-title' level={3}>
              {t(page).toUpperCase()}
            </BaseTypography.Title>
          </BaseCol>
          <BaseCol span={24}>{permission.show && <DanhSachLogThaoTac path={path} />}</BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default LogThaoTac;
