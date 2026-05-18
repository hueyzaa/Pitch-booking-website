import ExcelIcon from '@app/assets/icons/excel.svg';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { getToken } from '@app/utils/redux.utils';
import { Image } from 'antd';
import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment';

const ExportExcel = ({ param = '', path, page }: { param: string | null; path: string; page: string }) => {
  const queryString =
    param === null
      ? ''
      : Object.keys(param)
          .map((key: any) => `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
          .join('&');
  const onExport = async () => {
    const token = getToken();
    axios({
      url: `${API_URL}${path}/export?${queryString}`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then((res: any) => {
        if (res.status === 200) {
          fileDownload(res.data, `${page}-${moment(new Date()).format('DD/MM/YYYY')}.xlsx`);
        } else {
          notificationController.error({
            message: res.message
          });
        }
      })
      .catch((err: any) => {
        notificationController.error({
          message: err.message
        });
      });
  };

  return (
    <BaseButton
      onClick={onExport}
      type='primary'
      size='small'
      title='xuất dữ liệu'
      icon={<Image preview={false} src={ExcelIcon} alt='xuất file excel' width={24} height={24} />}
    />
  );
};

export default ExportExcel;
