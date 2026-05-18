const checkError = (error: string) => {
  if (error.includes('idx_email')) {
    return 'Địa chỉ email đã tồn tại';
  }
  if (error.includes('idx_tai_khoan')) {
    return 'Tài khoản đã tồn tại';
  }
  if (error.includes('idx_ma_nhan_vien')) {
    return 'Mã nhân viên đã tồn tại';
  }
  if (error.includes('idx_so_dien_thoai')) {
    return 'Số điện thoại đã tồn tại';
  }
  if (error.includes('IDX_MAVAITRO')) {
    return 'Mã vai trò đã tồn tại';
  }
  return error;
};
export default checkError;
