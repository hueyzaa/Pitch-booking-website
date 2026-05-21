import { getListData } from '@app/api/getData.api';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { appActions } from '@app/store/slices/appSlice';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import SuaTrangThaiSan from './SuaTrangThaiSan';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useTranslation } from 'react-i18next';
import { getTrangThaiSanColumns } from './config/columns.config';
import TrangThaiSanFilterForm from './components/TrangThaiSanFilterForm';
import { TrangThaiSanCalendar } from './components/TrangThaiSanCalendar';
import { Radio } from 'antd';


const DanhSachTrangThaiSan = ({ path, permission }: { path: string; permission: Actions  }) => {
  const { t } = useTranslation();
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1 });
  const { inputSearch, query, dateSearch } = useColumnSearch();
  const [formQuery, setFormQuery] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getDanhSach = async () => {
    setIsLoading(true);
    const combinedQuery = [...query, ...formQuery];
    const uniqueQueryMap: { [key: string]: any } = {};
    combinedQuery.forEach((q) => {
      uniqueQueryMap[q.field] = q;
    });
    const uniqueQuery = Object.values(uniqueQueryMap);

    const params = { ...filter, ...createFilterQueryFromArray(uniqueQuery) };
    const res = await getListData(path, params);
    if (res) {
      setIsLoading(false);
    }
    setDanhSach(res);
  };

  const handleFormSearch = (filters: any[]) => {
    setFormQuery(filters);
  };

  const handleFormReset = () => {
    setFormQuery([]);
  };

  const defaultColumns = getTrangThaiSanColumns(
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
    SuaTrangThaiSan
  ).map((item: any) => ({
    ...item,
    width: item.width || '150px'
  }));

  useEffect(() => {
    const combinedQuery = [...query, ...formQuery];
    const uniqueQueryMap: { [key: string]: any } = {};
    combinedQuery.forEach((q) => {
      uniqueQueryMap[q.field] = q;
    });
    const uniqueQuery = Object.values(uniqueQueryMap);

    const params = { ...filter, ...createFilterQueryFromArray(uniqueQuery) };
    getDanhSach();
    dispatch(appActions.saveQuery(params));
    dispatch(appActions.saveColumns(defaultColumns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query, formQuery]);

  return (
    <BaseRow justify='end' gutter={[0, 16]}>
      <BaseCol span={24}>
        <TrangThaiSanFilterForm onSearch={handleFormSearch} onReset={handleFormReset} isLoading={isLoading} />
      </BaseCol>

      <BaseCol span={24}>
        <BaseRow justify="space-between" align="middle" style={{ width: '100%', marginBottom: '8px', padding: '0 4px' }}>
          <BaseCol>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#595959' }}>
              Hiển thị dưới dạng: <strong style={{ color: '#6366f1' }}>{viewMode === 'calendar' ? 'Lịch biểu' : 'Danh sách'}</strong>
            </span>
          </BaseCol>
          <BaseCol>
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              size="middle"
            >
              <Radio.Button value="calendar">📅 Lịch biểu</Radio.Button>
              <Radio.Button value="table">📋 Danh sách</Radio.Button>
            </Radio.Group>
          </BaseCol>
        </BaseRow>
      </BaseCol>

      <BaseCol span={24}>
        {viewMode === 'calendar' ? (
          <TrangThaiSanCalendar 
            reloadTrigger={reload} 
            permission={permission} 
            filterQuery={formQuery}
          />
        ) : (
          <CustomTable
            rowKey='id'
            dataTable={danhSach?.data}
            defaultColumns={defaultColumns}
            filter={filter}
            scroll={{ x: 1800, y: 'calc(100dvh - 300px)' }}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
            total={danhSach?.total}
            loading={isLoading}
          />
        )}
      </BaseCol>
    </BaseRow>
  );
};

export default DanhSachTrangThaiSan;
