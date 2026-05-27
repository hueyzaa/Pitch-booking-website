import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { formatPrice } from '../utils/price.utils';
import { resolveAssetUrl } from '../utils/asset.utils';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/api';

export interface PitchData {
  id: number;
  ten_san?: string;
  name?: string;
  id_loai_san?: number;
  ten_loai_san?: string;
  type?: string;
  typeBadge?: string;
  dia_chi?: string;
  address?: string;
  ten_tinh?: string;
  ten_xa?: string;
  tien_ich?: string[] | null;
  amenities?: string[];
  anh_chinh?: string | null;
  image?: string;
  anh_chi_tiet?: string[] | null;
  images?: string[];
  mo_ta?: string | null;
  description?: string;
  pricePerHour?: number;
  rating?: number;
  reviewCount?: number;
  status?: string;
  booked_slots_today?: number;
}

interface PitchCardProps {
  pitch: PitchData;
  variant?: 'featured' | 'list';
}

// getPriceByLoaiSan removed in favor of real DB prices

const PitchCard: React.FC<PitchCardProps> = ({ pitch, variant = 'featured' }) => {
  // Normalize fields between Mock and Database
  const id = pitch.id;
  const name = pitch.ten_san || pitch.name || 'Sân thể thao';
  const typeBadge = pitch.ten_loai_san || pitch.typeBadge || (pitch.type === 'football' ? 'Bóng đá' : pitch.type === 'badminton' ? 'Cầu lông' : pitch.type === 'tennis' ? 'Tennis' : pitch.type === 'basketball' ? 'Bóng rổ' : 'Thể thao');
  const { user, isAuthenticated, updateUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.san_yeu_thich) {
      try {
        const favorites = JSON.parse(user.san_yeu_thich);
        setIsFavorite(favorites.includes(id));
      } catch { setIsFavorite(false); }
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorite_pitches') || '[]');
      setIsFavorite(favorites.includes(id));
    }
  }, [id, isAuthenticated, user]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    let favorites: number[] = [];
    if (isAuthenticated && user?.san_yeu_thich) {
      try { favorites = JSON.parse(user.san_yeu_thich); } catch {}
    } else {
      favorites = JSON.parse(localStorage.getItem('favorite_pitches') || '[]');
    }

    if (favorites.includes(id)) {
      favorites = favorites.filter((favId: number) => favId !== id);
      setIsFavorite(false);
    } else {
      favorites.push(id);
      setIsFavorite(true);
    }

    const sanYeuThichStr = JSON.stringify(favorites);

    if (isAuthenticated) {
      try {
        await updateProfile({ san_yeu_thich: sanYeuThichStr });
        updateUser({ san_yeu_thich: sanYeuThichStr });
      } catch (err) {
        console.error('Failed to sync favorite', err);
      }
    } else {
      localStorage.setItem('favorite_pitches', sanYeuThichStr);
    }
  };
  
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

  const rating = pitch.rating || 0;

  const pricePerHour = pitch.pricePerHour || 0;
  const originalPrice = variant === 'list' && pitch.discount ? Math.round(pricePerHour / (1 - pitch.discount)) : undefined;

  const status = pitch.status || 'available';
  const statusLabel = status === 'sold_out' ? 'Hết sân' : status === 'promo' ? 'Ưu đãi' : 'Còn chỗ';
  const chipClass = status === 'available' ? 'chip-available' :
                    status === 'sold_out' ? 'chip-sold-out' : 'chip-promo';

  const image = pitch.anh_chinh ? resolveAssetUrl(pitch.anh_chinh) : (pitch.image || resolveAssetUrl(undefined));
  
  const rawAmenities = pitch.tien_ich || pitch.amenities || ['wifi', 'local_parking'];
  const amenities = Array.isArray(rawAmenities) ? rawAmenities.slice(0, 3) : ['wifi', 'local_parking'];

  const description = pitch.mo_ta || pitch.description || '';

  return (
    <Link
      to={`/san-the-thao/${id}`}
      className="pitch-card"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: variant === 'list' ? '192px' : '224px', overflow: 'hidden' }}>
          <img
            className="pitch-card__img"
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {/* Status Chip */}
          <div
            className={`chip ${chipClass}`}
            style={{ position: 'absolute', top: '16px', left: variant === 'list' ? 'auto' : '16px', right: variant === 'list' ? '12px' : 'auto' }}
          >
            {statusLabel}
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isFavorite ? '#ef4444' : 'var(--on-surface-variant)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
            }}
          >
            <Icon name={isFavorite ? 'favorite' : 'favorite_border'} size={20} filled={isFavorite} />
          </button>


          {/* Type Badge (list variant) */}
          {variant === 'list' && typeBadge && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {typeBadge}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Name & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 className="pitch-card__name">{name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: variant === 'list' ? 'var(--primary)' : 'var(--on-secondary-container)', flexShrink: 0 }}>
              <Icon name="star" filled size={18} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Address */}
          <p style={{
            fontSize: '16px',
            color: 'var(--on-surface-variant)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Icon name="location_on" size={18} />
            <span style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>{address}</span>
          </p>

          {/* Description (list variant) */}
          {variant === 'list' && description && (
            <p style={{
              fontSize: '14px',
              color: 'var(--on-surface-variant)',
              marginBottom: '16px',
              lineHeight: '20px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {description}
            </p>
          )}

          {/* Amenities (list variant) */}
          {variant === 'list' && amenities && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '8px 0',
              borderTop: '1px solid rgba(187, 202, 191, 0.3)',
              marginBottom: '8px',
            }}>
              {amenities.map((amenity, i) => (
                <Icon key={i} name={amenity} size={20} style={{ color: 'var(--on-surface-variant)' }} />
              ))}
            </div>
          )}

          {/* Price & Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: variant === 'list' ? 'none' : '1px solid var(--outline-variant)',
            marginTop: 'auto',
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--outline)' }}>Giá từ</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {originalPrice && (
                  <span style={{ fontSize: '12px', textDecoration: 'line-through', color: 'var(--outline)' }}>
                    {formatPrice(originalPrice).replace('đ', 'k').replace('.000', '')}
                  </span>
                )}
                <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--primary)', lineHeight: '32px' }}>
                  {formatPrice(pricePerHour)}
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--on-surface-variant)' }}>/h</span>
                </span>
              </div>
            </div>
            <button
              className={`btn ${status === 'sold_out' ? '' : 'btn-primary'}`}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                ...(status === 'sold_out' ? {
                  background: 'var(--outline)',
                  color: '#fff',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                } : {}),
              }}
              onClick={(e) => e.preventDefault()}
            >
              {variant === 'list'
                ? (status === 'sold_out' ? 'Chi tiết' : 'Đặt ngay')
                : 'Chi tiết'
              }
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .pitch-card:hover .pitch-card__img {
          transform: scale(1.08);
        }
        .pitch-card__name {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: var(--on-surface);
          transition: color 0.2s;
          display: -webkit-box;
          WebkitLineClamp: 1;
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
        .pitch-card:hover .pitch-card__name {
          color: var(--primary);
        }
      `}</style>
    </Link>
  );
};

export default PitchCard;
