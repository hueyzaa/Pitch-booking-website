import { DeleteOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/core.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { notificationController } from '@app/controllers/notificationController';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { Popconfirm } from 'antd';
import React from 'react';

interface IProps {
  id: number;
  path: string;
  onShow: () => void;
  children?: any;
  title?: string;
}

const Delete: React.FC<IProps> = ({ id, onShow, path, children, title }) => {
  const onDelete = async () => {
    try {
      const respDelete: IApiSuccess = await apiInstance.delete(`${path}/${id}`);
      if (respDelete.code === 200) {
        notificationController.success({
          message: 'Xoá thành công'
        });
      } else {
        notificationController.error({
          message: respDelete.message
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
    }
    onShow();
  };
  return (
    <Popconfirm
      title={`Bạn có muốn xoá ${title ? title : ''} không?`}
      okText='Xoá'
      cancelText='Huỷ'
      onConfirm={onDelete}
    >
      {children ? (
        children
      ) : (
        <BaseButton
          size='small'
          type='text'
          icon={children ? '' : <DeleteOutlined rev={undefined} />}
          title='Xoá'
        ></BaseButton>
      )}
    </Popconfirm>
  );
};

export default Delete;
