import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { formatPrice } from '../utils/price.utils';
import { getPitchDetail, getBookedSlots, createBooking } from '../api/api';
import { PitchData } from '../components/PitchCard';
import { resolveAssetUrl } from '../utils/asset.utils';
import { useAuth } from '../context/AuthContext';

const getPriceByLoaiSan = (typeName: string): number => {
  const name = typeName?.toLowerCase() || '';
  if (name.includes('bóng đá') || name.includes('football')) return 350000;
  if (name.includes('cầu lông') || name.includes('badminton')) return 80000;
  if (name.includes('tennis')) return 200000;
  if (name.includes('bóng rổ') || name.includes('basketball')) return 150000;
  return 120000;
};

const amenityIconMap: Record<string, { icon: string; label: string }> = {
  wifi: { icon: 'wifi', label: 'Wifi miễn phí' },
  local_parking: { icon: 'local_parking', label: 'Bãi đỗ xe lớn' },
  parking: { icon: 'local_parking', label: 'Bãi đỗ xe lớn' },
  shower: { icon: 'hot_tub', label: 'Phòng tắm nóng lạnh' },
  hot_tub: { icon: 'hot_tub', label: 'Phòng tắm nóng lạnh' },
  coffee: { icon: 'local_cafe', label: 'Nước uống & Căng tin' },
  local_cafe: { icon: 'local_cafe', label: 'Nước uống & Căng tin' },
  checkroom: { icon: 'checkroom', label: 'Phòng thay đồ' },
  medical_services: { icon: 'medical_services', label: 'Sơ cứu y tế' },
  medical: { icon: 'medical_services', label: 'Sơ cứu y tế' },
};

const getAmenityDetails = (amenitiesList: any) => {
  const items: string[] = Array.isArray(amenitiesList) ? amenitiesList : [];
  if (items.length === 0) {
    return [
      { icon: 'wifi', label: 'Wifi miễn phí' },
      { icon: 'local_parking', label: 'Bãi đỗ xe lớn' },
      { icon: 'local_cafe', label: 'Nước uống & Căng tin' },
    ];
  }
  return items.map((item) => {
    const key = item.trim().toLowerCase();
    return amenityIconMap[key] || { icon: 'verified', label: item };
  });
};

const getGalleryImages = (pitch: PitchData): string[] => {
  const mainImg = pitch.anh_chinh ? resolveAssetUrl(pitch.anh_chinh) : (pitch.image || resolveAssetUrl(undefined));
  let detailImgs: string[] = [];
  if (pitch.anh_chi_tiet) {
    if (Array.isArray(pitch.anh_chi_tiet)) {
      detailImgs = pitch.anh_chi_tiet.map((img: string) => resolveAssetUrl(img));
    } else if (typeof pitch.anh_chi_tiet === 'string') {
      try {
        const parsed = JSON.parse(pitch.anh_chi_tiet);
        if (Array.isArray(parsed)) {
          detailImgs = parsed.map((img: string) => resolveAssetUrl(img));
        }
      } catch {
        detailImgs = (pitch.anh_chi_tiet as string).split(',').filter(Boolean).map((img: string) => resolveAssetUrl(img.trim()));
      }
    }
  } else if (pitch.images && Array.isArray(pitch.images)) {
    detailImgs = pitch.images;
  }
  
  const allImgs = [mainImg, ...detailImgs].filter(Boolean);
  while (allImgs.length < 4) {
    allImgs.push(resolveAssetUrl(undefined));
  }
  return allImgs;
};

interface BookedSlotData {
  gio_bat_dau: string;
  gio_ket_thuc: string;
  trang_thai: number; // 1=Đã đặt, 2=Bảo trì
}

