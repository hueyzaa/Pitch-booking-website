import { GenerateOtp, VerifyOtp } from '@app/api/auth.api';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { deleteRequireOtp, readRequireOtp } from '@app/services/localStorage.service';
import { doLogin } from '@app/store/slices/authSlice';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as S from './VerifyOtp.styles';

const VerifyOtpForm = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [resendTimer, setResendTimer] = useState(60);
  const url = window.location.href;
  // Parse các tham số từ URL
  const parsed = queryString.parseUrl(url);
  const email = parsed.query.email;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const resp = await VerifyOtp({ email, otp: values.otp });
      if (resp?.isVerified === true) {
        notificationController.success({ message: 'Xác thực OTP thành công' });
        dispatch(doLogin(resp));
        deleteRequireOtp();
        navigate('/');
      }
    } catch (error: any) {
      notificationController.error({
        message: error.message || 'Xác thực OTP thất bại'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const resp = await GenerateOtp({ email }); // Gọi API gửi lại OTP
      if (resp) {
        notificationController.success({
          message: 'Mã OTP đã được gửi lại, vui lòng kiểm tra email.'
        });
      }
      setResendTimer(60); // Reset đếm ngược
    } catch (error: any) {
      notificationController.error({
        message: error.message || 'Gửi lại OTP thất bại'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!readRequireOtp()) {
    return <Navigate to='/' replace />;
  }
  return (
    <S.Container>
      <S.FormWrapper>
        <BaseRow>
          <BaseCol span={24}>
            <BaseForm layout='vertical' onFinish={onSubmit}>
              <S.FormTitle>Xác thực OTP</S.FormTitle>
              <S.Description style={{ textAlign: 'center' }}>
                Vui lòng nhập OTP đã được gửi đến email của bạn
              </S.Description>
              <S.FormItem name='otp' label='OTP' rules={[{ required: true, message: 'OTP là bắt buộc' }]}>
                <S.FormInput size='middle' placeholder='Nhập OTP' />
              </S.FormItem>
              <BaseForm.Item>
                <S.SubmitButton type='primary' htmlType='submit' loading={isLoading}>
                  Xác thực
                </S.SubmitButton>
              </BaseForm.Item>
              <S.ResendWrapper>
                <S.ResendButton type='button' onClick={handleResendOtp} disabled={resendTimer > 0 || isLoading}>
                  {resendTimer > 0 ? `Gửi lại mã sau ${resendTimer}s` : 'Gửi lại mã OTP'}
                </S.ResendButton>
              </S.ResendWrapper>
            </BaseForm>
          </BaseCol>
        </BaseRow>
      </S.FormWrapper>
    </S.Container>
  );
};

export default VerifyOtpForm;
