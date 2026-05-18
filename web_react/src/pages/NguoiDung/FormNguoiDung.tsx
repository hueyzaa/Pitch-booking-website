import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { gioiTinhSelect } from '@app/configs/select-configs';
import { passwordPattern } from '@app/constants/patterns';
import { createFilterQuery } from '@app/utils/utils';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FormNguoiDung = ({ isEditing, form }: { isEditing: boolean; form: FormInstance }) => {
  const [tinhId, setTinhId] = useState<null | number>(null);
  // const [huyenId, setHuyenId] = useState<null | number>(null);
  const { t } = useTranslation();

  const onChangeTinh = (value: number) => {
    setTinhId(value);
    // form.setFieldValue('huyen_id', null);
    form.setFieldValue('xa_id', null);
  };

  // const onChangeHuyen = (value: number) => {
  //   setHuyenId(value);
  //   form.setFieldValue('xa_id', null);
  // };

  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={8}>
        <SelectFormApi
          mode='multiple'
          name='vai_tro_ids'
          label='Vai trò'
          rules={[{ required: true, message: 'Vai trò không được bỏ trống' }]}
          path={`${API_URL.VAI_TRO}${API_URL.OPTIONS}`}
          placeholder='Chọn vai trò'
        />
      </BaseCol>
      <BaseCol span={8}>
        <BaseForm.Item
          name='email'
          label='Email'
          rules={[
            {
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng email'
            },
            {
              required: true,
              message: 'Email không được bỏ trống'
            }
          ]}
        >
          <BaseInput placeholder='Nhập email' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={8}>
        <BaseForm.Item name='ho' label='Họ' rules={[{ required: true, message: 'Họ không được bỏ trống' }]}>
          <BaseInput placeholder='Nhập tên' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={8}>
        <BaseForm.Item name='ten' label='Tên' rules={[{ required: true, message: 'Tên không được bỏ trống' }]}>
          <BaseInput placeholder='Nhập tên' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={8}>
        <BaseForm.Item
          name='so_dien_thoai'
          label='Số điện thoại'
          rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập số điện thoại' />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={8}>
        <BaseForm.Item
          name='tai_khoan'
          label='Tài khoản'
          rules={[{ required: true, message: 'Tài khoản không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tài khoản' />
        </BaseForm.Item>
      </BaseCol>
      {!isEditing ? (
        <>
          <BaseCol span={8}>
            <BaseForm.Item
              name='mat_khau'
              label='Mật khẩu'
              rules={[
                { required: true, message: 'Mật khẩu không được bỏ trống' },
                { pattern: passwordPattern, message: t('profile.nav.securitySettings.notValidPassword') }
              ]}
            >
              <InputPassword size='small' placeholder='Nhập mật khẩu' disabled={isEditing} />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={8}>
            <BaseForm.Item
              name='xac_nhan_mat_khau'
              label='Xác nhận mật khẩu'
              dependencies={['mat_khau']}
              hidden={isEditing}
              rules={[
                { required: true, message: 'Xác nhận mật khẩu không được bỏ trống' },
                { pattern: passwordPattern, message: t('profile.nav.securitySettings.notValidPassword') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('mat_khau') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Hai mật khẩu không khớp'));
                  }
                })
              ]}
            >
              <InputPassword size='small' placeholder='Nhập xác nhận mật khẩu' disabled={isEditing} />
            </BaseForm.Item>
          </BaseCol>
        </>
      ) : (
        ''
      )}
      <BaseCol span={8}>
        <BaseForm.Item
          name='ngay_sinh'
          label='Ngày sinh'
          rules={[{ required: true, message: 'Ngày sinh không được bỏ trống' }]}
        >
          <BaseDatePicker placeholder='Chọn ngày sinh' format={'DD/MM/YYYY'} />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={8}>
        <BaseForm.Item
          name='gioi_tinh'
          label='Giới tính'
          rules={[{ required: true, message: 'Giới tính không được bỏ trống' }]}
        >
          <BaseSelect options={gioiTinhSelect} placeholder='Chọn giới tính' />
        </BaseForm.Item>
      </BaseCol>
      {!isEditing && <BaseCol span={8}></BaseCol>}
      <BaseCol span={8}>
        <SelectFormApi
          path={`${API_URL.TINH}${API_URL.OPTIONS}`}
          name='tinh_id'
          label='Tỉnh'
          placeholder='Chọn tỉnh'
          rules={[{ required: true, message: `Tỉnh không được bỏ trống` }]}
          onChange={onChangeTinh}
        />
      </BaseCol>
      <BaseCol span={8}>
        <SelectFormApi
          path={`${API_URL.XA}${API_URL.OPTIONS}`}
          name='xa_id'
          label='Xã'
          placeholder='Chọn xã'
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
          <BaseInput.TextArea size='middle' placeholder='Nhập số nhà, đường' />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol xs={24} md={12} hidden>
        <BaseForm.Item name='trang_thai' initialValue={1}>
          <BaseInput disabled size='middle' />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormNguoiDung;
