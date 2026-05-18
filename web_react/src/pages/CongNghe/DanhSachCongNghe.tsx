import { getListData } from '@app/api/getData.api';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { appActions } from '@app/store/slices/appSlice';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import SuaCongNghe from './SuaCongNghe';
import XemCongNghe from './XemCongNghe';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useTranslation } from 'react-i18next';

import { CongNgheEntity } from './types';
import { getTechnologyColumns } from './config/columns.config';

const DanhSachCongNghe = ({ path, permission }: { path: string; permission: Actions }) => {
  const { t } = useTranslation();
  const [danhSach, setDanhSach] = useState<{ data: CongNgheEntity[]; total: number } | undefined>({
    data: [],
    total: 0
  });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1, limit: 10 });
  const { inputSearch, query, dateSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const res = await getListData(path, params);
    setDanhSach(res);
    setIsLoading(false);
  };

  const defaultColumns = getTechnologyColumns(
    {
      page: filter.page,
      limit: filter.limit || 10
    },
    permission,
    getDanhSach,
    inputSearch,
    dateSearch,
    t,
    path,
    SuaCongNghe,
    XemCongNghe,
    danhSach?.data?.map((item: any) => item.thu_tu) || []
  ).map((item: any) => ({
    ...item,
    width: item.width || '210px'
  }));

  useEffect(() => {
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    getDanhSach();
    dispatch(appActions.saveQuery(params));
    dispatch(appActions.saveColumns(defaultColumns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <BaseRow justify='end'>
      <BaseCol span={24}>
        <CustomTable
          rowKey='id'
          dataTable={danhSach?.data}
          defaultColumns={defaultColumns}
          filter={filter}
          scroll={{ x: 1000, y: 'calc(100dvh - 300px)' }}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          total={danhSach?.total}
          loading={isLoading}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default DanhSachCongNghe;
