import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import PitchCard, { PitchData } from '../components/PitchCard';
import FilterSidebar from '../components/FilterSidebar';
import { getPitches, getLoaiSanOptions, getTinhOptions, getXaOptions } from '../api/api';

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Tên A-Z', value: 'name_asc' },
];

const PitchList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || '';

  // States for data
  const [pitches, setPitches] = useState<PitchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // States for search and sort
  const [searchText, setSearchText] = useState(initialSearch);
  const [activeSort, setActiveSort] = useState('newest');

  // Filter States
  const [loaiSanOptions, setLoaiSanOptions] = useState<Array<{ value: number; label: string }>>([]);
  const [tinhOptions, setTinhOptions] = useState<Array<{ value: number; label: string }>>([]);
  const [xaOptions, setXaOptions] = useState<Array<{ value: number; label: string }>>([]);

  const [selectedLoaiSanIds, setSelectedLoaiSanIds] = useState<number[]>([]);
  const [selectedTinhId, setSelectedTinhId] = useState<number | undefined>(undefined);
  const [selectedXaId, setSelectedXaId] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState(1000000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Fetch options on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [loaiRes, tinhRes] = await Promise.all([
          getLoaiSanOptions(),
          getTinhOptions()
        ]);
        const loaiList = Array.isArray(loaiRes)
          ? loaiRes
          : (loaiRes && Array.isArray(loaiRes.collection) ? loaiRes.collection : []);
        const tinhList = Array.isArray(tinhRes)
          ? tinhRes
          : (tinhRes && Array.isArray(tinhRes.collection) ? tinhRes.collection : []);

        setLoaiSanOptions(loaiList);
        // If type query param exists, auto-select it
        if (initialType && loaiList.length > 0) {
          const matched = loaiList.find(
            (o) => o.label.toLowerCase().includes(initialType.toLowerCase())
          );
          if (matched) {
            setSelectedLoaiSanIds([matched.value]);
          }
        }

        setTinhOptions(tinhList);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };
    fetchOptions();
  }, [initialType]);

  // Fetch xaOptions when selectedTinhId changes
  useEffect(() => {
    const fetchWards = async () => {
      if (!selectedTinhId) {
        setXaOptions([]);
        setSelectedXaId(undefined);
        return;
      }
      try {
        const response = await getXaOptions(selectedTinhId);
        const optionsList = Array.isArray(response)
          ? response
          : (response && Array.isArray(response.collection) ? response.collection : []);
        setXaOptions(optionsList);
      } catch (err) {
        console.error('Failed to fetch wards:', err);
      }
    };
    fetchWards();
  }, [selectedTinhId]);

  // Main fetch function
  const fetchPitchData = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: 9,
      };

      let filterIdx = 0;

      // Search Query
      if (searchText.trim()) {
        params[`f[${filterIdx}][field]`] = 'ten_san';
        params[`f[${filterIdx}][operator]`] = 'contain';
        params[`f[${filterIdx}][value]`] = searchText.trim();
        filterIdx++;
      }

      // Types Filter
      if (selectedLoaiSanIds.length > 0) {
        params[`f[${filterIdx}][field]`] = 'id_loai_san';
        params[`f[${filterIdx}][operator]`] = 'includes';
        params[`f[${filterIdx}][value]`] = JSON.stringify(selectedLoaiSanIds);
        filterIdx++;
      }

      // Province Filter
      if (selectedTinhId) {
        params[`f[${filterIdx}][field]`] = 'tinh_id';
        params[`f[${filterIdx}][operator]`] = 'equal';
        params[`f[${filterIdx}][value]`] = selectedTinhId;
        filterIdx++;
      }

      // Ward Filter
      if (selectedXaId) {
        params[`f[${filterIdx}][field]`] = 'xa_id';
        params[`f[${filterIdx}][operator]`] = 'equal';
        params[`f[${filterIdx}][value]`] = selectedXaId;
        filterIdx++;
      }

      // Sort Params
      if (activeSort === 'newest') {
        params.sort_column = 'id';
        params.sort_direction = 'DESC';
      } else if (activeSort === 'name_asc') {
        params.sort_column = 'ten_san';
        params.sort_direction = 'ASC';
      }

      const response = await getPitches(params);
      if (response) {
        const items = Array.isArray(response.collection) ? response.collection : (Array.isArray(response.data) ? response.data : []);
        const total = response.total || items.length;
        const last = response.last_page || 1;

        // Perform frontend price filter as price is calculated dynamically
        const filteredItems = items.filter((pitch: any) => {
          const badge = pitch.ten_loai_san || '';
          const name = badge.toLowerCase();
          let price = 120000;
          if (name.includes('bóng đá') || name.includes('football')) price = 350000;
          else if (name.includes('cầu lông') || name.includes('badminton')) price = 80000;
          else if (name.includes('tennis')) price = 200000;
          else if (name.includes('bóng rổ') || name.includes('basketball')) price = 150000;
          return price <= priceRange;
        });

        setPitches(filteredItems);
        setTotalCount(total);
        setLastPage(last);
      }
    } catch (err) {
      console.error('Failed to fetch pitches:', err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when page or sort changes
  useEffect(() => {
    fetchPitchData();
  }, [currentPage, activeSort]);

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchPitchData();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchText ? { search: searchText } : {});
    setCurrentPage(1);
    fetchPitchData();
  };

  return (
    <main style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '32px var(--margin-desktop)', display: 'flex', gap: 'var(--gutter)' }} className="pitch-list-layout">
      {/* Sidebar */}
      <FilterSidebar
        loaiSanOptions={loaiSanOptions}
        tinhOptions={tinhOptions}
        xaOptions={xaOptions}
        selectedLoaiSanIds={selectedLoaiSanIds}
        selectedTinhId={selectedTinhId}
        selectedXaId={selectedXaId}
        priceRange={priceRange}
        selectedAmenities={selectedAmenities}
        onLoaiSanChange={setSelectedLoaiSanIds}
        onTinhChange={setSelectedTinhId}
        onXaChange={setSelectedXaId}
        onPriceRangeChange={setPriceRange}
        onAmenitiesChange={setSelectedAmenities}
        onApplyFilters={handleApplyFilters}
      />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Header & Unified Search Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}>
                Danh sách sân thể thao
              </h1>
              <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>
                Tìm thấy {loading ? '...' : totalCount} sân thể thao thực tế
              </p>
            </div>

            {/* Sort Buttons */}
            <div className="sort-pills">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`sort-pill ${activeSort === opt.value ? 'sort-pill--active' : ''}`}
                  onClick={() => setActiveSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unified search input at the top of PitchList */}
          <form onSubmit={handleSearchSubmit} className="search-pitch-form">
            <Icon name="search" size={22} style={{ color: 'var(--outline)' }} />
            <input
              type="text"
              placeholder="Tìm kiếm sân nhanh theo tên hoặc từ khóa..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-pitch-input"
            />
            <button type="submit" className="btn btn-primary search-pitch-btn">
              Tìm sân
            </button>
          </form>
        </div>

        {/* Venue Grid */}
        <div className="pitch-list-grid">
          {loading ? (
            // Shimmer skeletons
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="skeleton-card" style={{ height: '420px', borderRadius: '12px', background: 'var(--surface-container-low)', overflow: 'hidden', position: 'relative' }}>
                <div className="shimmer" style={{ width: '100%', height: '192px', background: 'var(--surface-container)' }}></div>
                <div style={{ padding: '24px' }}>
                  <div className="shimmer" style={{ width: '60%', height: '24px', borderRadius: '4px', background: 'var(--surface-container)', marginBottom: '16px' }}></div>
                  <div className="shimmer" style={{ width: '80%', height: '16px', borderRadius: '4px', background: 'var(--surface-container)', marginBottom: '16px' }}></div>
                  <div className="shimmer" style={{ width: '100%', height: '16px', borderRadius: '4px', background: 'var(--surface-container)', marginBottom: '16px' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                    <div className="shimmer" style={{ width: '40%', height: '24px', borderRadius: '4px', background: 'var(--surface-container)' }}></div>
                    <div className="shimmer" style={{ width: '30%', height: '36px', borderRadius: '8px', background: 'var(--surface-container)' }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : pitches.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--on-surface-variant)', fontSize: '16px' }}>
              Không tìm thấy sân thể thao nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            pitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <PitchCard pitch={pitch} variant="list" />
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {lastPage > 1 && (
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <Icon name="chevron_left" size={20} />
            </button>

            {Array.from({ length: lastPage }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'page-btn--active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
              disabled={currentPage === lastPage}
            >
              <Icon name="chevron_right" size={20} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .search-pitch-form {
          display: flex;
          align-items: center;
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          padding: 8px 12px;
          border-radius: 12px;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }
        .search-pitch-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-main);
          font-size: 16px;
          color: var(--on-surface);
        }
        .search-pitch-input::placeholder {
          color: var(--outline);
        }
        .search-pitch-btn {
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }
        .pitch-list-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .sort-pills {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--surface-container-high);
          padding: 4px;
          border-radius: 9999px;
        }
        .sort-pill {
          padding: 10px 20px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          font-family: var(--font-main);
          font-size: 12px;
          font-weight: 700;
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: all 0.2s;
        }
        .sort-pill:hover {
          background: var(--surface-variant);
        }
        .sort-pill--active {
          background: var(--primary);
          color: var(--on-primary);
          box-shadow: var(--shadow-sm);
        }
        .sort-pill--active:hover {
          background: var(--primary);
        }
        .page-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--outline-variant);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 14px;
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-btn:hover {
          background: var(--surface-container);
        }
        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-btn--active {
          background: var(--primary);
          color: var(--on-primary);
          border-color: var(--primary);
        }
        .page-btn--active:hover {
          background: var(--primary);
        }
        .shimmer {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @media (max-width: 1100px) {
          .pitch-list-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .pitch-list-layout {
            flex-direction: column !important;
          }
          .pitch-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
};

export default PitchList;
