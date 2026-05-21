import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { trangThaiSelect } from '@app/configs/select-configs';
import { formatter, parser } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import { getDataSelect } from '@app/api/getData.api';
import { Form } from 'antd';

interface FormQuanLyGiaProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormQuanLyGia = ({ isEditing = false, disabled = false }: FormQuanLyGiaProps) => {
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
          name='gia_theo_gio'
          label='Giá gốc theo giờ (VNĐ/h)'
          rules={[{ required: true, message: 'Giá gốc theo giờ không được bỏ trống' }]}
          initialValue={0}
        >
          <BaseInputNumber
            parser={parser}
            formatter={formatter}
            placeholder='Nhập giá gốc theo giờ'
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='ngay_bat_dau' label='Ngày bắt đầu'>
          <BaseDatePicker
            placeholder='Chọn ngày bắt đầu'
            format={'DD/MM/YYYY'}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='ngay_ket_thuc' label='Ngày kết thúc'>
          <BaseDatePicker
            placeholder='Chọn ngày kết thúc'
            format={'DD/MM/YYYY'}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='trang_thai' label='Trạng thái'>
          <BaseSelect options={trangThaiSelect} placeholder='Chọn trạng thái' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='ghi_chu' label='Ghi chú'>
          <BaseInput.TextArea placeholder='Nhập ghi chú' rows={2} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormQuanLyGia;
