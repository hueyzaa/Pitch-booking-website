import React from 'react';
import Icon from './Icon';

export interface FilterSidebarProps {
  loaiSanOptions: Array<{ value: number; label: string }>;
  tinhOptions: Array<{ value: number; label: string }>;
  xaOptions: Array<{ value: number; label: string }>;
  selectedLoaiSanIds: number[];
  selectedTinhId: number | undefined;
  selectedXaId: number | undefined;
  priceRange: number;
  selectedAmenities: string[];
  onLoaiSanChange: (ids: number[]) => void;
  onTinhChange: (id: number | undefined) => void;
  onXaChange: (id: number | undefined) => void;
  onPriceRangeChange: (price: number) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  onApplyFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  loaiSanOptions,
  tinhOptions,
  xaOptions,
  selectedLoaiSanIds,
  selectedTinhId,
  selectedXaId,
  priceRange,
  selectedAmenities,
  onLoaiSanChange,
  onTinhChange,
  onXaChange,
  onPriceRangeChange,
  onAmenitiesChange,
  onApplyFilters,
}) => {
  const toggleLoaiSan = (id: number) => {
    if (selectedLoaiSanIds.includes(id)) {
      onLoaiSanChange(selectedLoaiSanIds.filter((x) => x !== id));
    } else {
      onLoaiSanChange([...selectedLoaiSanIds, id]);
    }
  };

  const toggleAmenity = (key: string) => {
    if (selectedAmenities.includes(key)) {
      onAmenitiesChange(selectedAmenities.filter((x) => x !== key));
    } else {
      onAmenitiesChange([...selectedAmenities, key]);
    }
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__content">
        {/* Header */}
        <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '16px', lineHeight: '32px' }}>
          Bộ lọc
        </h3>

        {/* Location Dropdowns */}
        <div className="filter-section">
          <p className="filter-section__title">Địa điểm</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--outline)', display: 'block', marginBottom: '6px' }}>Tỉnh / Thành phố</label>
              <select
                value={selectedTinhId || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onTinhChange(val ? Number(val) : undefined);
                }}
                className="filter-select"
              >
                <option value="">-- Tất cả Tỉnh / Thành --</option>
                {tinhOptions.map((tinh) => (
                  <option key={tinh.value} value={tinh.value}>
                    {tinh.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--outline)', display: 'block', marginBottom: '6px' }}>Phường / Xã</label>
              <select
                value={selectedXaId || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onXaChange(val ? Number(val) : undefined);
                }}
                className="filter-select"
                disabled={!selectedTinhId}
              >
                <option value="">-- Tất cả Phường / Xã --</option>
                {xaOptions.map((xa) => (
                  <option key={xa.value} value={xa.value}>
                    {xa.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sport Type */}
        <div className="filter-section">
          <p className="filter-section__title">Loại sân</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loaiSanOptions.map((option) => (
              <label key={option.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedLoaiSanIds.includes(option.value)}
                  onChange={() => toggleLoaiSan(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
            {loaiSanOptions.length === 0 && (
              <div style={{ fontSize: '13px', color: 'var(--outline)' }}>Đang tải loại sân...</div>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <p className="filter-section__title">Mức giá tối đa: {priceRange.toLocaleString('vi-VN')} đ/h</p>
          <input
            type="range"
            min={50000}
            max={1000000}
            step={50000}
            value={priceRange}
            onChange={(e) => onPriceRangeChange(Number(e.target.value))}
            className="filter-slider"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>
            <span>50k</span>
            <span>1,000k+</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="filter-section">
          <p className="filter-section__title">Tiện ích</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { key: 'wifi', label: 'Wifi miễn phí' },
              { key: 'parking', label: 'Gửi xe' },
              { key: 'canteen', label: 'Canteen / Nước uống' },
              { key: 'shower', label: 'Phòng tắm / Thay đồ' },
            ].map((item) => (
              <label key={item.key} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item.key)}
                  onChange={() => toggleAmenity(item.key)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={onApplyFilters} className="btn btn-primary" style={{ width: '100%', borderRadius: '12px', padding: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Icon name="filter_list" size={18} />
          Áp dụng bộ lọc
        </button>
      </div>

      <style>{`
        .filter-sidebar {
          width: 100%;
          max-width: 288px;
          flex-shrink: 0;
        }
        .filter-sidebar__content {
          position: sticky;
          top: 112px;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          padding: 24px;
          border-radius: 12px;
        }
        .filter-section {
          padding: 24px 0;
          border-top: 1px solid var(--outline-variant);
        }
        .filter-section__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--outline);
          margin-bottom: 16px;
          letter-spacing: 0.01em;
        }
        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 16px;
          color: var(--on-surface-variant);
          transition: color 0.2s;
        }
        .filter-checkbox:hover {
          color: var(--primary);
        }
        .filter-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 2px solid var(--outline);
          accent-color: var(--primary);
          cursor: pointer;
        }
        .filter-slider {
          width: 100%;
          height: 6px;
          background: var(--surface-container);
          border-radius: 8px;
          appearance: none;
          cursor: pointer;
          accent-color: var(--primary);
        }
        .filter-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
        }
        .filter-select {
          width: 100%;
          padding: 10px 12px;
          background: var(--surface-bright);
          border: 1px solid var(--outline-variant);
          border-radius: 8px;
          font-family: var(--font-main);
          font-size: 16px;
          color: var(--on-surface-variant);
          outline: none;
          cursor: pointer;
        }
        .filter-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(0,108,73,0.15);
        }
        .filter-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .filter-sidebar {
            max-width: 100%;
          }
          .filter-sidebar__content {
            position: static;
          }
        }
      `}</style>
    </aside>
  );
};

export default FilterSidebar;
