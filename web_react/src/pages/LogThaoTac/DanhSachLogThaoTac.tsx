import { getListData } from '@app/api/getData.api';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { mucDoThaoTac } from '@app/configs/select-configs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const DanhSachLogThaoTac = ({ path }: { path: string }) => {
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1 });
  const { inputSearch, numberSearch, query, dateSearch, selectSearchWithOutApi } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
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
      title: 'UserID',
      dataIndex: 'user_id',
      align: 'right',
      width: '60px',
      ...numberSearch({ dataIndex: 'log_thao_tac.user_id', nameColumn: 'UserID' })
    },
    {
      title: 'URL',
      dataIndex: 'url',
      width: '300px',
      render: (record: string) => {
        return (
          <div title={record} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {record}
          </div>
        );
      }
    },
    {
      title: 'Tài khoản',
      dataIndex: 'ho_ten',
      width: '120px',
      ...inputSearch({ dataIndex: 'ho_ten', operator: 'contain', nameColumn: 'Tài khoản' })
    },
    {
      title: 'Hành động',
      width: '240px',
      render: (record: any) => {
        return (
          <div
            title={`${record.mo_ta} - ${record.mo_ta_url}`}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {record.mo_ta} - {record.mo_ta_url}
          </div>
        );
      },
      ...inputSearch({ dataIndex: 'mo_ta_url', operator: 'contain', nameColumn: 'Tên menu' })
    },
    {
      title: 'Phân loại',
      dataIndex: 'phan_loai',
      width: '240px'
    },
    {
      title: 'Mức độ',
      dataIndex: 'muc_do',
      width: '120px',
      render: (record: string) => {
        return <Tag color={mucDoThaoTac.find((item) => item.value === record)?.color}>{record}</Tag>;
      },
      ...selectSearchWithOutApi({
        dataIndex: 'muc_do',
        operator: 'contain',
        options: mucDoThaoTac,
        nameColumn: 'Phân loại'
      })
    },
    {
      title: 'Kết quả',
      dataIndex: 'ket_qua',
      width: '80px',
      align: 'right'
    },
    {
      title: 'Thời gian',
      dataIndex: 'ngay_tao',
      align: 'right',
      width: '160px',
      render: (record: string) => {
        if (!record) return;
        return moment(record).format('DD/MM/YYYY HH:mm:ss');
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian' })
    }
  ];

  useEffect(() => {
    getDanhSach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
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
  );
};

export default DanhSachLogThaoTac;
