import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import FormCongNghe from './FormCongNghe';
import { useTranslation } from 'react-i18next';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { getListData } from '@app/api/getData.api';
import { handleDuplicateOrder } from '@app/utils/utils';

import { CongNgheFormValues } from './types';
import { STATUS_ACTIVE, STATUS_INACTIVE } from './constants';

const ThemCongNghe = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.cong-nghe').toLowerCase()}`;

  const showModal = async () => {
    try {
      const res = await getListData(path, { limit: 1000 });
      if (res?.data) {
        const orders = res.data.map((item: any) => item.thu_tu);
        setExistingOrders(orders);
        // Suggest next order
        const nextOrder = handleDuplicateOrder(0, orders);
        form.setFieldsValue({ thu_tu: nextOrder });
      }
    } catch (error) {
      console.error('Error fetching existing technology orders:', error);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: CongNgheFormValues) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    const payload = {
      ...values,
      trang_thai: values.trang_thai ? STATUS_ACTIVE : STATUS_INACTIVE
    };
    postData(path, payload, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type='primary' size='small' title={title} icon={<PlusOutlined />}>
        Thêm
      </BaseButton>
      <BaseModal
        title={
          <BaseTypography.Title style={{ textAlign: 'center' }} level={3}>
            {title.toUpperCase()}
          </BaseTypography.Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        footer={[
          <BaseButton
            key='submit'
            form='formThemCongNghe'
            type='primary'
            size='small'
            htmlType='submit'
            loading={isLoading}
          >
            Hoàn thành
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemCongNghe' form={form} layout='vertical' onFinish={onCreate}>
          <FormCongNghe existingOrders={existingOrders} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemCongNghe;
