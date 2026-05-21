import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import FormTrangThaiSan from './FormTrangThaiSan';
import { useTranslation } from 'react-i18next';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

const ThemTrangThaiSan = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.trang-thai-san').toLowerCase()}`;

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

    const payload = {
      ...values,
      ngay: values.ngay ? values.ngay.format('YYYY-MM-DD') : undefined,
      gio_bat_dau: values.gio_bat_dau ? values.gio_bat_dau.format('HH:mm') : undefined,
      gio_ket_thuc: values.gio_ket_thuc ? values.gio_ket_thuc.format('HH:mm') : undefined,
    };

    postData(path, payload, closeModel);
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
            form='formThemTrangThaiSan'
            type='primary'
            size='small'
            htmlType='submit'
            loading={isLoading}
          >
            Hoàn thành
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemTrangThaiSan' form={form} layout='vertical' onFinish={onCreate}>
          <FormTrangThaiSan isEditing={false}/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemTrangThaiSan;
