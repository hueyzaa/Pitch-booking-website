import { apiInstance } from '@app/api/core.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { gioiTinhSelect } from '@app/configs/select-configs';
import { phonePattern } from '@app/constants/patterns';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { persistUser } from '@app/services/localStorage.service';
import { createFilterQuery } from '@app/utils/utils';
import { RangePickerProps } from 'antd/lib/date-picker';
import Base from 'antd/lib/typography/Base';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PersonalInfo: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [tinhId, setTinhId] = useState<null | number>(null);

  const onChangeTinh = (value: number) => {
    setTinhId(value);
    form.setFieldValue('xa_id', null);
  };

  const [form] = BaseButtonsForm.useForm();

  const getInfoUser = async () => {
    const result: any = await apiInstance.get('profile');
    if (result.data) {
      Object.keys(result.data).forEach((key) => {
        if (result.data[key]) {
          if (/ngay_|_ngay/.test(key) || /ngay_/.test(key) || /thoi_gian|_thoi/.test(key)) {
            result.data[key] = moment(result.data[key]);
          }
        }
      });
      form.setFieldsValue(result.data);
      setTinhId(result.data.tinh_id);
    } else {
      form.setFieldsValue(result.data);
    }
  };
  useEffect(() => {
    if (user) {
      getInfoUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, user]);

  const [isFieldsChanged, setFieldsChanged] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          if (/ngay_|_ngay/.test(key) || /ngay/.test(key) || /thoi_gian|_thoi/.test(key)) {
            values[key] = moment(values[key]).format('YYYY-MM-DD');
          }
        }
      });
      if (user) {
        const result = await patchData(API_URL.PROFILE, user.id, values, () => null);
        persistUser(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <BaseCard style={{ borderRadius: '20px' }}>
      <BaseButtonsForm
        form={form}
        loading={isLoading}
        isFieldsChanged={isFieldsChanged}
        setFieldsChanged={setFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        footer={
          <BaseRow gutter={[10, 10]} wrap={false}>
            <BaseCol>
              <BaseButton type='primary' loading={isLoading} htmlType='submit'>
                {t('common.update')}
              </BaseButton>
            </BaseCol>
            <BaseCol>
              <BaseButton type='ghost' onClick={getInfoUser}>
                {t('common.cancel')}
              </BaseButton>
            </BaseCol>
          </BaseRow>
        }
        onFinish={onFinish}
      >
        <BaseRow gutter={[10, 10]}>
          <BaseCol span={24}>
            <BaseButtonsForm.Item>
              <BaseButtonsForm.Title>{t('profile.nav.personalInfo.title')}</BaseButtonsForm.Title>
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12} hidden>
            <BaseButtonsForm.Item name='trang_thai' initialValue={1}>
              <BaseInput disabled size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12} hidden>
            <BaseButtonsForm.Item name='ma_vai_tro'>
              <BaseInput disabled size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>
          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item name='ho' label='Họ' rules={[{ required: true, message: `Họ không được bỏ trống` }]}>
              <BaseInput size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>
          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item
              name='ten'
              label='Tên'
              rules={[{ required: true, message: `Tên không được bỏ trống` }]}
            >
              <BaseInput size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item
              name='gioi_tinh'
              label='Giới tính'
              rules={[{ required: true, message: `Giới tính không được bỏ trống` }]}
            >
              <BaseSelect options={gioiTinhSelect} placeholder='Chọn giới tính' size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item
              name='ngay_sinh'
              label={t('profile.nav.personalInfo.ngay-sinh')}
              rules={[{ required: true, message: `${t('profile.nav.personalInfo.ngay-sinh')} không được bỏ trống` }]}
            >
              <BaseDatePicker
                disabledDate={disabledDate}
                format={'DD/MM/YYYY'}
                size='middle'
                placeholder='Chọn ngày sinh'
                showToday={false}
              />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item
              name='email'
              label={t('common.email')}
              rules={[
                { required: true, message: t('common.requiredField') },
                {
                  type: 'email',
                  message: t('common.notValidEmail')
                }
              ]}
            >
              <BaseInput size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol xs={24} md={12}>
            <BaseButtonsForm.Item
              name='so_dien_thoai'
              $successText={t('profile.nav.personalInfo.verified')}
              label={t('common.phone')}
              rules={[
                { required: true, message: t('common.requiredField') },
                { pattern: phonePattern, message: t('common.notValidPhone') }
              ]}
            >
              <BaseInput size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>

          <BaseCol span={8}>
            <SelectFormApi
              path={`${API_URL.TINH}${API_URL.OPTIONS}`}
              name='tinh_id'
              label='Tỉnh'
              rules={[{ required: true, message: `Tỉnh không được bỏ trống` }]}
              size='middle'
              onChange={onChangeTinh}
            />
          </BaseCol>
          <BaseCol span={8}>
            <SelectFormApi
              path={`${API_URL.XA}${API_URL.OPTIONS}`}
              name='xa_id'
              label='Xã'
              rules={[{ required: true, message: `Xã không được bỏ trống` }]}
              size='middle'
              filter={tinhId && createFilterQuery(0, 'province_code', 'equal', tinhId)}
            />
          </BaseCol>

          <BaseCol span={24}>
            <BaseButtonsForm.Item
              name='dia_chi'
              label={t('common.address')}
              rules={[{ required: true, message: `${t('common.address')} không được bỏ trống` }]}
            >
              <BaseInput.TextArea size='middle' />
            </BaseButtonsForm.Item>
          </BaseCol>
        </BaseRow>
        <br />
      </BaseButtonsForm>
    </BaseCard>
  );
};
