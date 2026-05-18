import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from './core.api';
import checkError from '@app/utils/error';
import { processError } from '@app/utils/utils';

export const postData = async (path: string, data: any, closeModal?: () => void, message?: string) => {
  try {
    const respSelect: IApiSuccess = await apiInstance.post(path, data);
    if (respSelect.code === 200) {
      if (message) {
        notificationController.success({
          message: message
        });
      } else {
        notificationController.success({
          message: respSelect.data?.message || 'Tạo thành công'
        });
      }
      if (closeModal) closeModal();
      return respSelect.data;
    } else {
      processError(respSelect, () => {
        notificationController.error({
          message: checkError(respSelect.message)
        });
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};

export const addManyUsersToRole = async (path: string, payload: { vai_tro_id: number; user_ids: number[] }) => {
  try {
    const resp: IApiSuccess = await apiInstance.post(`${path}/add-many-to-role`, payload);
    if (resp.code === 200) {
      notificationController.success({ message: 'Cập nhật thành công' });
    } else {
      notificationController.error({ message: checkError(resp.message) });
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};
