import { BaseFormProps } from '@app/components/common/forms/BaseForm/BaseForm';
import { Rule } from 'antd/lib/form';
import { ReactNode } from 'react';

export type Dimension = number | string;

export interface LoginFormData {
  tai_khoan: string;
  mat_khau: string;
}

// export type LanguageType = 'de' | 'en';
export type LanguageType = 'vi' | 'en';

export type ThemeType = 'light' | 'dark';

export interface IApiSuccess {
  code: number;
  status: boolean;
  message: string;
  data: any;
}

export interface Roles {
  name: string;
  actions: IActions;
}

export interface Actions {
  index: boolean;
  create: boolean;
  show: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
  showMenu: boolean;
}

export interface IActions {
  [key: string]: boolean;
}
export type Severity = 'success' | 'error' | 'info' | 'warning';

export interface SelectProps extends BaseFormProps {
  filter?: any; //createFilterQuery(0, 'ly_do.loai', 'equal', 'THU')
  path: string;
  name: any;
  label?: ReactNode;
  rules?: Rule[] | undefined;
  mode?: 'multiple' | 'tags' | undefined;
  initialValue?: any;
  hidden?: boolean;
  onChange?: (value: any, option?: any) => void;
  isEdit?: boolean;
  disabled?: boolean;
  reload?: boolean;
  placeholder?: string;
  value?: any;
}

export interface NguoiDungVaiTro {
  id?: number;
  nguoi_dung_id?: number;
  vai_tro_id?: number;
  ghi_chu?: string;
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
  ngay_tao?: string;
  ngay_cap_nhat?: string;
  vai_tro?: VaiTro;
}

export interface VaiTro {
  id?: number;
  ma_vai_tro?: string;
  ten_vai_tro?: string;
  nguoi_tao?: number;
  ngay_tao?: string;
  nguoi_cap_nhat?: any;
  ngay_cap_nhat?: string;
  trang_thai?: number;
  phan_quyen?: any;
}
export interface IUser {
  id: number;
  nguoi_tao: number;
  ngay_tao: string;
  nguoi_cap_nhat: number;
  ngay_cap_nhat: string;
  tai_khoan: string;
  mat_khau: string;
  so_dien_thoai: string;
  email: string;
  ma_vai_tro: string;
  reset_pass_token: string;
  ho: string;
  ten: string;
  ho_va_ten: string;
  ngay_sinh: string;
  gioi_tinh: number;
  dia_chi: string;
  tinh_id: number;
  huyen_id: number;
  xa_id: number;
  trang_thai: number;
  need_change_password: number;
  phan_quyen: string;
  ten_vai_tro: string;
  avatar: string;
  requireRecaptcha?: boolean;
  requireOtp?: boolean;
  timeOut?: number;
  need_update_password?: boolean;
  nguoi_dung_vai_tros?: NguoiDungVaiTro[];
}
