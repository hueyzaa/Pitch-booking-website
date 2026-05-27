import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';

const FormDanhGia = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={12}>
        <SelectFormApi
          name='id_nguoi_dung'
          label='Khách hàng'
          path={API_URL.NGUOI_DUNG + API_URL.OPTIONS}
          placeholder='Chọn khách hàng'
          rules={[{ required: true, message: 'Khách hàng không được bỏ trống'}]}
          disabled={isEditing}
        />
      </BaseCol>
      <BaseCol span={12}>
        <SelectFormApi
          name='id_san'
          label='Sân'
          path={API_URL.SAN + API_URL.OPTIONS}
          placeholder='Chọn sân'
          rules={[{ required: true, message: 'Sân không được bỏ trống'}]}
          disabled={isEditing}
        />
      </BaseCol>
      <BaseCol span={12}>
        <BaseForm.Item
          name='so_sao'
          label='Số sao (1-5)'
          rules={[{ required: true, message: 'Số sao không được bỏ trống'}]}
        >
          <BaseInputNumber min={1} max={5} placeholder='Nhập số sao (1-5)' style={{ width: '100%' }} />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={12}>
        <SelectFormApi
          name='trang_thai'
          label='Trạng thái'
          path={""}
          isNotAPI={true}
          data={[
            { value: 1, label: 'Hiển thị' },
            { value: 0, label: 'Ẩn' }
          ]}
          placeholder='Chọn trạng thái'
          rules={[{ required: true, message: 'Trạng thái không được bỏ trống'}]}
        />
      </BaseCol>
      <BaseCol span={24}>
        <BaseForm.Item
          name='noi_dung'
          label='Nội dung đánh giá'
        >
          <BaseInput.TextArea rows={4} placeholder='Nhập nội dung đánh giá' />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormDanhGia;
