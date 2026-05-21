import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';

const FormLoaiSan = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten_loai_san'
          label='Tên loại sân'
          rules={[{ required: true, message: 'Tên loại sân không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên' />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormLoaiSan;
