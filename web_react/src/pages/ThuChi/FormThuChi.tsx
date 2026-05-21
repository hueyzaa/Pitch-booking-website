import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { loaiGiaoDichSelect } from '@app/configs/select-configs';
import { formatter, parser } from '@app/utils/utils';

interface FormThuChiProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormThuChi = ({ isEditing = false, disabled = false }: FormThuChiProps) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={12}>
        <BaseForm.Item
          name="loai_giao_dich"
          label="Loại giao dịch"
          rules={[{ required: true, message: 'Loại giao dịch không được bỏ trống' }]}
        >
          <BaseSelect
            options={loaiGiaoDichSelect}
            placeholder="Chọn loại giao dịch"
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name="danh_muc"
          label="Danh mục"
          rules={[{ required: true, message: 'Danh mục không được bỏ trống' }]}
        >
          <BaseInput placeholder="Nhập danh mục (vd: Thuê sân, điện nước, lương...)" disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name="so_tien"
          label="Số tiền"
          rules={[{ required: true, message: 'Số tiền không được bỏ trống' }]}
        >
          <BaseInputNumber
            parser={parser}
            formatter={formatter}
            placeholder="Nhập số tiền (VNĐ)"
            style={{ width: '100%' }}
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name="ngay_giao_dich"
          label="Ngày giao dịch"
          rules={[{ required: true, message: 'Ngày giao dịch không được bỏ trống' }]}
        >
          <BaseDatePicker
            placeholder="Chọn ngày giao dịch"
            format={'DD/MM/YYYY'}
            style={{ width: '100%' }}
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name="id_khach_hang"
          label="Khách hàng"
          path={API_URL.KHACH_HANG + '/options'}
          placeholder="Chọn khách hàng (nếu có)"
          disabled={disabled}
        />
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name="id_san"
          label="Sân"
          path={API_URL.SAN + '/options'}
          placeholder="Chọn sân (nếu có)"
          disabled={disabled}
        />
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name="mo_ta" label="Mô tả">
          <BaseInput.TextArea placeholder="Nhập mô tả chi tiết giao dịch" rows={2} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name="ghi_chu" label="Ghi chú">
          <BaseInput.TextArea placeholder="Nhập ghi chú thêm" rows={2} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormThuChi;
