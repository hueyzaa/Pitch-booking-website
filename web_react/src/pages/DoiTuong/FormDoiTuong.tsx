import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';

const FormDoiTuong = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten_doi_tuong'
          label='Tên đối tượng'
          rules={[{ required: true, message: 'Tên đối tượng không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên đối tượng' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={24}>
        <BaseForm.Item
          name='phan_tram_giam_gia'
          label='Phần trăm giảm giá (%)'
          rules={[{ required: true, message: 'Phần trăm giảm giá không được bỏ trống' }]}
          initialValue={0}
        >
          <BaseInputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value!.replace('%', '')}
            style={{ width: '100%' }}
            placeholder='Nhập phần trăm giảm giá (0-100)'
          />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormDoiTuong;
