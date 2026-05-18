import { useAppSelector } from '@app/hooks/reduxHooks';
import { Navigate } from 'react-router-dom';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useTranslation } from 'react-i18next';
import { passwordPattern } from '@app/constants/patterns';
import { useFirstLogin } from './useFirstLogin';
import * as S from './FirstLoginForm.styles';

/**
 * FirstLoginForm component
 * Handles password change on first login
 * Requires user to change password before accessing the system
 */
const FirstLoginForm = () => {
  const user = useAppSelector((state) => state.user.user);
  const { t } = useTranslation();
  const { handleSubmit, isLoading } = useFirstLogin();

  // Redirect to home if user doesn't need to change password
  if (!user?.need_change_password) {
    return <Navigate to='/' replace />;
  }

  return (
    <S.Container>
      <S.FormWrapper>
        <BaseForm layout='vertical' onFinish={handleSubmit}>
          <S.FormTitle>{t('newPassword.title')}</S.FormTitle>
          <S.Description>Thay đổi nhập mật khẩu mới cho lần đầu đăng nhập</S.Description>

          <S.FormItem
            name='mat_khau_moi'
            label={t('common.password')}
            rules={[
              { required: true, message: t('common.requiredField') },
              {
                pattern: passwordPattern,
                message: t('profile.nav.securitySettings.notValidPassword')
              }
            ]}
          >
            <S.FormInputPassword size='middle' placeholder={t('common.password')} />
          </S.FormItem>

          <S.FormItem
            label={t('common.confirmPassword')}
            name='mat_khau_moi_xac_nhan'
            dependencies={['mat_khau_moi']}
            rules={[
              { required: true, message: t('common.requiredField') },
              {
                pattern: passwordPattern,
                message: t('profile.nav.securitySettings.notValidPassword')
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('mat_khau_moi') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('common.confirmPasswordError')));
                }
              })
            ]}
            hasFeedback
          >
            <S.FormInputPassword placeholder={t('common.confirmPassword')} />
          </S.FormItem>

          <BaseForm.Item>
            <S.SubmitButton type='primary' htmlType='submit' loading={isLoading}>
              {t('common.login')}
            </S.SubmitButton>
          </BaseForm.Item>
        </BaseForm>
      </S.FormWrapper>
    </S.Container>
  );
};

export default FirstLoginForm;
