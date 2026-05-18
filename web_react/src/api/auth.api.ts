import { IApiSuccess, LoginFormData } from '@app/interfaces/interfaces';
import { persistDeviceId, readDeviceId } from '@app/services/localStorage.service';
import { v4 as uuidv4 } from 'uuid';
import { apiInstance } from './core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import checkError from '@app/utils/error';
import { processError } from '@app/utils/utils';

export const Login = async (values: LoginFormData, reCapchaValue?: string) => {
  if (!readDeviceId()) {
    persistDeviceId(uuidv4());
  }
  try {
    const resp: IApiSuccess = await apiInstance.post(API_URL.LOGIN, values, {
      headers: {
        re_capcha_token: reCapchaValue
      }
    });
    if (resp.code === 200) {
      return resp.data;
    } else {
      // Kiểm tra nếu server yêu cầu reCAPTCHA

      if (resp.message && (resp.message.includes('reCAPTCHA') || resp.message.toLowerCase().includes('capcha'))) {
        return { requireRecaptcha: true };
      }
      processError(resp, () => {
        notificationController.error({
          message: checkError(resp.message)
        });
      });
    }
  } catch (error: any) {
    // Kiểm tra nếu server yêu cầu reCAPTCHA (HttpCoreException trả HTTP 500)
    const errorMessage = error?.response?.data?.message || error?.message || '';
    if (errorMessage.includes('reCAPTCHA')) {
      return { requireRecaptcha: true };
    }
    notificationController.error({
      message: errorMessage
    });
  }
};

export const ChangePassword = async (values: any) => {
  try {
    const resp: IApiSuccess = await apiInstance.patch(API_URL.CHANGE_PASS, values);
    if (resp.code === 200) {
      notificationController.success({
        message: resp.data
      });
      return resp;
    } else {
      processError(resp, () => {
        notificationController.error({
          message: checkError(resp.message)
        });
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};

export const VerifyOtp = async (values: any) => {
  try {
    const resp: IApiSuccess = await apiInstance.post(API_URL.VERIFY_OTP, values);
    if (resp.code === 200) {
      return resp.data;
    } else {
      processError(resp, () => {
        notificationController.error({
          message: checkError(resp.message)
        });
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};

export const GenerateOtp = async (values: any) => {
  try {
    const resp: IApiSuccess = await apiInstance.post(API_URL.GENERATE_OTP, values);
    if (resp.code === 200) {
      return resp.data;
    } else {
      processError(resp, () => {
        notificationController.error({
          message: checkError(resp.message)
        });
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};
