import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import { EditOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import XemSan from '../XemSan';

const AMENITY_MAP: Record<string, { label: string }> = {
  wifi: { label: 'Wifi miễn phí' },
  local_parking: { label: 'Bãi đỗ xe lớn' },
  shower: { label: 'Phòng tắm nóng lạnh' },
  coffee: { label: 'Nước uống & Căng tin' },
  checkroom: { label: 'Phòng thay đồ' },
  medical_services: { label: 'Sơ cứu y tế' }
};

export const getSanColumns = (
  filter: { page: number; limit?: number },
  permission: any,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string,
  navigate: (url: string) => void
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
            <XemSan record={record} />
            {permission.edit && (
              <BaseButton
                onClick={() => navigate(`/san/sua/${id}`)}
                type='text'
                size='small'
                title={`Sửa ${t('common.san').toLowerCase()}`}
                icon={<EditOutlined />}
              />
            )}
            {permission.delete && (
              <Delete path={path} title={`${t('common.san')} ${record.ten_san}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên sân',
      dataIndex: 'ten_san',
      render: (text: string) => (
        <div title={text} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      ),
      ...inputSearch({ dataIndex: 'ten_san', operator: 'contain', nameColumn: 'Tên sân' })
    },
    {
      title: 'Loại sân',
      dataIndex: 'ten_loai_san',
      render: (text: string) => (
        <div title={text} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      ),
      ...inputSearch({ dataIndex: 'loai_san.ten_loai_san', operator: 'contain', nameColumn: 'Loại sân' })
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'dia_chi',
      width: '250px',
      render: (text: string, record: any) => {
        const parts = [text, record.ten_xa, record.ten_tinh].filter(Boolean);
        const fullAddress = parts.join(', ') || '-';
        return (
          <div title={fullAddress} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {fullAddress}
          </div>
        );
      },
      ...inputSearch({ dataIndex: 'san.dia_chi', operator: 'contain', nameColumn: 'Địa chỉ' })
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      width: '300px',
      render: (text: string) => {
        if (!text) return '-';
        const display = text.length > 80 ? `${text.substring(0, 80)}...` : text;
        return (
          <div title={text} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {display}
          </div>
        );
      },
      ...inputSearch({ dataIndex: 'san.mo_ta', operator: 'contain', nameColumn: 'Mô tả' })
    },
    {
      title: 'Tiện ích',
      dataIndex: 'tien_ich',
      width: '300px',
      render: (record: any) => {
        if (!record) return '-';
        const items = Array.isArray(record) ? record : typeof record === 'string' ? record.split(',') : [];
        const filteredItems = items.filter(Boolean);
        if (filteredItems.length === 0) return '-';
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {filteredItems.map((item: string) => {
              const cleaned = item.trim();
              const label = AMENITY_MAP[cleaned]?.label || cleaned;
              return (
                <Tag color='blue' key={cleaned}>
                  {label}
                </Tag>
              );
            })}
          </div>
        );
      }
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
      render: (record: string): any => {
        if (!record) return '-';
        return (
          <div title={record} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {record}
          </div>
        );
      },
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
      render: (record: string): any => {
        if (!record) return '-';
        return (
          <div title={record} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {record}
          </div>
        );
      },
      ...inputSearch({ dataIndex: 'nguoi_cap_nhat.ho_va_ten', operator: 'contain', nameColumn: 'Người cập nhật' })
    }
  ];
};
