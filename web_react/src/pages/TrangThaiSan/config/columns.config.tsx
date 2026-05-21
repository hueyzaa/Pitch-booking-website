import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import { TrangThaiSanEntity } from '../types';

export const getTrangThaiSanColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaTrangThaiSan: React.ComponentType<{ path: string; id: number }>
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
      render: (id: number, record: TrangThaiSanEntity) => {
        return (
          <BaseSpace size={0}>
            {permission.edit && <SuaTrangThaiSan path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.trang-thai-san')} ${record.ten_san || ''}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
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
      title: 'Ngày',
      dataIndex: 'ngay',
      width: '130px',
      align: 'center' as const,
      render: (record: string): string => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      },
      ...dateSearch({ dataIndex: 'trang_thai_san.ngay', nameColumn: 'Ngày' })
    },
    {
      title: 'Giờ bắt đầu',
      dataIndex: 'gio_bat_dau',
      width: '120px',
      align: 'center' as const,
      render: (record: string): string => {
        if (!record) return '';
        return record.substring(0, 5); // display as HH:mm
      },
      ...inputSearch({ dataIndex: 'trang_thai_san.gio_bat_dau', operator: 'contain', nameColumn: 'Giờ bắt đầu' })
    },
    {
      title: 'Giờ kết thúc',
      dataIndex: 'gio_ket_thuc',
      width: '120px',
      align: 'center' as const,
      render: (record: string): string => {
        if (!record) return '';
        return record.substring(0, 5); // display as HH:mm
      },
      ...inputSearch({ dataIndex: 'trang_thai_san.gio_ket_thuc', operator: 'contain', nameColumn: 'Giờ kết thúc' })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: '140px',
      render: (record: number) => {
        switch (record) {
          case 0:
            return <Tag color='green'>Trống</Tag>;
          case 1:
            return <Tag color='blue'>Đã đặt</Tag>;
          case 2:
            return <Tag color='volcano'>Bảo trì</Tag>;
          default:
            return <Tag>Không rõ</Tag>;
        }
      },
      ...inputSearch({ dataIndex: 'trang_thai_san.trang_thai', operator: 'equal', nameColumn: 'Trạng thái' })
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghi_chu',
      width: '200px',
      render: (record: string) => record || '-',
      ...inputSearch({ dataIndex: 'trang_thai_san.ghi_chu', operator: 'contain', nameColumn: 'Ghi chú' })
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
      ...dateSearch({ dataIndex: 'trang_thai_san.ngay_tao', nameColumn: 'Thời gian tạo' })
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
      ...dateSearch({ dataIndex: 'trang_thai_san.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
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
