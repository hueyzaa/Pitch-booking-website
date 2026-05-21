import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import FormBangGia from './FormBangGia';
import { useTranslation } from 'react-i18next';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

const ThemBangGia = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.bang-gia').toLowerCase()}`;

  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    postData(path, values, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type="primary" size="small" title={title} icon={<PlusOutlined />}>
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
            form='formThemBangGia'
            type='primary'
            size='small'
            htmlType='submit'
            loading={isLoading}
          >
            Hoàn thành
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemBangGia' form={form} layout='vertical' onFinish={onCreate}>
          <FormBangGia isEditing={false}/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemBangGia;
