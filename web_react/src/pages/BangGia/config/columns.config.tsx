import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';

export const getBangGiaColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaBangGia: React.ComponentType<{ path: string; id: number }>,
  XemBangGia: React.ComponentType<{ path: string; id: number }>
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
            <XemBangGia path={path} id={id} />
            {permission.edit && <SuaBangGia path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.bang-gia')} ${record.ten_bang_gia}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên bảng giá',
      dataIndex: 'ten_bang_gia',
      ...inputSearch({ dataIndex: 'ten_bang_gia', operator: 'contain', nameColumn: 'Tên bảng giá' })
    },
    {
      title: 'Đơn giá (VNĐ)',
      dataIndex: 'don_gia',
      align: 'right' as const,
      width: '160px',
      render: (record: number) => {
        if (record === null || record === undefined) return '';
        return new Intl.NumberFormat('vi-VN').format(record);
      }
    },
    {
      title: 'Giờ bắt đầu',
      dataIndex: 'gio_bat_dau',
      width: '120px',
      render: (record: string | null) => record || ''
    },
    {
      title: 'Giờ kết thúc',
      dataIndex: 'gio_ket_thuc',
      width: '120px',
      render: (record: string | null) => record || ''
    },
    {
      title: 'Loại sân',
      dataIndex: 'ten_loai_san',
      render: (record: string) => {
        if (!record) return '';
        return <Tag color='blue'>{record}</Tag>;
      },
      ...inputSearch({ dataIndex: 'loai_san.ten_loai_san', operator: 'contain', nameColumn: 'Loại sân' })
    },
    {
      title: 'Đối tượng',
      dataIndex: 'ten_doi_tuong',
      render: (record: string) => {
        if (!record) return '';
        let color = 'blue';
        const name = record.toLowerCase();
        if (name.includes('vãng lai')) {
          color = 'volcano';
        } else if (name.includes('thành viên') || name.includes('vip')) {
          color = 'gold';
        } else if (name.includes('sinh viên') || name.includes('học sinh')) {
          color = 'green';
        }
        return <Tag color={color}>{record}</Tag>;
      },
      ...inputSearch({ dataIndex: 'doi_tuong.ten_doi_tuong', operator: 'contain', nameColumn: 'Đối tượng' })
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
      ...dateSearch({ dataIndex: 'bang_gia.ngay_tao', nameColumn: 'Thời gian tạo' })
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
      ...dateSearch({ dataIndex: 'bang_gia.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
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
