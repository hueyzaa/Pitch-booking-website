import { apiInstance } from '@app/api/core.api';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { doLogout } from '@app/store/slices/authSlice';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './PasswordForm.styles';

export const PasswordForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = BaseButtonsForm.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const resp: IApiSuccess = await apiInstance.patch(`${API_URL.CHANGE_PASS}`, {
        is_first_change: 0,
        mat_khau_hien_tai: values.password,
        mat_khau_moi: values.newPassword,
        mat_khau_moi_xac_nhan: values.confirmPassword
      });
      if (resp.code === 200) {
        const result: IApiSuccess = await apiInstance.post(`${API_URL.LOGOUT}`);
        if (result.code === 200) {
          dispatch(doLogout());
        }
        notificationController.success({
          message: 'Đổi mật khẩu thành công'
        });
        form.resetFields();
      } else {
        notificationController.error({
          message: resp.message
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
    }
    setLoading(false);
  };

  return (
    <BaseButtonsForm
      name='newPassword'
      form={form}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      footer={
        <BaseRow gutter={[10, 10]}>
          <BaseCol>
            <S.Btn loading={isLoading} type='primary' htmlType='submit'>
              {t('common.save')}
            </S.Btn>
          </BaseCol>
          <BaseCol>
            <S.Btn type='ghost' onClick={() => form.resetFields()}>
              {t('common.cancel')}
            </S.Btn>
          </BaseCol>
        </BaseRow>
      }
      onFinish={onFinish}
    >
      <BaseRow gutter={[10, 10]}>
        <BaseCol span={24}>
          <BaseButtonsForm.Item>
            <BaseButtonsForm.Title>{t('profile.nav.securitySettings.changePassword')}</BaseButtonsForm.Title>
          </BaseButtonsForm.Item>
        </BaseCol>

        <BaseCol span={24}>
          <BaseButtonsForm.Item
            name='password'
            label={t('profile.nav.securitySettings.currentPassword')}
            rules={[
              {
                required: true,
                message: t('profile.nav.securitySettings.requiredPassword')
              }
            ]}
          >
            <InputPassword />
          </BaseButtonsForm.Item>
        </BaseCol>

        <BaseCol span={24}>
          <BaseButtonsForm.Item
            name='newPassword'
            label={t('profile.nav.securitySettings.newPassword')}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: t('profile.nav.securitySettings.requiredPassword')
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('profile.nav.securitySettings.samePassword')));
                }
              })
            ]}
          >
            <InputPassword />
          </BaseButtonsForm.Item>
        </BaseCol>

        <BaseCol span={24}>
          <BaseButtonsForm.Item
            name='confirmPassword'
            label={t('profile.nav.securitySettings.confirmPassword')}
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: t('profile.nav.securitySettings.requiredPassword')
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('profile.nav.securitySettings.dontMatchPassword')));
                }
              })
            ]}
          >
            <InputPassword />
          </BaseButtonsForm.Item>
        </BaseCol>
      </BaseRow>
    </BaseButtonsForm>
  );
};
