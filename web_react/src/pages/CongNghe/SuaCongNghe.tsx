import { EditOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormCongNghe from './FormCongNghe';

import { CongNgheEntity, CongNgheFormValues } from './types';
import { STATUS_ACTIVE, STATUS_INACTIVE } from './constants';

const SuaCongNghe = ({ path, id, existingOrders }: { path: string; id: number; existingOrders?: number[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.cong-nghe').toLowerCase()}`;

  const showModal = async () => {
    const data: CongNgheEntity = await getDataById(id, path);
    form.setFieldsValue({
      ...data,
      mau: data.mau || '#4285f4',
      mo_ta: data.mo_ta || '',
      trang_thai: data.trang_thai === STATUS_ACTIVE
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onUpdate = async (values: CongNgheFormValues) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    const payload = {
      ...values,
      trang_thai: values.trang_thai ? STATUS_ACTIVE : STATUS_INACTIVE
    };
    patchData(path, id, payload, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<EditOutlined />} />
      <BaseModal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        footer={[
          <BaseButton
            key='submit'
            size='small'
            form={`formSuaCongNghe-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaCongNghe-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormCongNghe existingOrders={existingOrders} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaCongNghe;
