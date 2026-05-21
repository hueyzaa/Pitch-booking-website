import { EyeOutlined, CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Row, Col, Divider, Tag } from 'antd';

const XemDatSan = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showModal = async () => {
    setIsLoading(true);
    try {
      const result = await getDataById(id, path);
      setData(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleHuyLich = () => {
    setIsActionLoading(true);
    patchData(
      path,
      id,
      { trang_thai: 2 },
      () => {
        setIsActionLoading(false);
        handleCancel();
        dispatch(appActions.toggleReload('DANH_SACH'));
      }
    );
  };

  const handleThanhToan = () => {
    setIsActionLoading(true);
    patchData(
      path,
      id,
      { trang_thai: 1 },
      () => {
        setIsActionLoading(false);
        handleCancel();
        dispatch(appActions.toggleReload('DANH_SACH'));
      }
    );
  };

  const formatVND = (value: number) => {
    const amount = Number(value) || 0;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'vnđ');
  };

  const getVietnameseDayOfWeek = (dateStr: string) => {
    if (!dateStr) return '';
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayIndex = moment(dateStr).day();
    return days[dayIndex];
  };

  const formatFullDate = (dateStr: string) => {
    if (!dateStr) return '';
    const dayOfWeek = getVietnameseDayOfWeek(dateStr);
    const formattedDate = moment(dateStr).format('DD-MM-YYYY');
    return `${dayOfWeek} ${formattedDate}`;
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title="Xem chi tiết" icon={<EyeOutlined />} loading={isLoading} />
      <BaseModal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        width={950}
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>,
          data && data.trang_thai !== 2 && (
            <BaseButton
              key='cancel-booking'
              size='small'
              danger
              onClick={handleHuyLich}
              loading={isActionLoading}
            >
              Hủy lịch đặt
            </BaseButton>
          ),
          data && data.trang_thai === 0 && (
            <BaseButton
              key='pay-booking'
              size='small'
              type='primary'
              onClick={handleThanhToan}
              loading={isActionLoading}
            >
              Thanh toán
            </BaseButton>
          )
        ]}
      >
        {data && (
          <div style={{ padding: '8px 4px' }}>
            <Row gutter={32}>
              {/* Left Panel */}
              <Col span={11}>
                {/* Section: Thông tin khách hàng */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', marginBottom: 16 }}>
                    Thông tin khách hàng
                  </h3>
                  <Row gutter={[16, 12]}>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Tên khách hàng</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>
                        {data.khach_hang?.ho_va_ten || data.ten_khach_hang || '-'}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Số điện thoại</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>
                        {data.khach_hang?.so_dien_thoai || data.so_dien_thoai_khach_hang || '-'}
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider style={{ margin: '16px 0', borderColor: '#f0f0f0' }} />

                {/* Section: Thông tin lịch đặt */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', marginBottom: 16 }}>
                    Thông tin lịch đặt
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Mã lịch đặt</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1890ff', fontFamily: 'monospace' }}>
                        {data.ma_dat_san ? `#${data.ma_dat_san}` : `-`}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Ngày bắt đầu</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#262626' }}>
                        {data.ngay_dat ? moment(data.ngay_dat).format('DD/MM/YYYY') : '-'}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Ngày và giờ đặt lịch</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#262626' }}>
                        {data.ngay_tao ? moment(data.ngay_tao).format('DD/MM/YYYY HH:mm') : '-'}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Trạng thái thanh toán</div>
                      <div style={{ marginTop: 4 }}>
                        {data.trang_thai === 1 ? (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#eefbf3',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: '#15803d',
                            fontWeight: 600,
                            fontSize: 13
                          }}>
                            <CheckCircleFilled style={{ color: '#16a34a', marginRight: 8, fontSize: '15px' }} />
                            Đã thanh toán
                          </div>
                        ) : data.trang_thai === 2 ? (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#fef2f2',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: '#b91c1c',
                            fontWeight: 600,
                            fontSize: 13
                          }}>
                            <CloseCircleFilled style={{ color: '#dc2626', marginRight: 8, fontSize: '15px' }} />
                            Đã hủy
                          </div>
                        ) : (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#fffbeb',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: '#b45309',
                            fontWeight: 600,
                            fontSize: 13
                          }}>
                            <ClockCircleFilled style={{ color: '#d97706', marginRight: 8, fontSize: '15px' }} />
                            Chưa thanh toán
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>Ghi chú</div>
                      <div style={{ fontSize: 14, color: '#595959', fontStyle: data.ghi_chu ? 'normal' : 'italic' }}>
                        {data.ghi_chu || 'Không có ghi chú'}
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider style={{ margin: '16px 0', borderColor: '#f0f0f0' }} />

                {/* Section: Tổng số tiền */}
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>
                    Tổng số tiền
                  </div>
                  <div style={{ color: '#ff4d4f', fontSize: 28, fontWeight: 700, marginTop: 8 }}>
                    {formatVND(data.tong_tien)}
                  </div>
                </div>
              </Col>

              {/* Vertical Separator */}
              <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 1, height: '100%', minHeight: 350, background: '#f0f0f0' }} />
              </Col>

              {/* Right Panel */}
              <Col span={12}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f', marginBottom: 16 }}>
                  Chi tiết lịch đặt
                </h3>
                <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f0f5ff' }}>
                        <th style={{
                          padding: '12px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          color: '#1d39c4',
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: 'center'
                        }}>Ngày</th>
                        <th style={{
                          padding: '12px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          color: '#1d39c4',
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: 'center'
                        }}>Thời gian</th>
                        <th style={{
                          padding: '12px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          color: '#1d39c4',
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: 'center'
                        }}>Sân</th>
                        <th style={{
                          padding: '12px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          color: '#1d39c4',
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: 'center'
                        }}>Tiền</th>
                        <th style={{
                          padding: '12px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          color: '#1d39c4',
                          fontWeight: 600,
                          fontSize: 13,
                          textAlign: 'center',
                          width: '60px'
                        }}>Hủy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          fontSize: 13,
                          color: '#262626',
                          textAlign: 'center'
                        }}>
                          {formatFullDate(data.ngay_dat)}
                        </td>
                        <td style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          fontSize: 13,
                          color: '#262626',
                          textAlign: 'center',
                          fontWeight: 500
                        }}>
                          {data.gio_bat_dau?.substring(0, 5)} - {data.gio_ket_thuc?.substring(0, 5)}
                        </td>
                        <td style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          fontSize: 13,
                          textAlign: 'center'
                        }}>
                          <Tag color="cyan" style={{ margin: 0, fontWeight: 500 }}>
                            {data.san?.ten_san || data.ten_san || '-'}
                          </Tag>
                        </td>
                        <td style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          borderRight: '1px solid #f0f0f0',
                          fontSize: 13,
                          color: '#262626',
                          textAlign: 'right',
                          fontWeight: 600,
                          paddingRight: 12
                        }}>
                          {formatVND(data.tong_tien)}
                        </td>
                        <td style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: 14,
                          textAlign: 'center',
                          color: '#bfbfbf'
                        }}>
                          <DeleteOutlined style={{ cursor: 'not-allowed' }} title="Không thể xóa trực tiếp ở đây" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </BaseModal>
    </>
  );
};

export default XemDatSan;
