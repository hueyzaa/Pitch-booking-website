export const ConvertTextCheckBox = (key: string): string => {
  switch (key) {
    case 'export':
      return 'Xuất file';
    case 'index':
      return 'Xem';
    case 'create':
      return 'Thêm';
    case 'show':
      return 'Chi tiết';
    case 'edit':
      return 'Sửa';
    case 'delete':
      return 'Xóa';
    case 'import':
      return 'Nhập file';
    case 'showMenu':
      return 'Hiện menu';
    case 'changePassword':
      return 'Đổi mật khẩu';
    default:
      return key;
  }
};

export const ConvertTextRoles = (key: any): any => {
  switch (key) {
    case 'roles':
      return 'Vai trò';
    case 'users':
      return 'Người dùng';
    case 'tinh':
      return 'Tỉnh';
    case 'huyen':
      return 'Huyện';
    case 'xa':
      return 'Xã';
    case 'thong-bao':
      return 'Thông báo';
    case 'dashboard':
      return 'Dashboard';
    default:
      return key;
  }
};
