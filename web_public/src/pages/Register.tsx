import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { register as registerApi, getTinhOptions, getXaOptions } from '../api/api';
import Icon from '../components/Icon';

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Dropdown States
  const [tinhOptions, setTinhOptions] = useState<Array<{ value: number; label: string }>>([]);
  const [xaOptions, setXaOptions] = useState<Array<{ value: number; label: string }>>([]);

  // Form Field States
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [confirmMatKhau, setConfirmMatKhau] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [gioiTinh, setGioiTinh] = useState(1); // 1 = Nam, 0 = Nữ
  const [tinhId, setTinhId] = useState<number | undefined>(undefined);
  const [xaId, setXaId] = useState<number | undefined>(undefined);
  const [diaChi, setDiaChi] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch Provinces on Mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getTinhOptions();
        const optionsList = Array.isArray(response)
          ? response
          : (response && Array.isArray(response.collection) ? response.collection : []);
        setTinhOptions(optionsList);
      } catch (err) {
        console.error('Failed to load provinces:', err);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch Wards when Province changes
  useEffect(() => {
    const fetchWards = async () => {
      if (!tinhId) {
        setXaOptions([]);
        setXaId(undefined);
        return;
      }
      try {
        const response = await getXaOptions(tinhId);
        const optionsList = Array.isArray(response)
          ? response
          : (response && Array.isArray(response.collection) ? response.collection : []);
        setXaOptions(optionsList);
      } catch (err) {
        console.error('Failed to load wards:', err);
      }
    };
    fetchWards();
  }, [tinhId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error
    setError(null);

    // Validations
    if (!ho.trim() || !ten.trim() || !email.trim() || !sdt.trim() || !taiKhoan.trim() || !matKhau.trim() || !confirmMatKhau.trim()) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    if (matKhau !== confirmMatKhau) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    if (matKhau.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    // Basic phone validation (digits and length)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(sdt.replace(/[\s.-]/g, ''))) {
      setError('Số điện thoại không hợp lệ (yêu cầu 10-11 chữ số)');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ho: ho.trim(),
        ten: ten.trim(),
        email: email.trim(),
        so_dien_thoai: sdt.trim(),
        tai_khoan: taiKhoan.trim(),
        mat_khau: matKhau,
        ngay_sinh: ngaySinh || undefined,
        gioi_tinh: gioiTinh,
        tinh_id: tinhId || 0,
        xa_id: xaId || 0,
        dia_chi: diaChi.trim() || '',
      };

      await registerApi(payload);

      setSuccess(true);
      setTimeout(() => {
        navigate('/dang-nhap');
      }, 2500);
    } catch (err: any) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || 'Đăng ký tài khoản thất bại. Tên tài khoản, email hoặc số điện thoại có thể đã tồn tại.';
      setError(msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      {/* Background glow effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            className="register-card"
            key="register-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="brand-header">
              <div className="logo-badge">
                <Icon name="person_add" size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h2>Đăng ký tài khoản</h2>
              <p>Trở thành thành viên của SportBooking để đặt sân bóng nhanh và tiện lợi</p>
            </div>

            {error && (
              <motion.div
                className="error-alert"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Icon name="error" size={20} />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              {/* Row 1: Ho & Ten */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label htmlFor="ho">Họ <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input
                      id="ho"
                      type="text"
                      placeholder="Nguyễn"
                      value={ho}
                      onChange={(e) => setHo(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ten">Tên <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input
                      id="ten"
                      type="text"
                      placeholder="Văn An"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & SDT */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label htmlFor="email">Địa chỉ Email <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Icon name="mail" className="input-icon" size={18} />
                    <input
                      id="email"
                      type="email"
                      placeholder="an.nguyen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="sdt">Số điện thoại <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Icon name="call" className="input-icon" size={18} />
                    <input
                      id="sdt"
                      type="tel"
                      placeholder="0987654321"
                      value={sdt}
                      onChange={(e) => setSdt(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Ngay Sinh & Gioi Tinh */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label htmlFor="ngaySinh">Ngày sinh</label>
                  <div className="input-wrapper">
                    <input
                      id="ngaySinh"
                      type="date"
                      value={ngaySinh}
                      onChange={(e) => setNgaySinh(e.target.value)}
                      disabled={loading}
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="gioiTinh">Giới tính</label>
                  <div className="input-wrapper">
                    <select
                      id="gioiTinh"
                      value={gioiTinh}
                      onChange={(e) => setGioiTinh(Number(e.target.value))}
                      disabled={loading}
                      className="styled-select"
                    >
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 4: Account Details */}
              <div className="form-group">
                <label htmlFor="taiKhoan">Tên tài khoản <span className="required">*</span></label>
                <div className="input-wrapper">
                  <Icon name="person" className="input-icon" size={18} />
                  <input
                    id="taiKhoan"
                    type="text"
                    placeholder="Nhập tên đăng nhập viết liền không dấu"
                    value={taiKhoan}
                    onChange={(e) => setTaiKhoan(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Row 5: Passwords */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label htmlFor="matKhau">Mật khẩu <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Icon name="lock" className="input-icon" size={18} />
                    <input
                      id="matKhau"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu (ít nhất 6 ký tự)"
                      value={matKhau}
                      onChange={(e) => setMatKhau(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmMatKhau">Nhập lại mật khẩu <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Icon name="lock" className="input-icon" size={18} />
                    <input
                      id="confirmMatKhau"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      value={confirmMatKhau}
                      onChange={(e) => setConfirmMatKhau(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      <Icon name={showConfirmPassword ? 'visibility_off' : 'visibility'} size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className="section-divider">Địa chỉ nhận thông tin</div>

              {/* Row 6: Tinh & Xa (Address Dropdowns) */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label htmlFor="tinh">Tỉnh / Thành phố</label>
                  <div className="input-wrapper">
                    <select
                      id="tinh"
                      value={tinhId || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTinhId(val ? Number(val) : undefined);
                      }}
                      disabled={loading}
                      className="styled-select"
                    >
                      <option value="">-- Chọn Tỉnh / Thành phố --</option>
                      {tinhOptions.map((tinh) => (
                        <option key={tinh.value} value={tinh.value}>
                          {tinh.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="xa">Phường / Xã</label>
                  <div className="input-wrapper">
                    <select
                      id="xa"
                      value={xaId || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setXaId(val ? Number(val) : undefined);
                      }}
                      disabled={loading || !tinhId}
                      className="styled-select"
                    >
                      <option value="">-- Chọn Phường / Xã --</option>
                      {xaOptions.map((xa) => (
                        <option key={xa.value} value={xa.value}>
                          {xa.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 7: Dia Chi */}
              <div className="form-group">
                <label htmlFor="diaChi">Địa chỉ chi tiết</label>
                <div className="input-wrapper">
                  <Icon name="home" className="input-icon" size={18} />
                  <input
                    id="diaChi"
                    type="text"
                    placeholder="Số nhà, ngõ/ngách, đường phố..."
                    value={diaChi}
                    onChange={(e) => setDiaChi(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader-small"></span>
                ) : (
                  <>
                    Tạo tài khoản mới
                    <Icon name="person_add" size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <span>Bạn đã có tài khoản rồi?</span>
              <Link to="/dang-nhap" className="switch-auth-link">
                Đăng nhập tại đây
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="success-card"
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="success-icon-badge">
              <Icon name="check_circle" size={56} style={{ color: 'var(--primary)' }} />
            </div>
            <h2>Đăng ký thành công!</h2>
            <p>Chào mừng <strong>{ho} {ten}</strong> đã trở thành thành viên của SportBooking.</p>
            <div className="redirect-info">
              <span className="loader-small" style={{ borderTopColor: 'var(--primary)', width: '24px', height: '24px', borderWidth: '3px' }}></span>
              <span>Đang tự động chuyển hướng về trang Đăng nhập...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .register-page {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          position: relative;
          overflow: hidden;
          background: #fdfdff;
        }

        /* Ambient Glow Backgrounds */
        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.12;
          z-index: 1;
        }
        .bg-glow-1 {
          width: 500px;
          height: 500px;
          background: var(--primary);
          top: -150px;
          left: -150px;
        }
        .bg-glow-2 {
          width: 500px;
          height: 500px;
          background: var(--primary-container);
          bottom: -150px;
          right: -150px;
        }

        .register-card {
          width: 100%;
          max-width: 680px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: var(--shadow-xl);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          z-index: 5;
        }

        .success-card {
          width: 100%;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          box-shadow: var(--shadow-xl);
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          border: 1px solid var(--outline-variant);
          z-index: 5;
        }
        .success-icon-badge {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        .success-card h2 {
          font-size: 28px;
          font-weight: 800;
          color: var(--on-surface);
          margin-bottom: 12px;
        }
        .success-card p {
          color: var(--on-surface-variant);
          font-size: 15px;
          line-height: 22px;
          margin-bottom: 32px;
        }
        .redirect-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: var(--outline);
        }

        .brand-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo-badge {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: var(--surface-container-low);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 1px solid var(--outline-variant);
          box-shadow: var(--shadow-sm);
        }
        .brand-header h2 {
          font-size: 26px;
          font-weight: 800;
          color: var(--on-surface);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .brand-header p {
          font-size: 14px;
          color: var(--on-surface-variant);
          line-height: 20px;
        }

        .error-alert {
          background: var(--error-container);
          color: var(--on-error-container);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          border: 1px solid rgba(186, 26, 26, 0.15);
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: grid;
          gap: 16px;
        }
        .form-row-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--on-surface);
        }
        .required {
          color: var(--error);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--outline);
          pointer-events: none;
        }
        .input-wrapper input,
        .styled-select {
          width: 100%;
          height: 46px;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 10px;
          padding: 0 14px;
          font-family: var(--font-main);
          font-size: 14px;
          color: var(--on-surface);
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-wrapper input {
          padding-left: 42px;
        }
        .input-wrapper input:focus,
        .styled-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(0, 108, 73, 0.08);
          background: #ffffff;
        }

        .styled-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23565e74'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 20px;
          padding-right: 40px;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--outline);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .password-toggle:hover {
          color: var(--on-surface);
        }

        .section-divider {
          font-size: 12px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 10px;
          padding-bottom: 8px;
          border-bottom: 1.5px dashed var(--outline-variant);
        }

        .btn-submit {
          height: 50px;
          font-size: 15px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          border-radius: 12px;
        }

        .loader-small {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .auth-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 13px;
          color: var(--on-surface-variant);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .switch-auth-link {
          font-weight: 700;
          color: var(--primary);
          transition: color 0.2s;
        }
        .switch-auth-link:hover {
          color: var(--on-primary-container);
          text-decoration: underline;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .register-card {
            padding: 30px 16px;
            border-radius: 20px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .brand-header h2 {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
};

export default Register;
