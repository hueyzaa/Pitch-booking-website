import { getListData } from '@app/api/getData.api';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import SuaVaiTro from './SuaVaiTro';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import ExportTable from '@app/components/customs/exportExcel/ExportTable';
import moment from 'moment';
import VaiTroChiTiet from './VaiTroChiTiet';
import XemNguoiDungVaiTro from './XemNguoiDungVaiTro';

const DanhSachVaiTro = ({ path, permission }: { path: string; permission: Actions }) => {
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1, limit: 20 });
  const { inputSearch, query, dateSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const danhSach = await getListData(path, params);
    setIsLoading(false);
    setDanhSach(danhSach);
  };

  const defaultColumns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right',
      width: '5%',
      render: (_text: any, _record: any, index: any) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      width: '5%',
      render: (id: number, record: any) => {
        return (
          <BaseSpace size={0}>
            {/* Nút xem danh sách người dùng */}
            {permission.show && <XemNguoiDungVaiTro vaiTroId={id} tenVaiTro={record.ten_vai_tro} />}
            {permission.show && <VaiTroChiTiet path={path} id={id} />}
            {permission.edit && <SuaVaiTro path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`phân quyền "${record.ten_vai_tro}"`} id={id} onShow={getDanhSach} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'ten_vai_tro',
      ...inputSearch({ dataIndex: 'ten_vai_tro', operator: 'contain', nameColumn: 'Tên vai trò' })
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right',
      width: '15%',
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
      width: '15%',
      render: (record: string): string => {
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm') || '';
      },
      ...dateSearch({ dataIndex: 'ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    }
  ];

  useEffect(() => {
    getDanhSach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <BaseRow justify='end'>
      <BaseCol span={24}>
        {permission.export && <ExportTable columns={defaultColumns} path={path} params={{}} />}
        <CustomTable
          rowKey='id'
          dataTable={danhSach?.data}
          defaultColumns={defaultColumns}
          filter={filter}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          total={danhSach?.total}
          loading={isLoading}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default DanhSachVaiTro;
