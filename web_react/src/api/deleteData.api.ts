import { notificationController } from '@app/controllers/notificationController';
import { apiInstance } from './core.api';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { processError } from '@app/utils/utils';
import checkError from '@app/utils/error';

export const deleteData = async (path: string, id: number) => {
  try {
    const respUsers: IApiSuccess = await apiInstance.delete(`${path}/${id}`);
    if (respUsers.code === 200) {
      notificationController.success({
        message: respUsers.data?.message || 'Xoá thành công'
      });
    } else {
      processError(respUsers, () => {
        notificationController.error({
          message: checkError(respUsers.message)
        });
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message
    });
  }
};

export const deleteManyData = async (path: string, payload: { vai_tro_id: number; user_ids: number[] }) => {
  try {
    const resp: IApiSuccess = await apiInstance.post(`${path}/delete-many`, payload);
    if (resp.code === 200) {
      notificationController.success({ message: resp.data?.message || 'Xoá thành công' });
    } else {
      notificationController.error({ message: checkError(resp.message) });
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};

export const bulkDeleteData = async (path: string, ids: number[], fieldName: string = 'loai_san_pham_ids') => {
  try {
    const resp: IApiSuccess = await apiInstance.post(`${path}/bulk-delete`, { [fieldName]: ids });
    if (resp.code === 200) {
      notificationController.success({ message: resp.data?.message || 'Xoá thành công' });
      return true;
    } else {
      notificationController.error({ message: checkError(resp.message) });
      return false;
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
    return false;
  }
};

export const patchData = async (path: string, payload: any) => {
  try {
    const resp: IApiSuccess = await apiInstance.patch(path, payload);
    return resp;
  } catch (error: any) {
    notificationController.error({ message: error.message });
    throw error;
  }
};

export const postData = async (path: string, payload: any) => {
  try {
    const resp: IApiSuccess = await apiInstance.post(path, payload);
    return resp;
  } catch (error: any) {
    notificationController.error({ message: error.message });
    throw error;
  }
};
