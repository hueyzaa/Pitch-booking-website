import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';

const FormSan = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten_san'
          label='Tên sân'
          rules={[{ required: true, message: 'Tên sân không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên sân' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={24}>
        <SelectFormApi
          name='id_loai_san'
          label='Loại sân'
          path={API_URL.LOAI_SAN + '/options'}
          placeholder='Chọn loại sân'
          rules={[{ required: true, message: 'Loại sân không được bỏ trống'}]}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default FormSan;
