import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { formatPrice } from '../utils/price.utils';
import { useAuth } from '../context/AuthContext';
import { getMyBookings } from '../api/api';
import { resolveAssetUrl } from '../utils/asset.utils';

interface BookingRecord {
  id: number;
  ma_dat_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  tong_tien: number;
  trang_thai: number; // 0=Chưa thanh toán, 1=Đã thanh toán, 2=Đã hủy
  ghi_chu: string | null;
  san?: {
    id: number;
    ten_san: string;
    anh_chinh?: string;
    dia_chi?: string;
  };
}

const menuItems = [
  { icon: 'dashboard', label: 'Tổng quan', key: 'overview' },
  { icon: 'history', label: 'Lịch sử đặt sân', key: 'history' },
  { icon: 'favorite', label: 'Sân yêu thích', key: 'favorites' },
  { icon: 'settings', label: 'Cài đặt cá nhân', key: 'settings' },
];

const statusMap: Record<number, { key: string; label: string; bg: string; color: string }> = {
  0: { key: 'pending', label: 'Chờ thanh toán', bg: 'rgba(251,191,36,0.15)', color: '#92400e' },
  1: { key: 'paid', label: 'Đã thanh toán', bg: 'rgba(16,185,129,0.15)', color: '#006c49' },
  2: { key: 'cancelled', label: 'Đã hủy', bg: 'rgba(239,68,68,0.15)', color: '#ba1a1a' },
};

