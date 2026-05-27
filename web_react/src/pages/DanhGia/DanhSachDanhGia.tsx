import { getListData } from '@app/api/getData.api';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { appActions } from '@app/store/slices/appSlice';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import SuaDanhGia from './SuaDanhGia';
import moment from 'moment';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useTranslation } from 'react-i18next';
import { StarFilled } from '@ant-design/icons';
import { Tag } from 'antd';


const DanhSachDanhGia = ({ path, permission }: { path: string; permission: Actions  }) => {
  const { t } = useTranslation();
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1 });
  const { inputSearch, query, selectSearch, dateSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const danhSach = await getListData(path, params);
    if (danhSach) {
      setIsLoading(false);
    }
    setDanhSach(danhSach);
  };

  const defaultColumnsTemp: any = [
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
            {permission.edit && <SuaDanhGia path={path} id={id} />}
            {permission.delete && <Delete path={path} title={`${t("common.danh-gia")} của ${record.ten_khach_hang}`} id={id} onShow={getDanhSach} />}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Khách hàng',
      dataIndex: 'ten_khach_hang',
      width: '200px',
      ...inputSearch({ dataIndex: 'khach_hang.ho_va_ten', operator: 'contain', nameColumn: 'Khách hàng' })
    },
    {
      title: 'Sân',
      dataIndex: 'ten_san',
      width: '200px',
      ...inputSearch({ dataIndex: 'san.ten_san', operator: 'contain', nameColumn: 'Sân' })
    },
    {
      title: 'Số sao',
      dataIndex: 'so_sao',
      width: '120px',
      align: 'center',
      render: (so_sao: number) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', color: '#fadb14' }}>
            {Array.from({ length: so_sao }).map((_, idx) => (
              <StarFilled key={idx} />
            ))}
          </div>
        );
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'noi_dung',
      width: '300px',
      ...inputSearch({ dataIndex: 'noi_dung', operator: 'contain', nameColumn: 'Nội dung' })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: '120px',
      align: 'center',
      render: (status: number) => {
        if (status === 1) return <Tag color="success">Hiển thị</Tag>;
        return <Tag color="error">Ẩn</Tag>;
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'ngay_tao',
      align: 'right',
      width: '150px',
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    }
  ];
  
    const defaultColumns = defaultColumnsTemp.map((item: any) => ({
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

export default DanhSachDanhGia;
