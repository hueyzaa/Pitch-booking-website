import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';

export const getKhachHangColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaKhachHang: React.ComponentType<{ path: string; id: number }>,
  XemKhachHang: React.ComponentType<{ path: string; id: number }>
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
            <XemKhachHang path={path} id={id} />
            {permission.edit && <SuaKhachHang path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.khach-hang')} ${record.ho_va_ten}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Họ và tên',
      dataIndex: 'ho_va_ten',
      ...inputSearch({ dataIndex: 'ho_va_ten', operator: 'contain', nameColumn: 'Họ và tên' })
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioi_tinh',
      width: '100px',
      render: (record: number | null) => {
        if (record === null || record === undefined) return '';
        return record === 1 ? 'Nam' : 'Nữ';
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngay_sinh',
      width: '120px',
      render: (record: string | null) => {
        if (!record) return '';
        return moment(record).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'so_dien_thoai',
      ...inputSearch({ dataIndex: 'so_dien_thoai', operator: 'contain', nameColumn: 'Số điện thoại' })
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...inputSearch({ dataIndex: 'email', operator: 'contain', nameColumn: 'Email' })
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'dia_chi',
      ...inputSearch({ dataIndex: 'dia_chi', operator: 'contain', nameColumn: 'Địa chỉ' })
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
      ...dateSearch({ dataIndex: 'khach_hang.ngay_tao', nameColumn: 'Thời gian tạo' })
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
      ...dateSearch({ dataIndex: 'khach_hang.ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
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
