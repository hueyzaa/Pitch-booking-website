const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf-8');

const startIdx = content.indexOf('{/* Main Content */}');
const endIdx = content.indexOf('<style>{`');

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `{/* Main Content */}
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
                      <div style={{ flex: 1.5 }}>
                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{booking.ngay_dat}</p>
                        <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{booking.gio_bat_dau} - {booking.gio_ket_thuc}</p>
                      </div>
                      <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: '14px' }}>{formatPrice(Number(booking.tong_tien))}</p></div>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Link to={\`/san-the-thao/\${booking.san?.id || booking.id}\`} style={{ color: 'var(--on-surface-variant)' }}><Icon name="open_in_new" size={20} /></Link>
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
                      <div style={{ flex: 1.5 }}>
                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{booking.ngay_dat}</p>
                        <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>{booking.gio_bat_dau} - {booking.gio_ket_thuc}</p>
                      </div>
                      <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: '14px' }}>{formatPrice(Number(booking.tong_tien))}</p></div>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Link to={\`/san-the-thao/\${booking.san?.id || booking.id}\`} style={{ color: 'var(--on-surface-variant)' }}><Icon name="open_in_new" size={20} /></Link>
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
                  <Link key={pitch.id} to={\`/san-the-thao/\${pitch.id}\`} className="fav-card">
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

      `;
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync('src/pages/Dashboard.tsx', content);
}
