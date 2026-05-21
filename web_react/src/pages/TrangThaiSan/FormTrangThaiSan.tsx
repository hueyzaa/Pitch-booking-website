import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { TimePicker } from 'antd';

interface FormTrangThaiSanProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormTrangThaiSan = ({ isEditing = false, disabled = false }: FormTrangThaiSanProps) => {
  const trangThaiOptions = [
    { value: 0, label: 'Trống' },
    { value: 1, label: 'Đã đặt' },
    { value: 2, label: 'Bảo trì' }
  ];

  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={12}>
        <SelectFormApi
          name='id_san'
          label='Sân'
          path={API_URL.SAN + '/options'}
          placeholder='Chọn sân'
          disabled={disabled}
          rules={[{ required: true, message: 'Sân không được bỏ trống' }]}
        />
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='ngay'
          label='Ngày'
          rules={[{ required: true, message: 'Ngày không được bỏ trống' }]}
        >
          <BaseDatePicker format='DD/MM/YYYY' placeholder='Chọn ngày' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='gio_bat_dau'
          label='Giờ bắt đầu'
          rules={[{ required: true, message: 'Giờ bắt đầu không được bỏ trống' }]}
        >
          <TimePicker format='HH:mm' placeholder='Giờ bắt đầu' disabled={disabled} style={{ width: '100%' }} size='small' />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='gio_ket_thuc'
          label='Giờ kết thúc'
          rules={[{ required: true, message: 'Giờ kết thúc không được bỏ trống' }]}
        >
          <TimePicker format='HH:mm' placeholder='Giờ kết thúc' disabled={disabled} style={{ width: '100%' }} size='small' />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item
          name='trang_thai'
          label='Trạng thái'
          rules={[{ required: true, message: 'Trạng thái không được bỏ trống' }]}
        >
          <BaseSelect options={trangThaiOptions} placeholder='Chọn trạng thái' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='ghi_chu' label='Ghi chú'>
          <BaseInput.TextArea placeholder='Nhập ghi chú' rows={3} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormTrangThaiSan;
