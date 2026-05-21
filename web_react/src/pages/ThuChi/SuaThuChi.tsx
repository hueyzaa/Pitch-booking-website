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
import FormThuChi from './FormThuChi';
import moment from 'moment';

const SuaThuChi = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.thu-chi').toLowerCase()}`;

  const showModal = async () => {
    const data = await getDataById(id, path);
    if (data) {
      if (data.ngay_giao_dich) {
        data.ngay_giao_dich = moment(data.ngay_giao_dich);
      }
      form.setFieldsValue(data);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    const payload = {
      ...values,
      ngay_giao_dich: values.ngay_giao_dich ? values.ngay_giao_dich.format('YYYY-MM-DD') : undefined,
    };
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    patchData(path, id, payload, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type="text" size="small" title={title} icon={<EditOutlined />} />
      <BaseModal
        title={title.toUpperCase()}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        footer={[
          <BaseButton
            key='submit'
            size='small'
            form={`formSuaThuChi-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaThuChi-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormThuChi isEditing/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaThuChi;
