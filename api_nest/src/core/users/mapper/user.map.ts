import {
  USER_EXCEL_HEADERS,
  USER_EXCEL_COLUMNS,
} from '../constants/users.constants';

/**
 * User Excel import/export mapping configuration
 */
export const userMap = {
  /**
   * Excel column headers for export
   */
  headers: USER_EXCEL_HEADERS,

  /**
   * Mapping between Excel columns and user entity fields
   */
  map: {
    [USER_EXCEL_COLUMNS.HO]: 'ho',
    [USER_EXCEL_COLUMNS.TEN]: 'ten',
    [USER_EXCEL_COLUMNS.TAI_KHOAN]: 'tai_khoan',
    [USER_EXCEL_COLUMNS.MAT_KHAU]: 'mat_khau',
    [USER_EXCEL_COLUMNS.SO_DIEN_THOAI]: 'so_dien_thoai',
    [USER_EXCEL_COLUMNS.NGAY_SINH]: 'ngay_sinh',
    [USER_EXCEL_COLUMNS.GIOI_TINH]: 'gioi_tinh',
    [USER_EXCEL_COLUMNS.DIA_CHI]: 'dia_chi',
    [USER_EXCEL_COLUMNS.TINH_ID]: 'tinh_id',
    [USER_EXCEL_COLUMNS.XA_ID]: 'xa_id',
    [USER_EXCEL_COLUMNS.EMAIL]: 'email',
    [USER_EXCEL_COLUMNS.MA_VAI_TRO]: 'ma_vai_tro',
    [USER_EXCEL_COLUMNS.TRANG_THAI]: 'trang_thai',
  } as const,
} as const;
