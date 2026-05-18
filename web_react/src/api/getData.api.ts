import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from './core.api';
import checkError from '@app/utils/error';

export const getDataById = async (id: number | undefined, path: string) => {
  try {
    if (id === undefined) {
      return;
    }
    const resp: IApiSuccess = await apiInstance.get(`${path}/${id}`);
    if (resp.code === 200) {
      return resp.data;
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};

export const getDataSelect = async (path: string, params = {}) => {
  try {
    const respSelect: IApiSuccess = await apiInstance.get(path, { params });
    if (respSelect.code === 200) {
      if (respSelect.data.collection) {
        return respSelect.data.collection;
      } else {
        return respSelect.data;
      }
    } else {
      notificationController.error({
        message: respSelect.message
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};

export const getListData = async (path: string, params = {}) => {
  try {
    const resp: IApiSuccess = await apiInstance.get(path, { params });
    if (resp.code === 200) {
      if (resp.data?.collection) {
        return { data: resp.data.collection, total: resp.data.total };
      } else {
        return resp.data;
      }
    } else {
      notificationController.error({
        message: checkError(resp.message)
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};
