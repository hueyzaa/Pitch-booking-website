import React, { useState, useEffect } from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { Card, Statistic, Table, Tag, Spin, Empty, Progress, Badge, Space, Tooltip, Typography } from 'antd';
import {
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  RiseOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ToolOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { API_URL } from '@app/configs/api-configs';
import { getListData, getDataSelect } from '@app/api/getData.api';
import moment from 'moment';

const { Text, Title } = Typography;

// ─── Helpers ──────────────────────────────────────────────────

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

// ─── Animated Counter Component ──────────────────────────────

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display}</>;
};

// ─── Dashboard Component ─────────────────────────────────────

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // KPI data
  const [totalBookings, setTotalBookings] = useState(0);
  const [todayBookings, setTodayBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPitches, setTotalPitches] = useState(0);

  // Table data
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [pitchStatuses, setPitchStatuses] = useState<any[]>([]);

  // Revenue chart data (last 7 days)
  const [dailyRevenue, setDailyRevenue] = useState<{ date: string; revenue: number }[]>([]);

  // Stats by status
  const [bookingStats, setBookingStats] = useState({ pending: 0, paid: 0, cancelled: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const today = moment().format('YYYY-MM-DD');
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

      // 1. Fetch all bookings for total count & stats
      const allBookings = await getListData(API_URL.DAT_SAN, {
        page: 1,
        limit: -1
      });

      if (allBookings?.data) {
        const data = allBookings.data;
        setTotalBookings(data.length);

        // Count by status
        const pending = data.filter((b: any) => b.trang_thai === 0).length;
        const paid = data.filter((b: any) => b.trang_thai === 1).length;
        const cancelled = data.filter((b: any) => b.trang_thai === 2).length;
        setBookingStats({ pending, paid, cancelled });

        // Today's bookings
        const todayList = data.filter((b: any) => moment(b.ngay_dat).isSame(today, 'day'));
        setTodayBookings(todayList.length);

        // Recent bookings (last 10 non-cancelled)
        const sortedBookings = [...data]
          .filter((b: any) => b.trang_thai !== 2)
          .sort((a: any, b: any) => moment(b.ngay_tao).valueOf() - moment(a.ngay_tao).valueOf())
          .slice(0, 8);
        setRecentBookings(sortedBookings);
      }

      // 2. Fetch revenue data
      const allThuChi = await getListData(API_URL.THU_CHI, {
        page: 1,
        limit: -1
      });

      if (allThuChi?.data) {
        const thuData = allThuChi.data;
        // Total revenue (loai_giao_dich === 1 = Thu)
        const totalThu = thuData
          .filter((t: any) => t.loai_giao_dich === 1)
          .reduce((sum: number, t: any) => sum + Number(t.so_tien || 0), 0);
        setTotalRevenue(totalThu);

        // This month revenue
        const monthThu = thuData
          .filter(
            (t: any) =>
              t.loai_giao_dich === 1 && moment(t.ngay_giao_dich).isBetween(startOfMonth, endOfMonth, 'day', '[]')
          )
          .reduce((sum: number, t: any) => sum + Number(t.so_tien || 0), 0);
        setMonthRevenue(monthThu);

        // Daily revenue for last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => moment().subtract(6 - i, 'days'));
        const dailyData = last7Days.map((day) => {
          const dayStr = day.format('YYYY-MM-DD');
          const dayRevenue = thuData
            .filter((t: any) => t.loai_giao_dich === 1 && moment(t.ngay_giao_dich).isSame(dayStr, 'day'))
            .reduce((sum: number, t: any) => sum + Number(t.so_tien || 0), 0);
          return { date: day.format('DD/MM'), revenue: dayRevenue };
        });
        setDailyRevenue(dailyData);
      }

      // 3. Fetch customers count
      const customers = await getListData(API_URL.KHACH_HANG, {
        page: 1,
        limit: -1
      });
      if (customers?.data) {
        setTotalCustomers(customers.data.length);
      }

      // 4. Fetch pitches
      const pitches = await getDataSelect(API_URL.SAN + '/options');
      if (pitches) {
        setTotalPitches(pitches.length);
      }

      // 5. Fetch today's pitch statuses
      const statusRes = await getListData(API_URL.TRANG_THAI_SAN, {
        page: 1,
        limit: -1,
        f: [
          {
            field: 'trang_thai_san.ngay',
            operator: 'between',
            value: JSON.stringify([today, today])
          }
        ]
      });
      if (statusRes?.data) {
        setPitchStatuses(statusRes.data);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ─── KPI Card Component ──────────────────────────────────────

  const KPICard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    gradient: string;
    suffix?: string;
    subtitle?: string;
    subtitleValue?: string | number;
  }> = ({ title, value, icon, gradient, suffix, subtitle, subtitleValue }) => (
    <div
      style={{
        background: gradient,
        borderRadius: '16px',
        padding: '24px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.18)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          right: '30px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '13px', opacity: 0.85, marginBottom: '8px', fontWeight: 500 }}>{title}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.2 }}>
            {suffix === 'VND' ? (
              formatCurrency(value)
            ) : (
              <>
                <AnimatedNumber value={value} />
                {suffix && <span style={{ fontSize: '16px', marginLeft: '4px' }}>{suffix}</span>}
              </>
            )}
          </div>
        </div>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            backdropFilter: 'blur(8px)'
          }}
        >
          {icon}
        </div>
      </div>

      {subtitle && (
        <div
          style={{
            marginTop: '12px',
            fontSize: '12px',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <RiseOutlined />
          {subtitle}: <strong>{subtitleValue}</strong>
        </div>
      )}
    </div>
  );

  // ─── Mini Bar Chart (Pure CSS) ───────────────────────────────

  const MiniBarChart: React.FC<{ data: { date: string; revenue: number }[] }> = ({ data }) => {
    const maxVal = Math.max(...data.map((d) => d.revenue), 1);

    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', padding: '0 8px' }}>
        {data.map((item, idx) => {
          const heightPct = (item.revenue / maxVal) * 100;
          const isToday = idx === data.length - 1;
          return (
            <Tooltip key={idx} title={`${item.date}: ${formatCurrency(item.revenue)}`}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${Math.max(heightPct, 4)}%`,
                    background: isToday
                      ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                      : 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)',
                    borderRadius: '6px 6px 2px 2px',
                    minHeight: '6px',
                    transition: 'height 0.6s ease',
                    boxShadow: isToday ? '0 2px 8px rgba(245, 158, 11, 0.3)' : '0 2px 8px rgba(99, 102, 241, 0.2)'
                  }}
                />
                <span style={{ fontSize: '10px', color: '#8c8c8c', fontWeight: isToday ? 700 : 400 }}>{item.date}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  // ─── Recent Bookings Table ───────────────────────────────────

  const bookingColumns = [
    {
      title: 'Mã đặt sân',
      dataIndex: 'ma_dat_san',
      key: 'ma_dat_san',
      render: (text: string) => (
        <Text strong style={{ color: '#4f46e5', fontSize: '13px' }}>
          {text}
        </Text>
      )
    },
    {
      title: 'Khách hàng',
      dataIndex: 'ten_khach_hang',
      key: 'ten_khach_hang',
      render: (text: string) => <Text>{text || '—'}</Text>
    },
    {
      title: 'Sân',
      dataIndex: 'ten_san',
      key: 'ten_san',
      render: (text: string) => (
        <Tag color='blue' style={{ borderRadius: '8px' }}>
          {text}
        </Tag>
      )
    },
    {
      title: 'Ngày',
      dataIndex: 'ngay_dat',
      key: 'ngay_dat',
      render: (text: string) => moment(text).format('DD/MM/YYYY')
    },
    {
      title: 'Giờ',
      key: 'gio',
      render: (_: any, record: any) => (
        <span style={{ fontSize: '12px' }}>
          {record.gio_bat_dau?.slice(0, 5)} - {record.gio_ket_thuc?.slice(0, 5)}
        </span>
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tong_tien',
      key: 'tong_tien',
      render: (val: number) => (
        <Text strong style={{ color: '#059669' }}>
          {formatCurrency(val || 0)}
        </Text>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (status: number) => {
        const config: Record<number, { color: string; text: string }> = {
          0: { color: 'orange', text: 'Chưa thanh toán' },
          1: { color: 'green', text: 'Đã thanh toán' },
          2: { color: 'red', text: 'Đã hủy' }
        };
        const item = config[status] || { color: 'default', text: 'Không xác định' };
        return (
          <Tag color={item.color} style={{ borderRadius: '8px' }}>
            {item.text}
          </Tag>
        );
      }
    }
  ];

  // ─── Pitch Status Summary ────────────────────────────────────

  const getPitchStatusSummary = () => {
    const today = moment().format('YYYY-MM-DD');
    const summary: Record<string, { booked: number; maintenance: number; total: number }> = {};

    pitchStatuses.forEach((s: any) => {
      const name = s.ten_san || `Sân ${s.id_san}`;
      if (!summary[name]) {
        summary[name] = { booked: 0, maintenance: 0, total: 0 };
      }
      summary[name].total += 1;
      if (s.trang_thai === 1) summary[name].booked += 1;
      if (s.trang_thai === 2) summary[name].maintenance += 1;
    });

    return Object.entries(summary).map(([name, data]) => ({
      name,
      ...data
    }));
  };

  if (loading) {
    return (
      <>
        <PageTitle>Trang chủ</PageTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh'
          }}
        >
          <Spin size='large' tip='Đang tải dữ liệu dashboard...' />
        </div>
      </>
    );
  }

  const pitchSummary = getPitchStatusSummary();

  return (
    <>
      <PageTitle>Trang chủ</PageTitle>

      {/* ─── Section: Welcome Header ───────────────────────────── */}
      <div
        style={{
          marginBottom: '24px',
          padding: '20px 28px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          borderRadius: '16px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '22px', fontWeight: 700 }}>
            👋 Xin chào! Chào mừng đến với Hệ thống quản lý sân
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '6px 0 0', fontSize: '14px' }}>
            <CalendarOutlined style={{ marginRight: '6px' }} />
            {moment().format('dddd, DD/MM/YYYY')} — Tổng quan hoạt động hôm nay
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.1)',
            padding: '10px 18px',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <ThunderboltOutlined style={{ fontSize: '18px', color: '#f59e0b' }} />
          <span style={{ fontSize: '14px', fontWeight: 600 }}>{todayBookings} đặt sân hôm nay</span>
        </div>
      </div>

      {/* ─── Section: KPI Cards ────────────────────────────────── */}
      <BaseRow gutter={[20, 20]} style={{ marginBottom: '24px' }}>
        <BaseCol xs={24} sm={12} lg={6}>
          <KPICard
            title='TỔNG ĐẶT SÂN'
            value={totalBookings}
            icon={<ScheduleOutlined />}
            gradient='linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
            subtitle='Hôm nay'
            subtitleValue={todayBookings}
          />
        </BaseCol>
        <BaseCol xs={24} sm={12} lg={6}>
          <KPICard
            title='DOANH THU THÁNG NÀY'
            value={monthRevenue}
            icon={<DollarOutlined />}
            gradient='linear-gradient(135deg, #059669 0%, #047857 100%)'
            suffix='VND'
            subtitle='Tổng doanh thu'
            subtitleValue={formatCurrency(totalRevenue)}
          />
        </BaseCol>
        <BaseCol xs={24} sm={12} lg={6}>
          <KPICard
            title='KHÁCH HÀNG'
            value={totalCustomers}
            icon={<TeamOutlined />}
            gradient='linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            suffix='người'
          />
        </BaseCol>
        <BaseCol xs={24} sm={12} lg={6}>
          <KPICard
            title='SỐ SÂN'
            value={totalPitches}
            icon={<EnvironmentOutlined />}
            gradient='linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
            suffix='sân'
          />
        </BaseCol>
      </BaseRow>

      {/* ─── Section: Chart + Booking Stats ────────────────────── */}
      <BaseRow gutter={[20, 20]} style={{ marginBottom: '24px' }}>
        {/* Revenue Chart */}
        <BaseCol xs={24} lg={14}>
          <Card
            title={
              <span style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarOutlined style={{ color: '#6366f1' }} />
                Doanh thu 7 ngày gần nhất
              </span>
            }
            style={{
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              height: '100%'
            }}
            bodyStyle={{ padding: '20px 16px' }}
          >
            {dailyRevenue.length > 0 ? (
              <MiniBarChart data={dailyRevenue} />
            ) : (
              <Empty description='Chưa có dữ liệu doanh thu' />
            )}
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: '#f8f9fb',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#8c8c8c', fontSize: '12px' }}>Tổng 7 ngày</span>
              <span style={{ fontWeight: 700, color: '#4f46e5', fontSize: '16px' }}>
                {formatCurrency(dailyRevenue.reduce((sum, d) => sum + d.revenue, 0))}
              </span>
            </div>
          </Card>
        </BaseCol>

        {/* Booking Status Breakdown */}
        <BaseCol xs={24} lg={10}>
          <Card
            title={
              <span style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrophyOutlined style={{ color: '#f59e0b' }} />
                Phân bổ trạng thái đặt sân
              </span>
            }
            style={{
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              height: '100%'
            }}
            bodyStyle={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px'
            }}
          >
            {/* Paid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#059669' }} />
                  <Text style={{ fontSize: '13px' }}>Đã thanh toán</Text>
                </Space>
                <Text strong>{bookingStats.paid}</Text>
              </div>
              <Progress
                percent={totalBookings > 0 ? Math.round((bookingStats.paid / totalBookings) * 100) : 0}
                strokeColor={{ from: '#059669', to: '#34d399' }}
                showInfo={true}
                size='small'
                style={{ margin: 0 }}
              />
            </div>

            {/* Pending */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <Space>
                  <ClockCircleOutlined style={{ color: '#f59e0b' }} />
                  <Text style={{ fontSize: '13px' }}>Chưa thanh toán</Text>
                </Space>
                <Text strong>{bookingStats.pending}</Text>
              </div>
              <Progress
                percent={totalBookings > 0 ? Math.round((bookingStats.pending / totalBookings) * 100) : 0}
                strokeColor={{ from: '#f59e0b', to: '#fbbf24' }}
                showInfo={true}
                size='small'
                style={{ margin: 0 }}
              />
            </div>

            {/* Cancelled */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <Space>
                  <ToolOutlined style={{ color: '#ef4444' }} />
                  <Text style={{ fontSize: '13px' }}>Đã hủy</Text>
                </Space>
                <Text strong>{bookingStats.cancelled}</Text>
              </div>
              <Progress
                percent={totalBookings > 0 ? Math.round((bookingStats.cancelled / totalBookings) * 100) : 0}
                strokeColor={{ from: '#ef4444', to: '#f87171' }}
                showInfo={true}
                size='small'
                style={{ margin: 0 }}
              />
            </div>

            {/* Total indicator */}
            <div
              style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #f8f9fb 0%, #eef2f7 100%)',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#8c8c8c', fontSize: '12px' }}>Tổng số đặt sân</span>
              <span style={{ fontWeight: 700, color: '#1f1f1f', fontSize: '18px' }}>{totalBookings}</span>
            </div>
          </Card>
        </BaseCol>
      </BaseRow>

      {/* ─── Section: Today's Pitch Overview + Recent Bookings ─── */}
      <BaseRow gutter={[20, 20]} style={{ marginBottom: '24px' }}>
        {/* Pitch Status Today */}
        <BaseCol xs={24} lg={8}>
          <Card
            title={
              <span style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: '#6366f1' }} />
                Tình trạng sân hôm nay
              </span>
            }
            style={{
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              height: '100%'
            }}
            bodyStyle={{ padding: '16px' }}
          >
            {pitchSummary.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pitchSummary.map((pitch, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 16px',
                      background: '#fafbfc',
                      borderRadius: '12px',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f5ff';
                      e.currentTarget.style.borderColor = '#6366f1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fafbfc';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: '#1f1f1f' }}>
                      🌟 {pitch.name}
                    </div>
                    <Space size='middle'>
                      <Badge
                        color='#4f46e5'
                        text={
                          <span style={{ fontSize: '12px' }}>
                            Đã đặt: <strong>{pitch.booked}</strong>
                          </span>
                        }
                      />
                      <Badge
                        color='#f59e0b'
                        text={
                          <span style={{ fontSize: '12px' }}>
                            Bảo trì: <strong>{pitch.maintenance}</strong>
                          </span>
                        }
                      />
                    </Space>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description='Không có lịch sân hôm nay' style={{ padding: '30px 0' }} />
            )}
          </Card>
        </BaseCol>

        {/* Recent Bookings Table */}
        <BaseCol xs={24} lg={16}>
          <Card
            title={
              <span style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FieldTimeOutlined style={{ color: '#059669' }} />
                Đặt sân gần đây
              </span>
            }
            style={{
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              height: '100%'
            }}
            bodyStyle={{ padding: '0' }}
          >
            <Table
              dataSource={recentBookings}
              columns={bookingColumns}
              rowKey='id'
              pagination={false}
              size='small'
              scroll={{ x: 700 }}
              style={{ borderRadius: '0 0 16px 16px' }}
              locale={{ emptyText: <Empty description='Chưa có đặt sân nào' /> }}
            />
          </Card>
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default Home;
