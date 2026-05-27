import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { formatPrice } from '../utils/price.utils';
import { useAuth } from '../context/AuthContext';
import { getMyBookings, getProfile, updateProfile, changePassword, getPitchDetail, uploadAvatar } from '../api/api';
import PitchCard from '../components/PitchCard';
import { resolveAssetUrl } from '../utils/asset.utils';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import toast from 'react-hot-toast';

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
  const { user: authUser, logout, isAuthenticated, loading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('overview');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [favoritePitchesData, setFavoritePitchesData] = useState<any[]>([]);
  const [profileForm, setProfileForm] = useState({ ho: '', ten: '', so_dien_thoai: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({ mat_khau_hien_tai: '', mat_khau_moi: '' });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const upcomingBooking = React.useMemo(() => {
    if (!bookings || bookings.length === 0) return null;
    const now = new Date();
    
    const upcoming = bookings
      .filter(b => b.trang_thai !== 2)
      .filter(b => {
        try {
          const bDate = new Date(`${b.ngay_dat}T${b.gio_bat_dau}`);
          return bDate.getTime() > now.getTime();
        } catch(e) { return false; }
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.ngay_dat}T${a.gio_bat_dau}`);
        const dateB = new Date(`${b.ngay_dat}T${b.gio_bat_dau}`);
        return dateA.getTime() - dateB.getTime();
      });

    return upcoming.length > 0 ? upcoming[0] : null;
  }, [bookings]);

  const onCropComplete = React.useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      
      const res = await uploadAvatar(croppedImage);
      toast.success('Cập nhật ảnh đại diện thành công!');
      if (res?.avatar || typeof res === 'string') {
        const path = typeof res === 'string' ? res : res.avatar;
        const freshUrl = resolveAssetUrl(path) + '?t=' + new Date().getTime();
        setAvatarUrl(freshUrl);
        updateUser({ avatar: path });
      } else {
        setAvatarUrl(URL.createObjectURL(croppedImage));
      }
      setIsCropModalOpen(false);
      setImageSrc(null);
    } catch (e: any) {
      console.error(e);
      toast.error('Lỗi cắt ảnh: ' + e.message);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let savedFavorites: number[] = [];
        if (isAuthenticated && authUser?.san_yeu_thich) {
          try { savedFavorites = JSON.parse(authUser.san_yeu_thich); } catch {}
        } else {
          savedFavorites = JSON.parse(localStorage.getItem('favorite_pitches') || '[]');
        }
        
        if (savedFavorites.length === 0) {
          setFavoritePitchesData([]);
          return;
        }
        const pitches = await Promise.all(
          savedFavorites.map(id => getPitchDetail(id).catch(() => null))
        );
        setFavoritePitchesData(pitches.filter(p => p !== null));
      } catch (err) {
        console.error('Failed to load favorites', err);
      }
    };
    if (activeMenu === 'favorites') {
      fetchFavorites();
    }
  }, [activeMenu, isAuthenticated, authUser]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileForm({
          ho: data.ho || '',
          ten: data.ten || '',
          so_dien_thoai: data.so_dien_thoai || '',
          email: data.email || ''
        });
        if (data.avatar) {
          setAvatarUrl(resolveAssetUrl(data.avatar));
        }
        updateUser(data);
      } catch (e) {}
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result?.toString() || null);
      setIsCropModalOpen(true);
    });
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    try {
      const ho_va_ten = `${profileForm.ho || ''} ${profileForm.ten || ''}`.trim();
      await updateProfile({ ...profileForm, ho_va_ten });
      toast.success('Cập nhật thông tin thành công!');
    } catch (e: any) {
      toast.error(e.message || 'Cập nhật thất bại');
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (!passwordForm.mat_khau_hien_tai || !passwordForm.mat_khau_moi) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }
    try {
      await changePassword({
        mat_khau_hien_tai: passwordForm.mat_khau_hien_tai,
        mat_khau_moi: passwordForm.mat_khau_moi,
        is_first_change: false
      });
      alert('Đổi mật khẩu thành công!');
      setPasswordForm({ mat_khau_hien_tai: '', mat_khau_moi: '' });
    } catch (e: any) {
      alert(e.message || 'Đổi mật khẩu thất bại');
    }
  };

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

  const displayNameRaw = authUser?.ho_va_ten?.replace(/undefined/g, '')?.trim();
  const displayName = displayNameRaw || authUser?.ten || authUser?.tai_khoan || 'Khách đặt sân';

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
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile-card">
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
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden'
              }}>
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={() => {
                      setAvatarUrl(null);
                    }}
                  />
                ) : (
                  displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                )}
              </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
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
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              style={{ display: 'none' }} 
            />
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
            {authUser?.doi_tuong?.ten_doi_tuong || 'Thành viên'}
          </div>
        </div>

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
            {upcomingBooking ? (
              <>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px', lineHeight: '22px' }}>
                  Bạn có trận bóng lúc {upcomingBooking.gio_bat_dau?.slice(0, 5)} ngày {upcomingBooking.ngay_dat} tại {upcomingBooking.san?.ten_san || 'Sân thể thao'}.
                </p>
                <Link to={`/san-the-thao/${upcomingBooking.san?.id || upcomingBooking.id}`}>
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
                </Link>
              </>
            ) : (
              <>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px', lineHeight: '22px' }}>
                  Bạn chưa có lịch đặt sân nào sắp tới. Hãy đặt sân ngay để rèn luyện sức khỏe nhé!
                </p>
                <Link to="/san-the-thao">
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
                    Đặt sân ngay
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeMenu === 'overview' && (
          <>
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

            {/* Recent Bookings */}
            <div className="section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Đặt sân gần đây</h2>
                <button onClick={() => setActiveMenu('history')} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                  Xem tất cả
                </button>
              </div>
              <div className="booking-table-header">
                <span style={{ flex: 2 }}>Tên sân / Địa chỉ</span>
                <span style={{ flex: 1 }}>Mã đặt chỗ</span>
                <span style={{ flex: 1.5 }}>Ngày & Giờ</span>
                <span style={{ flex: 1 }}>Giá tiền</span>
                <span style={{ flex: 1 }}>Trạng thái</span>
                <span style={{ width: '40px' }}></span>
              </div>
              {bookingsLoading ? (
                <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--on-surface-variant)' }}>
                  <p style={{ fontSize: '14px' }}>Đang tải lịch sử đặt sân...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--on-surface-variant)' }}>
                  <p style={{ fontSize: '14px' }}>Chưa có giao dịch gần đây</p>
                </div>
              ) : (
                bookings.slice(0, 3).map((booking, i) => {
                  const st = statusMap[booking.trang_thai] || statusMap[0];
                  const pitchName = booking.san?.ten_san || 'Sân thể thao';
                  const pitchImage = booking.san?.anh_chinh ? resolveAssetUrl(booking.san.anh_chinh) : resolveAssetUrl(undefined);
                  const pitchAddress = booking.san?.dia_chi || '';
                  return (
                    <motion.div key={booking.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="booking-row">
                      <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={pitchImage} alt={pitchName} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '14px' }}>{pitchName}</p>
                          <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{pitchAddress}</p>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary)', background: 'var(--primary-container)', padding: '4px 8px', borderRadius: '6px' }}>#{booking.ma_dat_san || 'N/A'}</span>
                      </div>
                      <div style={{ flex: 1.5 }}>
                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{booking.ngay_dat}</p>
                        <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{booking.gio_bat_dau} - {booking.gio_ket_thuc}</p>
                      </div>
                      <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: '14px' }}>{formatPrice(Number(booking.tong_tien))}</p></div>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Link to={`/san-the-thao/${booking.san?.id || booking.id}`} style={{ color: 'var(--on-surface-variant)' }}><Icon name="open_in_new" size={20} /></Link>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </>
        )}

        {activeMenu === 'history' && (
          <div className="section-card">
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Lịch sử đặt chỗ</h2>
            <div className="booking-table-header">
              <span style={{ flex: 2 }}>Tên sân / Địa chỉ</span>
              <span style={{ flex: 1 }}>Mã đặt chỗ</span>
              <span style={{ flex: 1.5 }}>Ngày & Giờ</span>
              <span style={{ flex: 1 }}>Giá tiền</span>
              <span style={{ flex: 1 }}>Trạng thái</span>
              <span style={{ width: '40px' }}></span>
            </div>
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
                    <motion.div key={booking.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="booking-row">
                      <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={pitchImage} alt={pitchName} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '14px' }}>{pitchName}</p>
                          <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{pitchAddress}</p>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary)', background: 'var(--primary-container)', padding: '4px 8px', borderRadius: '6px' }}>#{booking.ma_dat_san || 'N/A'}</span>
                      </div>
                      <div style={{ flex: 1.5 }}>
                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{booking.ngay_dat}</p>
                        <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{booking.gio_bat_dau} - {booking.gio_ket_thuc}</p>
                      </div>
                      <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: '14px' }}>{formatPrice(Number(booking.tong_tien))}</p></div>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Link to={`/san-the-thao/${booking.san?.id || booking.id}`} style={{ color: 'var(--on-surface-variant)' }}><Icon name="open_in_new" size={20} /></Link>
                      </div>
                    </motion.div>
                  );
                })
              )}
          </div>
        )}

        {activeMenu === 'favorites' && (
          <div className="section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Sân yêu thích</h2>
            </div>
            {favoritePitchesData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--on-surface-variant)' }}>
                <Icon name="favorite_border" size={40} style={{ opacity: 0.4, marginBottom: '12px', color: 'var(--primary)' }} />
                <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--on-surface)' }}>Chưa có sân yêu thích</p>
                <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '6px' }}>
                  Bấm vào biểu tượng trái tim khi xem thông tin các sân để lưu danh sách sân yêu thích của bạn tại đây.
                </p>
              </div>
            ) : (
              <div className="fav-grid">
                {favoritePitchesData.map((pitch, idx) => (
                  <Link key={pitch.id} to={`/san-the-thao/${pitch.id}`} className="fav-card">
                    <PitchCard pitch={pitch} variant="featured" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeMenu === 'settings' && (
          <div className="section-card">
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Cài đặt cá nhân</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px' }}>Thông tin cơ bản</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Họ</label>
                    <input type="text" value={profileForm.ho} onChange={e => setProfileForm({...profileForm, ho: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Tên</label>
                    <input type="text" value={profileForm.ten} onChange={e => setProfileForm({...profileForm, ten: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Số điện thoại</label>
                  <input type="text" value={profileForm.so_dien_thoai} onChange={e => setProfileForm({...profileForm, so_dien_thoai: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email</label>
                  <input type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)', background: 'var(--surface-container)' }} disabled />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px', borderRadius: '8px', fontWeight: 600, marginTop: '8px' }}>Cập nhật thông tin</button>
              </form>

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px' }}>Đổi mật khẩu</h3>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Mật khẩu hiện tại</label>
                  <input type="password" value={passwordForm.mat_khau_hien_tai} onChange={e => setPasswordForm({...passwordForm, mat_khau_hien_tai: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Mật khẩu mới</label>
                  <input type="password" value={passwordForm.mat_khau_moi} onChange={e => setPasswordForm({...passwordForm, mat_khau_moi: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                </div>
                <button type="submit" className="btn btn-outline" style={{ padding: '10px', borderRadius: '8px', fontWeight: 600, marginTop: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }}>Xác nhận đổi mật khẩu</button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {isCropModalOpen && imageSrc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'var(--surface-bright)',
            padding: '24px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Chỉnh sửa ảnh đại diện</h3>
            
            <div style={{ position: 'relative', width: '100%', height: '300px', background: '#333' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Thu phóng</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Xoay ảnh</label>
              <input
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(e) => setRotation(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setIsCropModalOpen(false); setImageSrc(null); }}
              >
                Huỷ
              </button>
              <button 
                className="btn btn-primary" 
                onClick={showCroppedImage}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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
