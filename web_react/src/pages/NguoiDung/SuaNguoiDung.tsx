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
import FormNguoiDung from './FormNguoiDung';
import moment from 'moment';

const SuaNguoiDung = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.tai-khoan').toLowerCase()}`;

  const showModal = async () => {
    setIsModalOpen(true);
    const data = await getDataById(id, path);
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (/ngay_|_ngay/.test(key) || /ngay/.test(key) || /thoi_gian|_thoi/.test(key)) {
          data[key] = moment(data[key]);
        }
      }
    });
    form.setFieldsValue(data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    patchData(path, id, { ...values, ngay_sinh: moment(values.ngay_sinh).format('YYYY-MM-DD') }, closeModel);
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
        size='large'
        footer={[
          <BaseButton
            key='submit'
            size='small'
            form={`formSuaNguoiDung-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaNguoiDung-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormNguoiDung isEditing form={form} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaNguoiDung;
