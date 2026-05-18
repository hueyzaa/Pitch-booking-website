import { apiInstance } from '@app/api/core.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { appActions } from '@app/store/slices/appSlice';
import { Form } from 'antd';
import { FC } from 'react';

interface IProp {
  list: any;
  path: string;
}

const AssignOverlay: FC<IProp> = ({ list, path }) => {
  const dispatch = useAppDispatch();
  const onAssign = async (value: any) => {
    const data = {
      ...value,
      id: list
    };
    try {
      const respUsers: IApiSuccess = await apiInstance.post(`${path}/assign`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Phân công thành công'
        });
        dispatch(appActions.toggleReload('DANH_SACH'));
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
    }
  };

  return (
    <Form style={{ minWidth: '200px' }} onFinish={onAssign}>
      <SelectFormApi
        path={`${API_URL.NGUOI_DUNG}${API_URL.OPTIONS}`}
        name='employee_id'
        rules={[{ required: true, message: 'Vui lòng chọn nhân viên để phân công' }]}
        placeholder='Chọn người cần phân công'
      />
      <Form.Item>
        <BaseButton type='primary' htmlType='submit' size='small'>
          Phân công
        </BaseButton>
      </Form.Item>
    </Form>
  );
};

export default AssignOverlay;
