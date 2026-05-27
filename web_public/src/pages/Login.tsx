import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../api/api';
import Icon from '../components/Icon';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await loginApi({
        tai_khoan: username,
        mat_khau: password,
      });

      if (data && data.token) {
        login(data.token, data);
        navigate('/');
      } else {
        setError('Đăng nhập thất bại. Vui lòng thử lại');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* Visual Ambient Background Spheroids */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Brand Header */}
        <div className="brand-header">
          <div className="logo-badge">
            <Icon name="sports_soccer" size={32} style={{ color: 'var(--primary)' }} />
          </div>
          <h2>Chào mừng quay trở lại!</h2>
          <p>Đăng nhập để tiếp tục đặt sân bóng và theo dõi lịch đặt chỗ</p>
        </div>

        {/* Error Alert */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Tên tài khoản</label>
            <div className="input-wrapper">
              <Icon name="person" className="input-icon" size={20} />
              <input
                id="username"
                type="text"
                placeholder="Nhập tên tài khoản của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Mật khẩu</label>
              <Link to="/quen-mat-khau" className="forgot-password-link">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="input-wrapper">
              <Icon name="lock" className="input-icon" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block btn-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loader-small"></span>
            ) : (
              <>
                Đăng nhập ngay
                <Icon name="arrow_forward" size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>Bạn chưa có tài khoản?</span>
          <Link to="/dang-ky" className="switch-auth-link">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </motion.div>

      <style>{`
        .login-page {
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
          width: 400px;
          height: 400px;
          background: var(--primary);
          top: -100px;
          left: -100px;
        }
        .bg-glow-2 {
          width: 400px;
          height: 400px;
          background: var(--primary-container);
          bottom: -100px;
          right: -100px;
        }

        .login-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: var(--shadow-xl);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          z-index: 5;
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

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
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
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forgot-password-link {
          font-size: 12px;
          font-weight: 500;
          color: var(--primary);
          transition: color 0.2s;
        }
        .forgot-password-link:hover {
          color: var(--on-primary-container);
          text-decoration: underline;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          color: var(--outline);
          pointer-events: none;
        }
        .input-wrapper input {
          width: 100%;
          height: 48px;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          padding: 0 16px 0 48px;
          font-family: var(--font-main);
          font-size: 14px;
          color: var(--on-surface);
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-wrapper input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(0, 108, 73, 0.08);
          background: #ffffff;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: var(--outline);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .password-toggle:hover {
          color: var(--on-surface);
        }

        .btn-submit {
          height: 50px;
          font-size: 15px;
          margin-top: 8px;
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

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
            border-radius: 20px;
          }
          .brand-header h2 {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
};

export default Login;
