import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import FormKhachHang from './FormKhachHang';
import { useTranslation } from 'react-i18next';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import moment from 'moment';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';

const ThemKhachHang = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.khach-hang').toLowerCase()}`;

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
      ho_va_ten: `${values.ho || ''} ${values.ten || ''}`.trim(),
      ngay_sinh: values.ngay_sinh ? moment(values.ngay_sinh).format('YYYY-MM-DD') : null
    };
    postData(path, payload, closeModel);
    setIsLoading(false);
  };

  const handleCreatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '#?!@$%^&*-';
    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

    let password = '';

    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    while (password.length < 8) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    form.setFieldValue('mat_khau', password);
    form.validateFields(['mat_khau']);
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
        size="large"
        centered
        footer={[
          <BaseRow justify='space-between' key='footer'>
            <BaseButton size='small' type='primary' onClick={handleCreatePassword}>
              Tạo nhanh mật khẩu
            </BaseButton>
            <BaseButton
              key='submit'
              form='formThemKhachHang'
              size='small'
              type='primary'
              htmlType='submit'
              loading={isLoading}
            >
              Lưu
            </BaseButton>
          </BaseRow>
        ]}
      >
        <BaseForm id='formThemKhachHang' form={form} layout='vertical' onFinish={onCreate}>
          <FormKhachHang form={form} isEditing={false}/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemKhachHang;