const generateTimeSlots = (
  pricePerHour: number,
  isToday: boolean = false,
  bookedSlots: BookedSlotData[] = []
) => {
  const slots = [];
  const now = new Date();
  const currentHour = now.getHours();

  for (let hour = 6; hour < 22; hour++) {
    const startStr = `${hour.toString().padStart(2, '0')}:00`;
    const endStr = `${(hour + 1).toString().padStart(2, '0')}:00`;

    // Peak hours pricing (17:00 - 20:00) with 1.2x multiplier
    const isPeak = hour >= 17 && hour < 20;
    const price = isPeak ? Math.round((pricePerHour * 1.2) / 10000) * 10000 : pricePerHour;

    // Check if this slot is in the past (only for today)
    const isPast = isToday && hour <= currentHour;

    // Check if this slot is booked or under maintenance
    const isBooked = bookedSlots.some((bs) => {
      const bsStart = parseInt(bs.gio_bat_dau.split(':')[0], 10);
      const bsEnd = parseInt(bs.gio_ket_thuc.split(':')[0], 10);
      return hour >= bsStart && hour < bsEnd && (bs.trang_thai === 1 || bs.trang_thai === 2);
    });

    // Determine status: 'available', 'past', 'booked', 'maintenance'
    let status: 'available' | 'past' | 'booked' | 'maintenance' = 'available';
    if (isPast) status = 'past';
    else if (isBooked) {
      const matchingSlot = bookedSlots.find((bs) => {
        const bsStart = parseInt(bs.gio_bat_dau.split(':')[0], 10);
        const bsEnd = parseInt(bs.gio_ket_thuc.split(':')[0], 10);
        return hour >= bsStart && hour < bsEnd;
      });
      status = matchingSlot?.trang_thai === 2 ? 'maintenance' : 'booked';
    }

    const available = status === 'available';

    slots.push({
      id: hour - 5, // 1 to 16
      time: `${startStr} - ${endStr}`,
      price: available ? price : 0,
      available,
      status,
    });
  }
  return slots;
};

