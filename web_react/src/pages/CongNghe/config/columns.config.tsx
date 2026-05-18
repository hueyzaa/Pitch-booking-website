import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import { CongNgheEntity } from '../types';
import { STATUS_ACTIVE, COLUMN_WIDTHS } from '../constants';

/**
 * Generate table columns configuration for technology list
 */
export const getTechnologyColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  SuaCongNghe: React.ComponentType<{ path: string; id: number; existingOrders?: number[] }>,
  XemCongNghe: React.ComponentType<{ path: string; id: number }>,
  existingOrders: number[] = []
) => {
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right' as const,
      width: COLUMN_WIDTHS.STT,
      render: (_text: any, _record: any, index: number) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center' as const,
      width: COLUMN_WIDTHS.ACTION,
      render: (id: number, record: CongNgheEntity) => {
        return (
          <BaseSpace size={0}>
            <XemCongNghe path={path} id={id} />
            {permission.edit && <SuaCongNghe path={path} id={id} existingOrders={existingOrders} />}
            {permission.delete && (
              <Delete path={path} title={`${t('common.cong-nghe')} ${record.ten}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      ...inputSearch({ dataIndex: 'ten', operator: 'contain', nameColumn: 'Tên công nghệ' })
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      width: COLUMN_WIDTHS.MO_TA,
      ...inputSearch({ dataIndex: 'mo_ta', operator: 'contain', nameColumn: 'Mô tả' })
    },
    {
      title: 'Màu sắc',
      dataIndex: 'mau',
      width: COLUMN_WIDTHS.MAU,
      render: (mau: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: mau || '#ccc' }} />
          <span>{mau}</span>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: COLUMN_WIDTHS.TRANG_THAI,
      render: (trang_thai: number) => (
        <Tag color={trang_thai === STATUS_ACTIVE ? 'success' : 'default'}>
          {trang_thai === STATUS_ACTIVE ? 'Hoạt động' : 'Ngưng'}
        </Tag>
      )
    },
    {
      title: 'Thứ tự',
      dataIndex: 'thu_tu',
      width: 100,
      align: 'center' as const,
      sorter: (a: any, b: any) => a.thu_tu - b.thu_tu,
      render: (thu_tu: number) => <b>{thu_tu}</b>
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right' as const,
      width: COLUMN_WIDTHS.NGAY_TAO,
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    }
  ];
};
