import { apiInstance } from './core.api';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { notificationController } from '@app/controllers/notificationController';

export const updateQuanLiDuAnOrder = async (id: number, order: number) => {
  try {
    const resp: IApiSuccess = await apiInstance.patch(`/quan-li-du-an/update-order/${id}`, { order });
    if (resp.code === 200) {
      notificationController.success({ message: 'Cập nhật thứ tự thành công' });
      return resp.data;
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};