const generateBookingDays = () => {
  const labels = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    
    const dayOfWeek = d.getDay();
    const dayOfMonth = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    
    let label = labels[dayOfWeek];
    if (i === 0) {
      label = 'H.nay';
    }

    days.push({
      label: label,
      date: dayOfMonth.toString().padStart(2, '0'),
      fullLabel: dayOfWeek === 0 ? 'Chủ Nhật' : `Thứ ${dayOfWeek + 1}`,
      fullDate: `${dayOfMonth.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
    });
  }
  return days;
};

const PitchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  
  const [pitch, setPitch] = useState<PitchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedSlotsData, setBookedSlotsData] = useState<BookedSlotData[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState('');

  const handleToggleSlot = (slotId: number) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slotId)) {
        return prev.filter((id) => id !== slotId);
      } else {
        return [...prev, slotId];
      }
    });
  };

  const days = React.useMemo(() => generateBookingDays(), []);

  const discountPercent = 15;

  useEffect(() => {
    setSelectedImgIndex(0);
  }, [id]);

  // Fetch booked slots when pitch or selected day changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!id || !pitch) return;
      const selectedDate = days[selectedDay];
      if (!selectedDate) return;
      const ngay = selectedDate.fullDate.split('/').reverse().join('-'); // DD/MM/YYYY -> YYYY-MM-DD
      try {
        const data = await getBookedSlots(id, ngay);
        setBookedSlotsData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch booked slots:', err);
        setBookedSlotsData([]);
      }
    };
    fetchBookedSlots();
  }, [id, pitch, selectedDay, days]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getPitchDetail(id);
        if (data) {
          setPitch(data);
        } else {
          setError('Không tìm thấy thông tin sân bóng.');
        }
      } catch (err) {
        console.error('Failed to fetch pitch detail:', err);
        setError('Có lỗi xảy ra khi tải thông tin sân bóng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <main style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '24px var(--margin-desktop)' }}>
        {/* Shimmer gallery skeleton */}
        <div className="gallery-grid" style={{ marginBottom: '32px' }}>
          <div className="gallery-main shimmer" style={{ height: '400px', background: 'var(--surface-container-low)', borderRadius: '16px' }} />
          <div className="gallery-side">
            <div className="gallery-thumb shimmer" style={{ height: '194px', background: 'var(--surface-container-low)', borderRadius: '12px' }} />
            <div className="gallery-thumb shimmer" style={{ height: '194px', background: 'var(--surface-container-low)', borderRadius: '12px' }} />
          </div>
        </div>

        {/* Content grid skeleton */}
        <div className="detail-layout">
          <div className="detail-info">
            <div className="shimmer" style={{ width: '40%', height: '24px', borderRadius: '4px', background: 'var(--surface-container-low)', marginBottom: '16px' }} />
            <div className="shimmer" style={{ width: '75%', height: '48px', borderRadius: '4px', background: 'var(--surface-container-low)', marginBottom: '16px' }} />
            <div className="shimmer" style={{ width: '50%', height: '20px', borderRadius: '4px', background: 'var(--surface-container-low)', marginBottom: '40px' }} />
            <div className="shimmer" style={{ width: '90%', height: '120px', borderRadius: '8px', background: 'var(--surface-container-low)', marginBottom: '32px' }} />
          </div>
          <div className="booking-sidebar">
            <div className="booking-card shimmer" style={{ height: '350px', background: 'var(--surface-container-low)', borderRadius: '16px' }} />
          </div>
        </div>
        <style>{`
          .shimmer {
            animation: pulse 1.5s infinite ease-in-out;
          }
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          .gallery-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 12px;
            border-radius: 16px;
            overflow: hidden;
          }
          .gallery-side {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            gap: 12px;
          }
          .detail-layout {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 48px;
            align-items: start;
          }
          @media (max-width: 900px) {
            .gallery-grid {
              grid-template-columns: 1fr;
            }
            .gallery-side {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: auto;
            }
            .detail-layout {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    );
  }

  if (error || !pitch) {
    return (
      <main style={{ maxWidth: 'var(--container-max)', margin: '80px auto', padding: '0 var(--margin-desktop)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Icon name="error" size={64} style={{ color: 'var(--error)', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: 'var(--on-surface)' }}>Không tìm thấy sân</h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '16px', marginBottom: '32px', lineHeight: '24px' }}>
            {error || 'Sân thể thao bạn yêu cầu không tồn tại hoặc đã bị gỡ bỏ.'}
          </p>
          <Link to="/san-the-thao" className="btn btn-primary" style={{ padding: '12px 28px', borderRadius: '12px', fontWeight: 700 }}>
            Quay lại trang danh sách
          </Link>
        </motion.div>
      </main>
    );
  }

  // Normalizations & Parsing
  const name = pitch.ten_san || pitch.name || 'Sân thể thao';
  const typeBadge = pitch.ten_loai_san || (pitch.type === 'football' ? 'Bóng đá' : pitch.type === 'badminton' ? 'Cầu lông' : pitch.type === 'tennis' ? 'Tennis' : pitch.type === 'basketball' ? 'Bóng rổ' : 'Thể thao');
  
  // Format Address
  let address = pitch.address || '';
  if (!address && pitch.dia_chi) {
    const parts = [
      pitch.dia_chi,
      pitch.ten_xa,
      pitch.ten_tinh
    ].filter(Boolean);
    address = parts.join(', ');
  }
  if (!address) address = 'Chưa cập nhật địa chỉ';

  const pricePerHour = pitch.pricePerHour || getPriceByLoaiSan(typeBadge);
  const images = getGalleryImages(pitch);
  const amenityDetails = getAmenityDetails(pitch.tien_ich || pitch.amenities);
  const timeSlots = generateTimeSlots(pricePerHour, selectedDay === 0, bookedSlotsData);

  const rating = pitch.rating || (((pitch.id || 1) * 3) % 5) / 10 + 4.5;
  const reviewCount = pitch.reviewCount || ((pitch.id || 1) * 17) % 80 + 20;

  const reviews = [
    {
      id: 1,
      name: 'Trần Hoàn',
      role: '2 ngày trước',
      rating: 5,
      quote: 'Sân cỏ rất đẹp, mềm và không bị trơn. Hệ thống đèn chiếu sáng cực tốt, đá buổi tối rất thích. Nhân viên nhiệt tình hỗ trợ.',
    },
    {
      id: 2,
      name: 'Nguyễn Minh',
      role: '1 tuần trước',
      rating: 5,
      quote: 'Chỗ để xe rộng rãi, thuận tiện. Tuy nhiên giờ cao điểm hơi đông đúc ở khu vực thay đồ. Chất lượng sân thì không có gì để chê.',
    },
    {
      id: 3,
      name: 'Anh Đức',
      role: '2 tuần trước',
      rating: 5,
      quote: 'Lần đầu đặt qua SportBooking thấy rất tiện lợi, không cần gọi điện xác nhận nhiều lần. Cụm sân này luôn là lựa chọn số 1 của team mình.',
    },
  ];

  return (
    <main>
      {/* Pitch Header (Title, Rating, Address) */}
      <div className="pitch-header-section">
        {/* Tags & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span className="chip chip-available">Còn chỗ</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="star" filled size={18} style={{ color: '#FFB800' }} />
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{rating.toFixed(1)}</span>
            <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>({reviewCount} đánh giá)</span>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '12px', letterSpacing: '-0.01em' }}
        >
          {name}
        </motion.h1>

        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--on-surface-variant)', fontSize: '16px', marginBottom: '0' }}>
          <Icon name="location_on" size={20} />
          {address}
        </p>
      </div>

      {/* Content */}
      <div className="detail-layout">
        {/* Left: Info */}
        <div className="detail-info">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="gallery-grid">
              <div className="gallery-main">
                <img src={images[selectedImgIndex] || images[0]} alt={name} />
              </div>
              <div className="gallery-thumbs-row">
                {images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className={`gallery-thumb-item ${selectedImgIndex === i ? 'gallery-thumb-item--active' : ''}`}
                    onClick={() => setSelectedImgIndex(i)}
                  >
                    <img src={img} alt={`${name} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <button className="gallery-all-btn" onClick={() => setSelectedImgIndex(0)}>
              <Icon name="grid_view" size={18} />
              <span>Xem tất cả ảnh</span>
            </button>
          </div>

          {/* Description & Amenities */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Mô tả & Tiện ích</h3>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'var(--on-surface-variant)', marginBottom: '24px' }}>
            {pitch.mo_ta || pitch.description || 'Chưa có mô tả chi tiết cho sân bóng này.'}
          </p>

          <div className="amenities-grid">
            {amenityDetails.map((amenity, i) => (
              <div key={i} className="amenity-chip">
                <Icon name={amenity.icon} size={20} style={{ color: 'var(--primary)' }} />
                <span>{amenity.label}</span>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="map-placeholder" style={{ marginTop: '32px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--outline-variant)' }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ' ' + name)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="280"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              title={`Bản đồ vị trí ${name}`}
            />
          </div>
        </div>

        {/* Right: Booking */}
        <div className="booking-sidebar">
          <div className="booking-card">
            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--outline)', fontWeight: 600 }}>Giá chỉ từ</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(pricePerHour)}</span>
                  <span style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>/trận</span>
                </div>
              </div>
              <span style={{
                padding: '6px 12px',
                background: 'var(--error-container)',
                color: 'var(--on-error-container)',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
              }}>
                -{discountPercent}% Hôm nay
              </span>
            </div>

            {/* Day Selector */}
            <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>Chọn ngày</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {days.map((day, i) => (
                <button
                  key={i}
                  className={`day-btn ${selectedDay === i ? 'day-btn--active' : ''}`}
                  onClick={() => {
                    setSelectedDay(i);
                    setSelectedSlots([]);
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>{day.label}</span>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{day.date}</span>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>Chọn khung giờ</p>
            <div style={{ 
              gridTemplateColumns: '1fr 1fr', 
              display: 'grid', 
              gap: '8px', 
              marginBottom: '24px',
              maxHeight: '260px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`slot-btn ${selectedSlots.includes(slot.id) ? 'slot-btn--active' : ''} ${!slot.available ? 'slot-btn--disabled' : ''}`}
                  onClick={() => slot.available && handleToggleSlot(slot.id)}
                  disabled={!slot.available}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{slot.time}</span>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>
                    {slot.available
                      ? formatPrice(slot.price).replace('.000đ', 'k')
                      : slot.status === 'past'
                        ? 'Đã qua'
                        : slot.status === 'maintenance'
                          ? 'Bảo trì'
                          : 'Đã đặt'}
                  </span>
                </button>
              ))}
            </div>

            {/* Price Summary */}
            {selectedSlots.length > 0 && (
              <div style={{
                padding: '16px',
                background: 'var(--surface-container-low)',
                borderRadius: '16px',
                marginBottom: '20px',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--outline)', fontWeight: 600 }}>Số khung giờ:</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>{selectedSlots.length} trận</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', color: 'var(--outline)', fontWeight: 600 }}>Tổng tiền tạm tính:</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>
                    {formatPrice(
                      timeSlots
                        .filter(s => selectedSlots.includes(s.id))
                        .reduce((sum, s) => sum + s.price, 0)
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Book Button */}
            <button 
              className="btn btn-primary" 
              onClick={() => {
                if (selectedSlots.length === 0) return;
                if (!isAuthenticated) {
                  navigate('/dang-nhap');
                  return;
                }
                setBookingStatus('idle');
                setBookingError('');
                setShowBookingModal(true);
              }}
              disabled={selectedSlots.length === 0}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '12px',
                opacity: selectedSlots.length === 0 ? 0.6 : 1,
                cursor: selectedSlots.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {selectedSlots.length > 0 ? `Đặt sân ngay` : 'Chọn khung giờ để đặt'}
            </button>
            {!isAuthenticated && (
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--error)', fontWeight: 600 }}>
                Vui lòng <Link to="/dang-nhap" style={{ color: 'var(--primary)' }}>đăng nhập</Link> để đặt sân
              </p>
            )}
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--outline)' }}>
              Hủy sân miễn phí trước 12 tiếng
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px var(--margin-desktop) 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, lineHeight: '40px' }}>Đánh giá từ khách hàng</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: 700, fontSize: '18px' }}>{rating.toFixed(1)}/5</span>
              <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>Dựa trên {reviewCount} lượt đặt</p>
            </div>
            <button className="btn btn-secondary btn-pill" style={{ padding: '10px 20px' }}>Viết đánh giá</button>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="review-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary-container)',
                  color: 'var(--on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  {review.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px' }}>{review.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--outline)' }}>{review.role}</p>
                </div>
              </div>
              <div className="star-rating" style={{ marginBottom: '12px' }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Icon key={i} name="star" filled size={16} />
                ))}
              </div>
              <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--on-surface-variant)' }}>
                {review.quote}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontFamily: 'var(--font-main)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
          }}>
            Xem thêm {reviewCount - 3} đánh giá khác
          </button>
        </div>
      </div>

      <style>{`
        .pitch-header-section {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 32px var(--margin-desktop) 0;
        }
        .gallery-section {
          width: 100%;
          padding: 0 0 32px 0;
          position: relative;
        }
        .gallery-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gallery-main {
          height: 350px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          position: relative;
        }
        .gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-main:hover img {
          transform: scale(1.02);
        }
        .gallery-thumbs-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .gallery-thumb-item {
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gallery-thumb-item:hover {
          transform: translateY(-2px);
          border-color: var(--outline-variant);
        }
        .gallery-thumb-item:hover img {
          transform: scale(1.05);
        }
        .gallery-thumb-item--active {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(0, 108, 73, 0.15);
        }
        .gallery-all-btn {
          position: absolute;
          top: 40px;
          right: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          color: var(--on-surface);
          box-shadow: var(--shadow-md);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-all-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .detail-layout {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 16px var(--margin-desktop) 48px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 48px;
          align-items: start;
        }
        .detail-info {
          min-width: 0;
        }
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .amenity-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: var(--surface-container-low);
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          color: var(--on-surface-variant);
          border: 1px solid transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .amenity-chip:hover {
          background: var(--surface-container);
          border-color: var(--outline-variant);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .map-placeholder {
          margin-top: 32px;
          box-shadow: var(--shadow-md);
        }
        .booking-sidebar {
          position: sticky;
          top: 112px;
        }
        .booking-card {
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 24px;
          padding: 28px;
          box-shadow: var(--shadow-md);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .booking-card:hover {
          box-shadow: var(--shadow-lg);
        }
        .day-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 14px 10px;
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          background: transparent;
          font-family: var(--font-main);
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .day-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 108, 73, 0.08);
        }
        .day-btn--active {
          border-color: var(--primary);
          background: var(--primary);
          color: var(--on-primary);
        }
        .day-btn--active:hover {
          color: var(--on-primary);
          box-shadow: 0 6px 16px rgba(0, 108, 73, 0.16);
        }
        .day-btn--active span {
          color: inherit !important;
        }
        .slot-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px 14px;
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          background: transparent;
          font-family: var(--font-main);
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slot-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 108, 73, 0.08);
        }
        .slot-btn--active {
          border-color: var(--primary);
          background: var(--primary);
          color: var(--on-primary);
          box-shadow: 0 6px 16px rgba(0, 108, 73, 0.15);
        }
        .slot-btn--disabled {
          background-color: #f3f4f6;
          border-color: #e5e7eb;
          color: #9ca3af;
          opacity: 0.85;
          cursor: not-allowed;
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            rgba(156, 163, 175, 0.08) 5px,
            rgba(156, 163, 175, 0.08) 10px
          );
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .review-card {
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--outline);
        }
        @media (max-width: 960px) {
          .gallery-main {
            height: 280px;
          }
          .gallery-thumbs-row {
            gap: 12px;
          }
          .gallery-thumb-item {
            height: 75px;
          }
          .gallery-all-btn {
            top: 40px;
            right: 48px;
          }
          .detail-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .booking-sidebar {
            position: static;
          }
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .gallery-main {
            height: 190px;
          }
          .gallery-thumbs-row {
            gap: 8px;
          }
          .gallery-thumb-item {
            height: 55px;
            border-radius: 8px;
          }
          .gallery-all-btn {
            top: 40px;
            right: 24px;
            padding: 8px 16px;
            font-size: 12px;
          }
          .amenities-grid {
            grid-template-columns: 1fr;
          }
          .booking-card {
            padding: 20px;
          }
          .day-btn {
            padding: 10px 6px;
          }
          .slot-btn {
            padding: 12px 10px;
          }
        }
      `}</style>

      {showBookingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{
              backgroundColor: 'var(--surface-container-lowest)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              textAlign: 'left'
            }}
          >
            <button 
              onClick={() => setShowBookingModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--on-surface-variant)'
              }}
            >
              <Icon name="close" size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Icon name="check_circle" size={40} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--on-surface)' }}>Xác nhận đặt sân</h3>
              <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Vui lòng kiểm tra kỹ thông tin đặt sân của bạn</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {/* Pitch Name */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--outline)', fontWeight: 500 }}>Sân bóng</span>
                <span style={{ fontWeight: 700, color: 'var(--on-surface)' }}>{name}</span>
              </div>

              {/* Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--outline)', fontWeight: 500 }}>Ngày đặt</span>
                <span style={{ fontWeight: 600, color: 'var(--on-surface)' }}>
                  {days[selectedDay].fullLabel === 'Hôm nay' 
                    ? `Hôm nay, ngày ${days[selectedDay].fullDate}` 
                    : `${days[selectedDay].fullLabel}, ngày ${days[selectedDay].fullDate}`}
                </span>
              </div>

              {/* Selected slots & pricing */}
              <div>
                <span style={{ color: 'var(--outline)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Khung giờ đã chọn</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                  {timeSlots
                    .filter((slot) => selectedSlots.includes(slot.id))
                    .map((slot) => (
                      <div key={slot.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', background: 'var(--surface-container-low)', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--on-surface)' }}>{slot.time}</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(slot.price)}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Total payment */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '12px',
                padding: '16px',
                background: 'var(--primary-container)',
                borderRadius: '16px',
                color: 'var(--on-primary-container)'
              }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>Tổng thanh toán:</span>
                <span style={{ fontWeight: 800, fontSize: '24px', color: 'var(--primary)' }}>
                  {formatPrice(
                    timeSlots
                      .filter((slot) => selectedSlots.includes(slot.id))
                      .reduce((sum, slot) => sum + slot.price, 0)
                  )}
                </span>
              </div>
            </div>

            {/* Booking status feedback */}
            {bookingStatus === 'success' && (
              <div style={{
                padding: '16px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <Icon name="check_circle" size={24} style={{ color: 'var(--primary)' }} />
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>Đặt sân thành công!</p>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>Chúng tôi đã ghi nhận yêu cầu đặt sân của bạn.</p>
                </div>
              </div>
            )}
            {bookingStatus === 'error' && (
              <div style={{
                padding: '16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <Icon name="error" size={24} style={{ color: 'var(--error)' }} />
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--error)', fontSize: '15px' }}>Đặt sân thất bại</p>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>{bookingError}</p>
                </div>
              </div>
            )}

            {bookingStatus === 'success' ? (
              <button
                className="btn btn-primary"
                onClick={() => setShowBookingModal(false)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 700 }}
              >
                Đóng
              </button>
            ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowBookingModal(false)}
                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontWeight: 600 }}
              >
                Hủy
              </button>
              <button
                className="btn btn-primary"
                disabled={bookingLoading}
                onClick={async () => {
                  if (!authUser?.tai_khoan || !pitch) return;
                  setBookingLoading(true);
                  setBookingStatus('idle');
                  setBookingError('');

                  const selectedDate = days[selectedDay];
                  const ngayDat = selectedDate.fullDate.split('/').reverse().join('-');
                  const selectedTimeSlotsData = timeSlots.filter(s => selectedSlots.includes(s.id));

                  try {
                    // Create one booking per selected slot
                    for (const slot of selectedTimeSlotsData) {
                      const [startTime, endTime] = slot.time.split(' - ');
                      await createBooking({
                        tai_khoan: authUser.tai_khoan,
                        id_san: Number(id),
                        ngay_dat: ngayDat,
                        gio_bat_dau: startTime,
                        gio_ket_thuc: endTime,
                        tong_tien: slot.price,
                      });
                    }
                    setBookingStatus('success');
                    setSelectedSlots([]);
                    // Refresh booked slots
                    try {
                      const data = await getBookedSlots(id!, ngayDat);
                      setBookedSlotsData(Array.isArray(data) ? data : []);
                    } catch (_) {}
                  } catch (err: any) {
                    setBookingStatus('error');
                    setBookingError(
                      err?.response?.data?.message || err?.message || 'Đặt sân thất bại. Vui lòng thử lại.'
                    );
                  } finally {
                    setBookingLoading(false);
                  }
                }}
                style={{
                  flex: 1.5,
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  opacity: bookingLoading ? 0.7 : 1,
                }}
              >
                {bookingLoading ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </div>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default PitchDetail;