const Dashboard: React.FC = () => {
  const { user: authUser, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('overview');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/dang-nhap');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!authUser?.tai_khoan) return;
      setBookingsLoading(true);
      try {
        const data = await getMyBookings(authUser.tai_khoan);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setBookingsLoading(false);
      }
    };
    if (isAuthenticated && authUser?.tai_khoan) {
      fetchBookings();
    }
  }, [isAuthenticated, authUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = authUser?.ho_va_ten || authUser?.ten || authUser?.tai_khoan || 'Khách đặt sân';

  // Calculate stats from real data
  const totalBookings = bookings.filter(b => b.trang_thai !== 2).length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlySpend = bookings
    .filter(b => {
      if (b.trang_thai === 2) return false;
      const d = new Date(b.ngay_dat);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, b) => sum + Number(b.tong_tien || 0), 0);
  const rewardPoints = Math.floor(totalBookings * 50);

  if (loading || !isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 160px)' }}>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <main className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile-card">
          {/* Avatar */}
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'var(--primary-container)',
                color: 'var(--on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '36px',
                border: '4px solid var(--primary-container)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            <button style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'var(--on-primary)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Icon name="edit" size={16} />
            </button>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--on-surface)', textAlign: 'center' }}>{displayName}</h3>
          <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', textAlign: 'center', marginBottom: '12px' }}>
            Thành viên từ {new Date().getFullYear()}
          </p>
          <div style={{
            display: 'inline-flex',
            padding: '6px 16px',
            background: 'var(--primary-container)',
            color: 'var(--on-primary)',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            margin: '0 auto',
          }}>
            Thành viên
          </div>
        </div>

        {/* Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '24px' }}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`dashboard-menu-item ${activeMenu === item.key ? 'dashboard-menu-item--active' : ''}`}
              onClick={() => setActiveMenu(item.key)}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          className="dashboard-menu-item" 
          style={{ marginTop: '16px', color: 'var(--error)' }}
          onClick={handleLogout}
        >
          <Icon name="logout" size={20} />
          <span>Đăng xuất</span>
        </button>

        {/* Reminder Card */}
        {bookings.length > 0 && (
          <div className="reminder-card">
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Lời nhắc!</h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px', lineHeight: '22px' }}>
              Bạn có trận bóng lúc 19:00 tối nay tại Sân Đại học Y.
            </p>
            <button style={{
              padding: '8px 16px',
              background: 'var(--surface-container-lowest)',
              color: 'var(--on-surface)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-main)',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}>
              Xem chi tiết
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Stats */}
        <div className="stats-grid">
          <motion.div className="stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--primary)' }}>
              <Icon name="stadium" size={24} />
            </div>
            <div>
              <p className="stat-label">Tổng sân đặt</p>
              <p className="stat-value">{totalBookings}</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
              <Icon name="receipt_long" size={24} />
            </div>
            <div>
              <p className="stat-label">Chi tiêu tháng</p>
              <p className="stat-value">{monthlySpend > 0 ? formatPrice(monthlySpend) : '0đ'}</p>
            </div>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="stat-icon" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>
              <Icon name="military_tech" size={24} />
            </div>
            <div>
              <p className="stat-label">Điểm thưởng</p>
              <p className="stat-value">{rewardPoints}</p>
            </div>
          </motion.div>
        </div>

        {/* Booking History */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Lịch sử đặt chỗ</h2>
            <button style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
              Xem tất cả
            </button>
          </div>

          {/* Table Header */}
          <div className="booking-table-header">
            <span style={{ flex: 2 }}>Tên sân / Địa chỉ</span>
            <span style={{ flex: 1.5 }}>Ngày & Giờ</span>
            <span style={{ flex: 1 }}>Giá tiền</span>
            <span style={{ flex: 1 }}>Trạng thái</span>
            <span style={{ width: '40px' }}></span>
          </div>

          {/* Table Body */}
          {bookingsLoading ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--on-surface-variant)' }}>
              <p style={{ fontSize: '14px' }}>Đang tải lịch sử đặt sân...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--on-surface-variant)' }}>
              <Icon name="history" size={48} style={{ opacity: 0.4, marginBottom: '16px', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 700, fontSize: '18px', color: 'var(--on-surface)' }}>Chưa có lịch sử đặt chỗ</p>
              <p style={{ fontSize: '14px', color: 'var(--outline)', marginTop: '8px', maxWidth: '360px', margin: '8px auto 24px' }}>
                Bạn chưa thực hiện giao dịch đặt sân nào trên hệ thống SportBooking.
              </p>
              <Link to="/san-the-thao" className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 700 }}>
                Tìm sân ngay
              </Link>
            </div>
          ) : (
            bookings.map((booking, i) => {
              const st = statusMap[booking.trang_thai] || statusMap[0];
              const pitchName = booking.san?.ten_san || 'Sân thể thao';
              const pitchImage = booking.san?.anh_chinh ? resolveAssetUrl(booking.san.anh_chinh) : resolveAssetUrl(undefined);
              const pitchAddress = booking.san?.dia_chi || '';
              return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="booking-row"
              >
                <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={pitchImage}
                    alt={pitchName}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '14px' }}>{pitchName}</p>
                    <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{pitchAddress}</p>
                  </div>
                </div>
                <div style={{ flex: 1.5 }}>
                  <p style={{ fontWeight: 500, fontSize: '14px' }}>{booking.ngay_dat}</p>
                  <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{booking.gio_bat_dau} - {booking.gio_ket_thuc}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '14px' }}>{formatPrice(Number(booking.tong_tien))}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: st.bg,
                    color: st.color,
                  }}>
                    {st.label}
                  </span>
                </div>
                <div style={{ width: '40px', textAlign: 'center' }}>
                  <Link to={`/san-the-thao/${booking.san?.id || booking.id}`} style={{ color: 'var(--on-surface-variant)' }}>
                    <Icon name="open_in_new" size={20} />
                  </Link>
                </div>
              </motion.div>
              );
            })
          )}
        </div>

        {/* Favorite Pitches */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Sân yêu thích</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
              Thêm mới <Icon name="add_circle" size={18} />
            </button>
          </div>

            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--on-surface-variant)' }}>
              <Icon name="favorite_border" size={40} style={{ opacity: 0.4, marginBottom: '12px', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--on-surface)' }}>Chưa có sân yêu thích</p>
              <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '6px' }}>
                Bấm vào biểu tượng trái tim khi xem thông tin các sân để lưu danh sách sân yêu thích của bạn tại đây.
              </p>
            </div>
        </div>
      </div>

      <style>{`
        .dashboard-layout {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 32px var(--margin-desktop);
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
        }
        .dashboard-profile-card {
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
        }
        .dashboard-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: none;
          background: transparent;
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
        }
        .dashboard-menu-item:hover {
          background: var(--surface-container-low);
        }
        .dashboard-menu-item--active {
          background: var(--surface-container-low);
          color: var(--primary);
          font-weight: 700;
        }
        .reminder-card {
          margin-top: 24px;
          padding: 24px;
          background: linear-gradient(135deg, var(--primary) 0%, #004d34 100%);
          border-radius: 16px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--on-surface-variant);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--on-surface);
          line-height: 1.2;
        }
        .section-card {
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
        }
        .booking-table-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid var(--outline-variant);
          font-size: 12px;
          font-weight: 600;
          color: var(--on-surface-variant);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .booking-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(187, 202, 191, 0.2);
        }
        .booking-row:last-child {
          border-bottom: none;
        }
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .fav-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        @media (max-width: 900px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .booking-table-header {
            display: none;
          }
          .booking-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .fav-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .fav-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
};

export default Dashboard;
