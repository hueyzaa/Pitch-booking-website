import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/common/forms/AuthForm';
import { apiURL, webName } from '@app/configs/configs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as S from '../../LoginForm.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CauHinhHeThong {
  logoUrl: string;
  name: string;
}

const LoginTypeOne = ({
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
  const [config, setConfig] = useState<CauHinhHeThong | null>(null);
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);

  //Todo : Cập nhật favicon từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cauHinhHeThong');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch (error) {
        console.error('Invalid cauHinhHeThong in localStorage', error);
      }
    }
  }, [reload]);

  return (
    <Auth.FormWrapper>
      <div className='header-login__logo'>
        <BaseImage
          src={config?.logoUrl ? apiURL + '/' + config?.logoUrl : '/react-icon.svg'}
          alt='logo'
          preview={false}
        />
      </div>
      <BaseRow>
        <BaseCol span={24}>
          <div className='header-login'>
            <BaseTypography.Title className='header-login__title'>
              {config?.name ? config.name : webName}
            </BaseTypography.Title>
          </div>
        </BaseCol>
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
              <BaseForm.Item name='rememberMe' valuePropName='checked' initialValue={false}>
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

export default LoginTypeOne;

