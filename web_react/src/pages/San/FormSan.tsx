import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { API_URL } from '@app/configs/api-configs';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import EventGalleryUpload from '@app/components/common/EventGalleryUpload/EventGalleryUpload';
import { Form, FormInstance } from 'antd';
import { createFilterQuery } from '@app/utils/utils';

const FormSan = ({ isEditing, form }: { isEditing: boolean; form: FormInstance }) => {
  const tinhId = Form.useWatch('tinh_id', form);

  const onChangeTinh = () => {
    form.setFieldValue('xa_id', null);
  };

  return (
    <BaseRow gutter={[32, 24]}>
      {/* Left Section: Info Fields & Gallery */}
      <BaseCol span={24} lg={16}>
        <BaseRow gutter={[16, 16]}>
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
              rules={[{ required: true, message: 'Loại sân không được bỏ trống' }]}
            />
          </BaseCol>
          <BaseCol span={12}>
            <SelectFormApi
              path={`${API_URL.TINH}${API_URL.OPTIONS}`}
              name='tinh_id'
              label='Tỉnh'
              placeholder='Chọn tỉnh'
              rules={[{ required: true, message: `Tỉnh không được bỏ trống` }]}
              onChange={onChangeTinh}
            />
          </BaseCol>
          <BaseCol span={12}>
            <SelectFormApi
              path={`${API_URL.XA}${API_URL.OPTIONS}`}
              name='xa_id'
              label='Xã'
              placeholder='Chọn xã'
              filter={tinhId && createFilterQuery(0, 'province_code', 'equal', tinhId)}
              rules={[{ required: true, message: `Xã không được bỏ trống` }]}
            />
          </BaseCol>
          <BaseCol span={24}>
            <BaseForm.Item
              name='dia_chi'
              label='Địa chỉ'
              rules={[{ required: true, message: `Địa chỉ không được bỏ trống` }]}
            >
              <BaseInput.TextArea placeholder='Nhập địa chỉ sân' rows={2} />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={24}>
            <BaseForm.Item name='tien_ich' label='Tiện ích'>
              <BaseSelect
                mode='multiple'
                placeholder='Chọn các tiện ích'
                options={[
                  { label: 'Wifi miễn phí', value: 'wifi' },
                  { label: 'Bãi đỗ xe lớn', value: 'local_parking' },
                  { label: 'Phòng tắm nóng lạnh', value: 'shower' },
                  { label: 'Nước uống & Căng tin', value: 'coffee' },
                  { label: 'Phòng thay đồ', value: 'checkroom' },
                  { label: 'Sơ cứu y tế', value: 'medical_services' }
                ]}
                allowClear
              />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={24}>
            <BaseForm.Item name='mo_ta' label='Mô tả'>
              <BaseInput.TextArea
                placeholder='Nhập mô tả chi tiết về sân bóng (ví dụ: chất lượng cỏ, hệ thống đèn, quy định sân...)'
                rows={4}
              />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={24}>
            <BaseForm.Item name='anh_chi_tiet' label='Ảnh chi tiết (Chọn nhiều ảnh)'>
              <EventGalleryUpload uploadText='Thêm ảnh chi tiết' />
            </BaseForm.Item>
          </BaseCol>
        </BaseRow>
      </BaseCol>

      {/* Right Section: Main Image */}
      <BaseCol span={24} lg={8}>
        <BaseForm.Item name='anh_chinh' label='Ảnh chính (Ảnh đại diện)'>
          <MainImageUpload
            title='Ảnh chính'
            showTitle={false}
            helperText='Ảnh đại diện của sân bóng.'
            uploadText='Tải ảnh chính'
            altText='Ảnh chính sân bóng'
            aspectRatio={1}
            previewWidth={240}
          />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormSan;
