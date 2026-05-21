import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';

export const getDoiTuongColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaDoiTuong: React.ComponentType<{ path: string; id: number }>
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
            {permission.edit && <SuaDoiTuong path={path} id={id} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.doi-tuong')} ${record.ten_doi_tuong}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên đối tượng',
      dataIndex: 'ten_doi_tuong',
      ...inputSearch({ dataIndex: 'ten_doi_tuong', operator: 'contain', nameColumn: 'Tên đối tượng' })
    },
    {
      title: 'Phần trăm giảm giá',
      dataIndex: 'phan_tram_giam_gia',
      width: '180px',
      align: 'right' as const,
      render: (record: number) => {
        return <Tag color='blue' style={{ fontWeight: 'bold' }}>{record ?? 0}%</Tag>;
      },
      ...inputSearch({ dataIndex: 'doi_tuong.phan_tram_giam_gia', operator: 'equal', nameColumn: 'Phần trăm giảm giá' })
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
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
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
      ...dateSearch({ dataIndex: 'ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
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
