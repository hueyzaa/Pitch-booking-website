import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { gioiTinhSelect } from '@app/configs/select-configs';

interface FormKhachHangProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormKhachHang = ({ isEditing = false, disabled = false }: FormKhachHangProps) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={12}>
        <BaseForm.Item
          name='ho_va_ten'
          label='Họ và tên'
          rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập họ và tên' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='so_dien_thoai'
          label='Số điện thoại'
          rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập số điện thoại' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='gioi_tinh' label='Giới tính'>
          <BaseSelect options={gioiTinhSelect} placeholder='Chọn giới tính' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='ngay_sinh' label='Ngày sinh'>
          <BaseDatePicker placeholder='Chọn ngày sinh' format={'DD/MM/YYYY'} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='email' label='Email' rules={[{ type: 'email', message: 'Email không đúng định dạng!' }]}>
          <BaseInput placeholder='Nhập email' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name='id_doi_tuong'
          label='Đối tượng'
          path={API_URL.DOI_TUONG + '/options'}
          placeholder='Chọn đối tượng'
          disabled={disabled}
          rules={[{ required: true, message: 'Đối tượng không được bỏ trống' }]}
        />
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='dia_chi' label='Địa chỉ'>
          <BaseInput.TextArea placeholder='Nhập địa chỉ' rows={2} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormKhachHang;
