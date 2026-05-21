import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { formatter, parser } from '@app/utils/utils';

interface FormBangGiaProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormBangGia = ({ isEditing = false, disabled = false }: FormBangGiaProps) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten_bang_gia'
          label='Tên bảng giá'
          rules={[{ required: true, message: 'Tên bảng giá không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên bảng giá' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='don_gia'
          label='Đơn giá (VNĐ/giờ)'
          rules={[{ required: true, message: 'Đơn giá không được bỏ trống' }]}
        >
          <BaseInputNumber
            parser={parser}
            formatter={formatter}
            placeholder='Nhập đơn giá'
            style={{ width: '100%' }}
            disabled={disabled}
            min={0}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={6}>
        <BaseForm.Item name='gio_bat_dau' label='Giờ bắt đầu'>
          <BaseInput placeholder='Vd: 06:00' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={6}>
        <BaseForm.Item name='gio_ket_thuc' label='Giờ kết thúc'>
          <BaseInput placeholder='Vd: 22:00' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name='id_loai_san'
          label='Loại sân'
          path={API_URL.LOAI_SAN + '/options'}
          placeholder='Chọn loại sân'
          disabled={disabled}
        />
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name='id_doi_tuong'
          label='Đối tượng'
          path={API_URL.DOI_TUONG + '/options'}
          placeholder='Chọn đối tượng'
          disabled={disabled}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default FormBangGia;
