// API thay đổi dữ liệu quan trọng
// API quản trị hệ thống
// API liên quan đến tài chính hoặc giao dịch
export const URL_SEVERITY_MAP = {
  //CAO
  MUC_2: [
    { url: '/users', methods: ['POST', 'PATCH', 'DELETE'] },
    { url: '/roles', methods: ['POST', 'PATCH', 'DELETE'] },
    // Thêm các URL khác thuộc MUC_2
  ],
  //NGHIEM TRONG
  MUC_3: [],
};

// phân nhóm log
export const LOG_CATEGORY = {
  NHOM_1: 'Truy cập chương trình',
  NHOM_2: 'Đăng nhập / Đăng xuất hệ thống',
  NHOM_3: 'Lỗi phát sinh trong quá trình hoạt động',
  NHOM_4: 'Quản lý tài khoản',
  NHOM_5: 'Thay đổi cấu hình phần mềm',
};

// đánh giá mức độ tác động
export const IMPACT_SEVERITY = {
  MUC_1: 'Bình thường',
  MUC_2: 'Cao',
  MUC_3: 'Nghiêm trọng',
};

export const LOG_CATEGORY_DTO = [
  { value: 1, name: LOG_CATEGORY.NHOM_1 },
  { value: 2, name: LOG_CATEGORY.NHOM_2 },
  { value: 3, name: LOG_CATEGORY.NHOM_3 },
  { value: 4, name: LOG_CATEGORY.NHOM_4 },
  { value: 5, name: LOG_CATEGORY.NHOM_5 },
];

export const IMPACT_SEVERITY_DTO = [
  { value: 1, name: IMPACT_SEVERITY.MUC_1 },
  { value: 2, name: IMPACT_SEVERITY.MUC_2 },
  { value: 3, name: IMPACT_SEVERITY.MUC_3 },
];

// Dịch các tên path sang tiếng Việt
export const entityMap = {
  dashboard: 'Trang chủ',
  'auth/login': 'Đăng nhập',
  'auth/logout': 'Đăng xuất',
  'auth/forgot-password': 'Quên mật khẩu',
  'auth/reset-password': 'Đổi mật khẩu',
  'log-thao-tac': 'Log thao tác',
  log: 'Log',
  'nguoi-dung-thiet-bi': 'Người dùng thiết bị',
  users: 'Người dùng',
  'thong-bao': 'Thông báo',
  roles: 'Vai trò',
  tinh: 'Tỉnh',
  huyen: 'Huyện',
  xa: 'Xã',
};
