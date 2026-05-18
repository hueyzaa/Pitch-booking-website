import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/common/forms/AuthForm';
import { useResetPasswordParams } from './useResetPasswordParams';
import { useNewPassword } from './useNewPassword';
import * as S from './NewPasswordForm.styles';

/**
 * NewPasswordForm component
 * Handles password reset with token from email
 * Validates new password and confirmation match
 */
export const NewPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get token and email from URL
  const { token, email } = useResetPasswordParams();

  // Use new password hook
  const { handleSubmit, isLoading } = useNewPassword(email, token);

  return (
    <Auth.FormWrapper>
      <BaseForm layout='vertical' onFinish={handleSubmit}>
        <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon rev={''} />
          {t('common.back')}
        </Auth.BackWrapper>

        <Auth.FormTitle>{t('newPassword.title')}</Auth.FormTitle>
        <S.Description style={{ textAlign: 'center' }}>{t('newPassword.description')}</S.Description>

        <Auth.FormItem
          name='password'
          label={t('common.password')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>

        <Auth.FormItem
          name='confirmPassword'
          label={t('common.confirmPassword')}
          dependencies={['password']}
          rules={[
            { required: true, message: t('common.requiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('common.confirmPasswordError')));
              }
            })
          ]}
          hasFeedback
        >
          <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
        </Auth.FormItem>

        <BaseForm.Item noStyle>
          <S.SubmitButton type='primary' htmlType='submit' loading={isLoading}>
            {t('common.update')}
          </S.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
