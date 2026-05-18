import { getListData } from '@app/api/getData.api';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { API_URL } from '@app/configs/api-configs';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { Actions } from '@app/interfaces/interfaces';
import { appActions } from '@app/store/slices/appSlice';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import MatKhauMoiNguoiDung from './MatKhauMoiNguoiDung';
import SuaNguoiDung from './SuaNguoiDung';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import ExportTable from '@app/components/customs/exportExcel/ExportTable';
import moment from 'moment';
import ImportFile from '@app/components/customs/ImportFile/ImportFile';
import { Tooltip } from 'antd';
const DanhSachNguoiDung = ({ path, permission }: { path: string; permission: Actions }) => {
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1, limit: 20 });
  const { inputSearch, query, dateSearch, selectSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const params = { ...filter, ...createFilterQueryFromArray(query) };

  const getDanhSach = async () => {
    setIsLoading(true);
    const danhSach = await getListData(path, params);
    if (danhSach) {
      setIsLoading(false);
    }
    setDanhSach(danhSach);
  };

  const defaultColumns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right',
      width: '50px',
      render: (_text: any, _record: any, index: any) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      width: '120px',
      render: (id: number, record: any) => {
        return (
          <BaseSpace size={0}>
            {permission.edit && <SuaNguoiDung path={path} id={id} />}
            {permission.edit && <MatKhauMoiNguoiDung path={path} id={id} />}
            {permission.delete && (
              <Delete title={`tài khoản "${record.tai_khoan}"`} path={path} id={id} onShow={getDanhSach} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Họ tên',
      dataIndex: 'ho_va_ten',
      width: '216px',
      ...inputSearch({ dataIndex: 'ho_va_ten', operator: 'contain', nameColumn: 'Họ tên' })
    },
    {
      title: 'Tài khoản',
      dataIndex: 'tai_khoan',
      width: '216px',
      ...inputSearch({ dataIndex: 'tai_khoan', operator: 'contain', nameColumn: 'Tài khoản' })
    },
    {
      title: 'Vai trò hiện tại',
      dataIndex: 'ma_vai_tro',
      width: '210px',
      ...selectSearch({
        dataIndex: 'ma_vai_tro',
        path: `${API_URL.VAI_TRO}${API_URL.OPTIONS}`,
        nameColumn: 'Mã vai trò'
      })
    },
    {
      title: 'Danh sách vai trò',
      dataIndex: 'danh_sach_vai_tro',
      width: '210px',
      ...selectSearch({
        dataIndex: 'nguoi_dung_vai_tro.vai_tro_id',
        path: `${API_URL.VAI_TRO}${API_URL.OPTIONS}`,
        nameColumn: 'Danh sách vai trò'
      })
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right',
      width: '210px',
      render: (record: string): string => {
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm') || '';
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'ngay_cap_nhat',
      align: 'right',
      width: '210px',
      render: (record: string): string => {
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm') || '';
      },
      ...dateSearch({ dataIndex: 'ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    }
  ];

  useEffect(() => {
    getDanhSach();
    dispatch(appActions.saveQuery(params));
    dispatch(appActions.saveColumns(defaultColumns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <BaseRow>
      <BaseCol span={24}>
        <BaseRow justify='end' align='middle' style={{ marginBottom: '10px' }}>
          {permission.create && (
            <ImportFile
              pathFileMau='/filemau/file_mau_nguoi_dung.xlsx'
              pathImport={path + '/import-excel'}
              title='Import người dùng'
            />
          )}
          {permission.export && (
            <Tooltip title='Export excel'>
              <ExportTable columns={defaultColumns} path={path} params={{}} />
            </Tooltip>
          )}
        </BaseRow>
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

export default DanhSachNguoiDung;
