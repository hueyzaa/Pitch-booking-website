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
import FormTrangThaiSan from './FormTrangThaiSan';
import moment from 'moment';

const SuaTrangThaiSan = ({ path, id, children }: { path: string; id: number; children?: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.trang-thai-san').toLowerCase()}`

  const showModal = async () => {
    const data = await getDataById(id, path);
    form.setFieldsValue({
      ...data,
      ngay: data.ngay ? moment(data.ngay) : undefined,
      gio_bat_dau: data.gio_bat_dau ? moment(data.gio_bat_dau, 'HH:mm:ss') : undefined,
      gio_ket_thuc: data.gio_ket_thuc ? moment(data.gio_ket_thuc, 'HH:mm:ss') : undefined,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onUpdate = async (values: any) => {
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

    patchData(path, id, payload, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      {children ? (
        <span onClick={showModal} style={{ cursor: 'pointer' }}>
          {children}
        </span>
      ) : (
        <BaseButton onClick={showModal} type="text" size="small" title={title} icon={<EditOutlined />} />
      )}
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
            form={`formSuaTrangThaiSan-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaTrangThaiSan-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormTrangThaiSan isEditing/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaTrangThaiSan;
