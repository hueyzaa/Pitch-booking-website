import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import { DatSanEntity } from '../types';

export const getDatSanColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaDatSan: React.ComponentType<{ path: string; id: number }>,
  XemDatSan: React.ComponentType<{ path: string; id: number }>
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
      render: (id: number, record: DatSanEntity) => {
        return (
          <BaseSpace size={0}>
            <XemDatSan path={path} id={id} />
            {permission.edit && <SuaDatSan path={path} id={id} />}
            {permission.delete && (
              <Delete
                path={path}
                title={`${t('common.dat-san')} - ${record.ten_khach_hang || ''}`}
                id={id}
                onShow={onRefresh}
              />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Mã đặt sân',
      dataIndex: 'ma_dat_san',
      width: '150px',
      align: 'center' as const,
      render: (record: string) => {
        return record ? (
          <span style={{ fontWeight: 600, fontFamily: 'monospace', color: '#1890ff' }}>{record}</span>
        ) : (
          '-'
        );
      },
      ...inputSearch({ dataIndex: 'dat_san.ma_dat_san', operator: 'contain', nameColumn: 'Mã đặt sân' })
    },
    {
      title: 'Khách hàng',
      dataIndex: 'ten_khach_hang',
      width: '200px',
      render: (_text: any, record: DatSanEntity) => {
        return (
          <div>
            <div style={{ fontWeight: 500 }}>{record.ten_khach_hang || '-'}</div>
            <small style={{ color: '#8c8c8c' }}>{record.so_dien_thoai_khach_hang || ''}</small>
          </div>
        );
      },
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
      title: 'Giảm giá',
      dataIndex: 'phan_tram_giam_gia',
      width: '120px',
      align: 'center' as const,
      render: (record: number) => {
        const pct = record || 0;
        return pct > 0 ? (
          <Tag color='blue' style={{ fontWeight: 'bold' }}>
            -{pct}%
          </Tag>
        ) : (
          '0%'
        );
      },
      ...inputSearch({ dataIndex: 'dat_san.phan_tram_giam_gia', operator: 'equal', nameColumn: 'Giảm giá' })
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'ngay_dat',
      width: '130px',
      align: 'center' as const,
      render: (record: string): string => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      },
      ...dateSearch({ dataIndex: 'dat_san.ngay_dat', nameColumn: 'Ngày đặt' })
    },
    {
      title: 'Thời gian',
      dataIndex: 'gio_bat_dau',
      width: '150px',
      align: 'center' as const,
      render: (_text: any, record: DatSanEntity): string => {
        const start = record.gio_bat_dau ? record.gio_bat_dau.substring(0, 5) : '';
        const end = record.gio_ket_thuc ? record.gio_ket_thuc.substring(0, 5) : '';
        return start && end ? `${start} - ${end}` : '';
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tong_tien',
      width: '140px',
      align: 'right' as const,
      render: (record: number) => {
        const value = Number(record) || 0;
        return (
          <span style={{ fontWeight: 600, color: '#096dd9' }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
          </span>
        );
      },
      ...inputSearch({ dataIndex: 'dat_san.tong_tien', operator: 'equal', nameColumn: 'Tổng tiền' })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: '150px',
      render: (record: number) => {
        switch (record) {
          case 0:
            return <Tag color='orange'>Chưa thanh toán</Tag>;
          case 1:
            return <Tag color='green'>Đã thanh toán</Tag>;
          case 2:
            return <Tag color='red'>Đã hủy</Tag>;
          default:
            return <Tag>Không rõ</Tag>;
        }
      },
      ...inputSearch({ dataIndex: 'dat_san.trang_thai', operator: 'equal', nameColumn: 'Trạng thái' })
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghi_chu',
      width: '200px',
      render: (record: string) => record || '-',
      ...inputSearch({ dataIndex: 'dat_san.ghi_chu', operator: 'contain', nameColumn: 'Ghi chú' })
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
      ...dateSearch({ dataIndex: 'dat_san.ngay_tao', nameColumn: 'Thời gian tạo' })
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
      ...dateSearch({ dataIndex: 'dat_san.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
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
