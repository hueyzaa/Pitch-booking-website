import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import fileDownload from 'js-file-download';
import moment from 'moment';
import { apiInstance } from './core.api';
import { RcFile } from 'antd/lib/upload';

export const UploadFile = async (path: string, value: any) => {
  try {
    const data: IApiSuccess = await apiInstance.post(path + '/import-excel', value, { responseType: 'blob' });
    if (data) {
      notificationController.success({
        message: 'Thành công'
      });
      return data;
    }
  } catch (error: any) {
    fileDownload(error.response.data, `file-bao-loi-${moment().format('MMYYHHmmss').padStart(2, '0')}.xlsx`);
  }
};

export const uploadFileAnt = async (file: string | RcFile | Blob, onSuccess: any, onError: any, onProgress: any) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiInstance.post('upload', formData, {
      onUploadProgress: (event) => {
        if (event.total !== undefined) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress({ percent });
        }
      }
    });
    onSuccess(response.data);
    return response.data;
  } catch (error: any) {
    onError(error);
    notificationController.error({
      message: error.message
    });
  }
};
