import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/common/forms/AuthForm';
import { useForgotPassword } from './useForgotPassword';
import * as S from './ForgotPasswordForm.styles';

const initValues = {
  email: '',
  tai_khoan: ''
};

/**
 * ForgotPasswordForm component
 * Handles password reset request
 * Requires email and username for verification
 */
export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit, isLoading } = useForgotPassword();

  return (
    <Auth.FormWrapper>
      <BaseForm layout='vertical' onFinish={handleSubmit} requiredMark='optional' initialValues={initValues}>
        <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon />
          {t('common.back')}
        </Auth.BackWrapper>

        <Auth.FormTitle>{t('common.resetPassword')}</Auth.FormTitle>
        <S.Description>{t('forgotPassword.description')}</S.Description>

        <Auth.FormItem
          name='email'
          label={t('common.email')}
          rules={[
            { required: true, message: t('common.emailError') },
            { type: 'email', message: t('common.notValidEmail') }
          ]}
        >
          <Auth.FormInput size='middle' placeholder={t('common.email')} />
        </Auth.FormItem>

        <Auth.FormItem
          name='tai_khoan'
          label={t('common.username')}
          rules={[{ required: true, message: t('common.usernameError') }]}
        >
          <Auth.FormInput size='middle' placeholder={t('common.username')} />
        </Auth.FormItem>

        <BaseForm.Item noStyle>
          <S.SubmitButton type='primary' htmlType='submit' loading={isLoading}>
            {t('forgotPassword.sendInstructions')}
          </S.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
