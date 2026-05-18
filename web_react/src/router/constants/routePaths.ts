/**
 * Centralized route path constants
 * Use these constants throughout the application to avoid hardcoded strings
 */
export const ROUTE_PATHS = {
  // Root
  ROOT: '/',

  // Auth routes
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    SECURITY_CODE: '/auth/security-code',
    NEW_PASSWORD: '/auth/new-password',
    VERIFY_OTP: '/auth/verify-otp'
  },

  // Profile routes
  PROFILE: {
    BASE: '/profile',
    PERSONAL_INFO: '/profile/personal-info',
    SECURITY_SETTINGS: '/profile/security-settings',
    UPDATE_PASSWORD: '/profile/update-pass-settings'
  },

  // Account management
  ACCOUNT: {
    ROLES: '/tai-khoan/vai-tro',
    USERS: '/tai-khoan/nguoi-dung'
  },

  // System configuration
  SYSTEM: {
    GENERAL_CONFIG: '/cau-hinh-chung',
    SYSTEM_INFO: '/he-thong',
    UPLOAD_MANAGEMENT: '/quan-ly-upload'
  },

  // Logs
  LOGS: {
    ACTIONS: '/log-thao-tac'
  },

  // Other
  FIRST_LOGIN: '/first-login',
  LOGOUT: '/logout',
  NOT_FOUND: '*'
} as const;

// Type for route paths - enables autocomplete and type checking
export type RoutePathsType = typeof ROUTE_PATHS;
