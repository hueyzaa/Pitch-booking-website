import { IApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from './core.api';
import { notificationController } from '@app/controllers/notificationController';
import checkError from '@app/utils/error';
import { processError } from '@app/utils/utils';

export const patchData = async (
  path: string,
  id: number,
  data: any,
  closeModal: () => void,
  withId: boolean = true
) => {
  try {
    const resp: IApiSuccess = await apiInstance.patch(`${path}/${withId ? id : ''}`, data);
    if (resp.code === 200) {
      notificationController.success({
        message: resp.data?.message || 'Cập nhật thành công'
      });
      closeModal();
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

export const putData = async (path: string, id: number, data: any, closeModal: () => void) => {
  try {
    const resp: IApiSuccess = await apiInstance.put(`${path}/${id}`, data);
    if (resp.code === 200) {
      notificationController.success({
        message: resp.data?.message || 'Cập nhật thành công'
      });
      closeModal();
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
