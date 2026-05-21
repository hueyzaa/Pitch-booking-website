import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import { ThuChiEntity } from '../types';

export const getThuChiColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaThuChi: React.ComponentType<{ path: string; id: number }>
) => {
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right' as const,
      width: '60px',
      render: (_text: any, _record: any, index: number) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center' as const,
      width: '120px',
      render: (id: number, record: ThuChiEntity) => {
        return (
          <BaseSpace size={0}>
            {permission.edit && <SuaThuChi path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.thu-chi')} ${record.danh_muc}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'loai_giao_dich',
      width: '130px',
      render: (record: number) => {
        return record === 1 ? <Tag color='green'>Thu</Tag> : <Tag color='volcano'>Chi</Tag>;
      },
      ...inputSearch({ dataIndex: 'thu_chi.loai_giao_dich', operator: 'equal', nameColumn: 'Loại giao dịch' })
    },
    {
      title: 'Danh mục',
      dataIndex: 'danh_muc',
      width: '180px',
      ...inputSearch({ dataIndex: 'thu_chi.danh_muc', operator: 'contain', nameColumn: 'Danh mục' })
    },
    {
      title: 'Số tiền',
      dataIndex: 'so_tien',
      width: '160px',
      align: 'right' as const,
      render: (record: number, row: ThuChiEntity) => {
        const isThu = row.loai_giao_dich === 1;
        const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record);
        return (
          <span style={{ color: isThu ? '#3f8600' : '#cf1322', fontWeight: 600 }}>
            {isThu ? `+ ${formatted}` : `- ${formatted}`}
          </span>
        );
      },
      ...inputSearch({ dataIndex: 'thu_chi.so_tien', operator: 'equal', nameColumn: 'Số tiền' })
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'ngay_giao_dich',
      width: '150px',
      align: 'center' as const,
      render: (record: string): string => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      },
      ...dateSearch({ dataIndex: 'thu_chi.ngay_giao_dich', nameColumn: 'Ngày giao dịch' })
    },
    {
      title: 'Khách hàng',
      dataIndex: 'ten_khach_hang',
      width: '180px',
      render: (record: string) => record || '-',
      ...inputSearch({ dataIndex: 'khach_hang.ho_va_ten', operator: 'contain', nameColumn: 'Khách hàng' })
    },
    {
      title: 'Sân',
      dataIndex: 'ten_san',
      width: '150px',
      render: (record: string) => {
        return record ? <Tag color='cyan'>{record}</Tag> : '-';
      },
      ...inputSearch({ dataIndex: 'san.ten_san', operator: 'contain', nameColumn: 'Sân' })
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      width: '200px',
      render: (record: string) => record || '-',
      ...inputSearch({ dataIndex: 'thu_chi.mo_ta', operator: 'contain', nameColumn: 'Mô tả' })
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghi_chu',
      width: '180px',
      render: (record: string) => record || '-',
      ...inputSearch({ dataIndex: 'thu_chi.ghi_chu', operator: 'contain', nameColumn: 'Ghi chú' })
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right' as const,
      width: '210px',
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'thu_chi.ngay_tao', nameColumn: 'Thời gian tạo' })
    },
    {
      width: '150px',
      title: 'Người tạo',
      dataIndex: 'ten_nguoi_tao',
      render: (record: string): string => record,
      ...inputSearch({ dataIndex: 'nguoi_tao.ho_va_ten', operator: 'contain', nameColumn: 'Người tạo' })
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'ngay_cap_nhat',
      align: 'right' as const,
      width: '210px',
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'thu_chi.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    },
    {
      title: 'Người cập nhật',
      width: '150px',
      dataIndex: 'ten_nguoi_cap_nhat',
      render: (record: string): string => record,
      ...inputSearch({ dataIndex: 'nguoi_cap_nhat.ho_va_ten', operator: 'contain', nameColumn: 'Người cập nhật' })
    }
  ];
};
