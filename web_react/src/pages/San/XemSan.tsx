import React, { useState } from 'react';
import { EyeOutlined, EnvironmentOutlined, InfoCircleOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Tag, Image, Divider } from 'antd';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { apiURL } from '@app/configs/configs';

const AMENITY_MAP: Record<string, { label: string; color: string }> = {
  wifi: { label: 'Wifi miễn phí', color: 'blue' },
  local_parking: { label: 'Bãi đỗ xe lớn', color: 'orange' },
  shower: { label: 'Phòng tắm nóng lạnh', color: 'cyan' },
  coffee: { label: 'Nước uống & Căng tin', color: 'gold' },
  checkroom: { label: 'Phòng thay đồ', color: 'purple' },
  medical_services: { label: 'Sơ cứu y tế', color: 'red' }
};

const XemSan = ({ record }: { record: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const amenities = Array.isArray(record.tien_ich)
    ? record.tien_ich
    : typeof record.tien_ich === 'string'
      ? record.tien_ich
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const detailedImages = Array.isArray(record.anh_chi_tiet)
    ? record.anh_chi_tiet
    : typeof record.anh_chi_tiet === 'string'
      ? record.anh_chi_tiet
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const fullAddress = [record.dia_chi, record.ten_xa, record.ten_tinh].filter(Boolean).join(', ');

  const getImageUrlValue = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');
    return `${apiURL}/${cleanPath}`;
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title='Xem chi tiết sân' icon={<EyeOutlined />} />
      <BaseModal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AppstoreOutlined style={{ color: 'var(--primary-color)' }} />
            <span>CHI TIẾT SÂN BÓNG</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={true}
        centered
        width={800}
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>
        ]}
      >
        <div style={{ padding: '8px 0' }}>
          <BaseRow gutter={[24, 24]}>
            {/* Left section: Images */}
            <BaseCol span={24} md={10}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Image
                  src={getImageUrlValue(record.anh_chinh) || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={record.ten_san}
                  style={{
                    width: '100%',
                    maxHeight: '260px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}
                />
              </div>

              {detailedImages.length > 0 && (
                <div>
                  <BaseTypography.Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    Ảnh chi tiết:
                  </BaseTypography.Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <Image.PreviewGroup>
                      {detailedImages.map((img: string, idx: number) => (
                        <Image
                          key={idx}
                          src={getImageUrlValue(img)}
                          alt={`${record.ten_san} chi tiết ${idx + 1}`}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)'
                          }}
                        />
                      ))}
                    </Image.PreviewGroup>
                  </div>
                </div>
              )}
            </BaseCol>

            {/* Right section: Details */}
            <BaseCol span={24} md={14}>
              <div style={{ marginBottom: '16px' }}>
                <BaseTypography.Title level={3} style={{ margin: '0 0 8px 0', color: 'var(--primary-color)' }}>
                  {record.ten_san}
                </BaseTypography.Title>
                <Tag color='success' style={{ fontSize: '13px', padding: '2px 8px' }}>
                  {record.ten_loai_san}
                </Tag>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div style={{ marginBottom: '16px' }}>
                <BaseTypography.Text
                  strong
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}
                >
                  <EnvironmentOutlined style={{ color: 'var(--primary-color)' }} />
                  <span>Địa chỉ:</span>
                </BaseTypography.Text>
                <BaseTypography.Text style={{ fontSize: '14px', paddingLeft: '22px', display: 'block' }}>
                  {fullAddress || '-'}
                </BaseTypography.Text>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <BaseTypography.Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  Tiện ích sân:
                </BaseTypography.Text>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '8px' }}>
                  {amenities.length > 0 ? (
                    amenities.map((item: string) => {
                      const cleaned = item.trim();
                      const amInfo = AMENITY_MAP[cleaned] || { label: cleaned, color: 'blue' };
                      return (
                        <Tag color={amInfo.color} key={cleaned} style={{ fontSize: '13px', padding: '2px 8px' }}>
                          {amInfo.label}
                        </Tag>
                      );
                    })
                  ) : (
                    <BaseTypography.Text type='secondary' italic>
                      Không có tiện ích nào được cấu hình
                    </BaseTypography.Text>
                  )}
                </div>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div>
                <BaseTypography.Text
                  strong
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                >
                  <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />
                  <span>Mô tả chi tiết:</span>
                </BaseTypography.Text>
                <div
                  style={{
                    padding: '12px',
                    background: 'var(--background-color-light, #f9f9f9)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-color)',
                    maxHeight: '180px',
                    overflowY: 'auto',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {record.mo_ta || (
                    <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                      Chưa có mô tả chi tiết cho sân bóng này.
                    </span>
                  )}
                </div>
              </div>
            </BaseCol>
          </BaseRow>
        </div>
      </BaseModal>
    </>
  );
};

export default XemSan;
