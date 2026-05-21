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
import FormKhachHang from './FormKhachHang';
import moment from 'moment';

const SuaKhachHang = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.khach-hang').toLowerCase()}`

  const showModal = async () => {
    const data = await getDataById(id, path);
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (/ngay_|_ngay/.test(key) || /ngay/.test(key) || /thoi_gian|_thoi/.test(key)) {
          data[key] = moment(data[key]);
        }
      }
    });
    form.setFieldsValue(data);
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
      ngay_sinh: values.ngay_sinh ? moment(values.ngay_sinh).format('YYYY-MM-DD') : null
    };
    patchData(path, id, payload, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type="text" size="small" title={title} icon={<EditOutlined />} />
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
            form={`formSuaKhachHang-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaKhachHang-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormKhachHang isEditing/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaKhachHang;
