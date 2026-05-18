import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { ConvertTextRoles } from '@app/utils/converts';

export const getDsVaiTroMacDinh = async () => {
  try {
    const resp: IApiSuccess = await apiInstance.post(`${API_URL.VAI_TRO_MAC_DINH}`, null);
    if (resp.code === 200) {
      resp.data.map((item: any) => {
        return (item.nameVi = ConvertTextRoles(item.name));
      });
      const data = resp.data.sort((a: any, b: any) => a.nameVi.localeCompare(b.nameVi));
      data.forEach((obj: any) => {
        delete obj.nameVi;
      });
      return data;
    }
  } catch (error: any) {
    notificationController.error({
      message: error.message
    });
  }
};
