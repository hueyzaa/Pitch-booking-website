import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/common/forms/AuthForm';
import { useResponsive } from '@app/hooks/useResponsive';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as S from '../../LoginForm.styles';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginTypeThree = ({
  handleSubmit,
  initValues,
  isLoading,
  captchaRef,
  requireRecaptcha
}: {
  handleSubmit: (values: any) => void;
  initValues?: any;
  isLoading: boolean;
  captchaRef: any;
  requireRecaptcha: boolean;
}) => {
  const { t } = useTranslation();

  const { useMediaQuery } = useResponsive();

  const mobileTablet = useMediaQuery({ query: `(max-width: 1023.98px)` });

  return (
    <Auth.FormWrapper>
      <BaseRow>
        {mobileTablet && (
          <BaseCol style={{ textAlign: 'center' }} span={24}>
            <BaseTypography.Title level={4}>{import.meta.env.VITE_WEB_NAME.toUpperCase()}</BaseTypography.Title>
          </BaseCol>
        )}
        <BaseCol span={24}>
          <BaseForm layout='vertical' onFinish={handleSubmit} initialValues={initValues}>
            <Auth.FormItem
              name='tai_khoan'
              label={t('common.username')}
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <Auth.FormInput
                prefix={<UserOutlined className='site-form-item-icon' />}
                size='middle'
                placeholder={t('common.username')}
              />
            </Auth.FormItem>
            <Auth.FormItem
              label={t('common.password')}
              name='mat_khau'
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <Auth.FormInputPassword
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder={t('common.password')}
              />
            </Auth.FormItem>
            {requireRecaptcha && (
              <Auth.FormItem>
                <ReCAPTCHA sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY || ''} ref={captchaRef} />
              </Auth.FormItem>
            )}
            <Auth.ActionsWrapper>
              <BaseForm.Item name='rememberMe' valuePropName='checked'>
                <Auth.FormCheckbox>
                  <S.RememberMeText>{t('login.rememberMe')}</S.RememberMeText>
                </Auth.FormCheckbox>
              </BaseForm.Item>
            </Auth.ActionsWrapper>
            <BaseForm.Item noStyle>
              <Auth.SubmitButton type='primary' htmlType='submit' loading={isLoading}>
                {t('common.login')}
              </Auth.SubmitButton>
            </BaseForm.Item>
            <BaseForm.Item style={{ textAlign: 'center' }}>
              <Link to='/auth/forgot-password'>
                <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
              </Link>
            </BaseForm.Item>
          </BaseForm>
        </BaseCol>
      </BaseRow>
    </Auth.FormWrapper>
  );
};

export default LoginTypeThree;
