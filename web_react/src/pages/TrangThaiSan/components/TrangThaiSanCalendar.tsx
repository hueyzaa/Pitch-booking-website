import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Tooltip, Popover, Spin, Empty, Badge, Space } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API_URL } from '@app/configs/api-configs';
import { getDataSelect, getListData } from '@app/api/getData.api';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import SuaTrangThaiSan from '../SuaTrangThaiSan';



interface PitchOption {
  id: number;
  value: number;
  label: string;
}

interface SlotRecord {
  id: number;
  id_san: number;
  ten_san: string;
  ngay: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  trang_thai: number; // 0=Trống, 1=Đã đặt, 2=Bảo trì
  ghi_chu: string | null;
  ten_nguoi_tao: string | null;
}

interface TrangThaiSanCalendarProps {
  reloadTrigger: any;
  onEditSlot?: (id: number) => void;
  permission?: any;
  filterQuery?: any[];
}

export const TrangThaiSanCalendar = ({ reloadTrigger, onEditSlot, permission, filterQuery }: TrangThaiSanCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
  const [pitches, setPitches] = useState<PitchOption[]>([]);
  const [slots, setSlots] = useState<SlotRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Pitch Options on mount
  useEffect(() => {
    async function fetchPitches() {
      try {
        const data = await getDataSelect(API_URL.SAN + '/options');
        if (data && data.length > 0) {
          setPitches(data);
        }
      } catch (err) {
        console.error('Error fetching pitches options for calendar:', err);
      }
    }
    fetchPitches();
  }, []);

  // 2. Fetch Slots for the active week date range
  const fetchWeekSlots = async () => {
    setLoading(true);
    try {
      const startOfWeek = moment(currentDate).startOf('week').format('YYYY-MM-DD');
      const endOfWeek = moment(currentDate).endOf('week').format('YYYY-MM-DD');

      // Filter out 'trang_thai_san.ngay' to prevent conflict with weekly navigation
      const extraFilters = (filterQuery || []).filter((item: any) => item.field !== 'trang_thai_san.ngay');

      const params = {
        page: 1,
        limit: -1, // Retrieve all slots within this date range
        f: [
          {
            field: 'trang_thai_san.ngay',
            operator: 'between',
            value: JSON.stringify([startOfWeek, endOfWeek])
          },
          ...extraFilters
        ]
      };

      const res = await getListData(API_URL.TRANG_THAI_SAN, params);
      if (res && res.data) {
        setSlots(res.data);
      }
    } catch (err) {
      console.error('Error loading calendar slots:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sync currentDate if date filter is set in search form
  useEffect(() => {
    const dateFilter = (filterQuery || []).find((f: any) => f.field === 'trang_thai_san.ngay');
    if (dateFilter && dateFilter.value) {
      try {
        const dates = JSON.parse(dateFilter.value);
        if (dates && dates[0]) {
          const parsed = moment(dates[0]);
          if (parsed.isValid() && !parsed.isSame(currentDate, 'week')) {
            setCurrentDate(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to parse date filter:', e);
      }
    }
  }, [filterQuery]);

  useEffect(() => {
    fetchWeekSlots();
  }, [currentDate, reloadTrigger, filterQuery]);

  // Navigate dates
  const handlePrevWeek = () => {
    setCurrentDate(prev => moment(prev).subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => moment(prev).add(1, 'week'));
  };

  const handleToday = () => {
    setCurrentDate(moment());
  };

  // Grid Hours configurations
  const START_HOUR = 6;
  const END_HOUR = 22;
  const TOTAL_HOURS = END_HOUR - START_HOUR;

  const parseTimeToDecimal = (timeStr: string) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return hours + minutes / 60;
  };

  const getSlotStyle = (gioBatDau: string, gioKetThuc: string) => {
    const start = parseTimeToDecimal(gioBatDau);
    const end = parseTimeToDecimal(gioKetThuc);

    const clampedStart = Math.max(start, START_HOUR);
    const clampedEnd = Math.min(end, END_HOUR);

    if (clampedEnd <= clampedStart) {
      return { display: 'none' };
    }

    const topPercent = ((clampedStart - START_HOUR) / TOTAL_HOURS) * 100;
    const heightPercent = ((clampedEnd - clampedStart) / TOTAL_HOURS) * 100;

    return {
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
      position: 'absolute' as const,
      left: '2px',
      right: '2px',
      zIndex: 10
    };
  };

  // Generate week dates (Sunday to Saturday)
  const startOfWeek = moment(currentDate).startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, i) => moment(startOfWeek).add(i, 'days'));
  const weekRangeText = `${weekDays[0].format('DD/MM')} - ${weekDays[6].format('DD/MM/YYYY')}`;

  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const renderSlotBlock = (slot: SlotRecord) => {
    const style = getSlotStyle(slot.gio_bat_dau, slot.gio_ket_thuc);
    if (style.display === 'none') return null;

    let bgStyle = {};
    let textTitle = '';
    let borderStyle = 'solid 1px';

    if (slot.trang_thai === 1) {
      // Booked
      bgStyle = {
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: '#ffffff',
        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
      };
      textTitle = slot.ghi_chu || 'Đã đặt sân';
      borderStyle = 'none';
    } else if (slot.trang_thai === 2) {
      // Maintenance
      bgStyle = {
        background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #d97706 10px, #d97706 20px)',
        color: '#ffffff',
        boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)'
      };
      textTitle = 'Bảo trì';
      borderStyle = 'none';
    } else {
      // Available / Trống
      bgStyle = {
        background: 'rgba(240, 253, 244, 0.85)',
        color: '#166534',
        border: '1px dashed #bbf7d0',
      };
      textTitle = slot.ghi_chu || 'Sân trống';
    }

    const handleEditClick = () => {
      // Đóng popover trước khi mở modal sửa
      setOpenPopoverId(null);
    };

    const popoverContent = (
      <div style={{ padding: '4px', maxWidth: '280px' }}>
        <p style={{ margin: '0 0 4px 0' }}><strong>Khung giờ:</strong> {slot.gio_bat_dau.slice(0, 5)} - {slot.gio_ket_thuc.slice(0, 5)}</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Trạng thái:</strong> {slot.trang_thai === 0 ? 'Sân trống' : slot.trang_thai === 1 ? 'Đã đặt' : 'Bảo trì'}</p>
        {slot.ghi_chu && <p style={{ margin: '0 0 4px 0' }}><strong>Ghi chú:</strong> {slot.ghi_chu}</p>}
        {slot.ten_nguoi_tao && <p style={{ margin: '0 0 8px 0' }}><strong>Người tạo:</strong> {slot.ten_nguoi_tao}</p>}
        {permission?.edit && (
          <div style={{ textAlign: 'right', marginTop: '8px' }}>
            <SuaTrangThaiSan path={API_URL.TRANG_THAI_SAN} id={slot.id}>
              <Button size="small" type="primary" onClick={handleEditClick}>Chỉnh sửa</Button>
            </SuaTrangThaiSan>
          </div>
        )}
      </div>
    );

    return (
      <Popover
        key={slot.id}
        title={<strong>Chi tiết trạng thái</strong>}
        content={popoverContent}
        trigger="click"
        placement="top"
        open={openPopoverId === slot.id}
        onOpenChange={(visible) => {
          setOpenPopoverId(visible ? slot.id : null);
        }}
      >
        <div
          style={{
            ...style,
            ...bgStyle,
            borderRadius: '6px',
            padding: '4px 6px',
            fontSize: '11px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.filter = 'brightness(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.filter = 'none';
          }}
        >
          <span style={{ fontWeight: 600 }}>{slot.gio_bat_dau.slice(0, 5)} - {slot.gio_ket_thuc.slice(0, 5)}</span>
          <span style={{ fontSize: '10px', opacity: 0.9 }}>{textTitle}</span>
        </div>
      </Popover>
    );
  };

  const DAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <Card 
      style={{ 
        borderRadius: '16px', 
        border: '1px solid #f0f0f0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        background: '#ffffff'
      }}
    >
      {/* 1. Header Toolbar */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Space size="middle" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button icon={<LeftOutlined />} onClick={handlePrevWeek} size="small" />
            <Button onClick={handleToday} size="small" type="primary" ghost>Hôm nay</Button>
            <Button icon={<RightOutlined />} onClick={handleNextWeek} size="small" />
            <span style={{ fontWeight: 600, fontSize: '15px', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarOutlined /> TUẦN: {weekRangeText}
            </span>
          </Space>
        </Col>
        <Col>
          <Space>
            <Badge status="success" text="Trống" />
            <Badge color="#4f46e5" text="Đã đặt" />
            <Badge status="warning" text="Bảo trì" />
          </Space>
        </Col>
      </Row>

      {/* 2. Pitches Scheduler Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
          <Spin size="large" tip="Đang tải lịch sân..." />
        </div>
      ) : pitches.length === 0 ? (
        <Empty description="Không có sân nào được tìm thấy" />
      ) : (
        <Row gutter={[20, 20]}>
          {pitches.map((pitch) => {
            const pitchId = pitch.id || pitch.value;
            const pitchName = pitch.label;

            return (
              <Col xs={24} lg={12} key={pitchId}>
                <div 
                  style={{
                    border: '1px solid #eef2f6',
                    borderRadius: '12px',
                    padding: '16px',
                    background: '#fafbfc',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {/* Pitch Title */}
                  <div style={{ marginBottom: '14px', borderBottom: '2px solid #6366f1', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#1f1f1f' }}>
                      🌟 {pitchName.toUpperCase()}
                    </span>
                    <Tooltip title="Tình trạng tuần này">
                      <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                    </Tooltip>
                  </div>

                  {/* Grid Container */}
                  <div style={{ position: 'relative', background: '#ffffff', borderRadius: '8px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                    
                    {/* Days Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', borderBottom: '1px solid #f0f0f0', background: '#fafafa', textAlign: 'center', fontWeight: 600, fontSize: '11px', padding: '6px 0', color: '#595959' }}>
                      <div>Time</div>
                      {weekDays.map((day, idx) => (
                        <div key={idx} style={{ borderLeft: '1px solid #f0f0f0', background: day.isSame(moment(), 'day') ? '#e6f7ff' : 'transparent', color: day.isSame(moment(), 'day') ? '#1890ff' : '#595959' }}>
                          <div>{DAYS_SHORT[idx]}</div>
                          <div style={{ fontSize: '10px', opacity: 0.8 }}>{day.format('DD/MM')}</div>
                        </div>
                      ))}
                    </div>

                    {/* Scheduler Body */}
                    <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', height: '340px', position: 'relative' }}>
                      
                      {/* Left Hour labels */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '9px', color: '#8c8c8c', padding: '6px 2px', borderRight: '1px solid #f0f0f0', textAlign: 'right', background: '#fafafa' }}>
                        <div>06:00</div>
                        <div>08:00</div>
                        <div>10:00</div>
                        <div>12:00</div>
                        <div>14:00</div>
                        <div>16:00</div>
                        <div>18:00</div>
                        <div>20:00</div>
                        <div>22:00</div>
                      </div>

                      {/* Day columns & faint horizontal grids */}
                      {weekDays.map((day, idx) => {
                        const daySlots = slots.filter((slot) => {
                          return slot.id_san === pitchId && moment(slot.ngay).isSame(day, 'day');
                        });

                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              position: 'relative', 
                              height: '100%', 
                              borderLeft: '1px solid #f0f0f0',
                              // Draw clean grid lines for hours
                              background: 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
                              backgroundSize: '100% 42.5px' // (340px grid height / 8 vertical sections)
                            }}
                          >
                            {daySlots.map(slot => renderSlotBlock(slot))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </Card>
  );
};
