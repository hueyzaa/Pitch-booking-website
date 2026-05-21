import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';

export const getQuanLyGiaColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaQuanLyGia: React.ComponentType<{ path: string; id: number }>,
  XemQuanLyGia: React.ComponentType<{ path: string; id: number }>
) => {
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right' as const,
      width: '50px',
      render: (_text: any, _record: any, index: number) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center' as const,
      width: '120px',
      render: (id: number, record: any) => {
        return (
          <BaseSpace size={0}>
            <XemQuanLyGia path={path} id={id} />
            {permission.edit && <SuaQuanLyGia path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.quan-ly-gia')} #${record.id}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Sân',
      dataIndex: 'ten_san',
      render: (record: string) => {
        if (!record) return '';
        return <Tag color='cyan'>{record}</Tag>;
      },
      ...inputSearch({ dataIndex: 'san.ten_san', operator: 'contain', nameColumn: 'Sân' })
    },
    {
      title: 'Giá sân theo giờ (VNĐ)',
      dataIndex: 'gia_theo_gio',
      align: 'right' as const,
      width: '180px',
      render: (record: number) => {
        if (record === null || record === undefined) return '';
        return new Intl.NumberFormat('vi-VN').format(record);
      }
    },

    {
      title: 'Ngày bắt đầu',
      dataIndex: 'ngay_bat_dau',
      width: '130px',
      render: (record: string | null) => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      },
      ...dateSearch({ dataIndex: 'quan_ly_gia.ngay_bat_dau', nameColumn: 'Ngày bắt đầu' })
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'ngay_ket_thuc',
      width: '130px',
      render: (record: string | null) => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      },
      ...dateSearch({ dataIndex: 'quan_ly_gia.ngay_ket_thuc', nameColumn: 'Ngày kết thúc' })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: '140px',
      render: (record: number) => {
        if (record === 1) return <Tag color='green'>Đang áp dụng</Tag>;
        return <Tag color='default'>Ngừng áp dụng</Tag>;
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghi_chu',
      ...inputSearch({ dataIndex: 'ghi_chu', operator: 'contain', nameColumn: 'Ghi chú' })
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
      ...dateSearch({ dataIndex: 'quan_ly_gia.ngay_tao', nameColumn: 'Thời gian tạo' })
    },
    {
      width: '210px',
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
      ...dateSearch({ dataIndex: 'quan_ly_gia.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    },
    {
      title: 'Người cập nhật',
      width: '210px',
      dataIndex: 'ten_nguoi_cap_nhat',
      render: (record: string): string => record,
      ...inputSearch({ dataIndex: 'nguoi_cap_nhat.ho_va_ten', operator: 'contain', nameColumn: 'Người cập nhật' })
    }
  ];
};
