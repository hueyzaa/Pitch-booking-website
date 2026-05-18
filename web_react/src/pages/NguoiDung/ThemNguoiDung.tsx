import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormNguoiDung from './FormNguoiDung';
import moment from 'moment';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';

const ThemNguoiDung = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.tai-khoan').toLowerCase()}`;

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
    postData(path, { ...values, ngay_sinh: moment(values.ngay_sinh).format('YYYY-MM-DD') }, closeModel);
    setIsLoading(false);
  };

  const handleCreatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '#?!@$%^&*-';
    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

    let password = '';

    //Todo Đảm bảo mật khẩu có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số, và 1 ký tự đặc biệt
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    //Todo Thêm các ký tự ngẫu nhiên còn lại để đủ 8 ký tự
    while (password.length < 8) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    //Todo Trộn mật khẩu để đảm bảo sự phân phối ngẫu nhiên
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    form.setFieldValue('mat_khau', password);
    form.validateFields(['mat_khau']);
  };

  return (
    <>
      <BaseButton onClick={showModal} type='primary' size='small' title={title} icon={<PlusOutlined />}>
        Thêm
      </BaseButton>
      <BaseModal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size='large'
        centered
        footer={[
          <BaseRow justify='space-between' key='footer'>
            <BaseButton size='small' type='primary' onClick={handleCreatePassword}>
              Tạo nhanh mật khẩu
            </BaseButton>
            <BaseButton
              key='submit'
              form='formThemNguoiDung'
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
        <BaseForm id='formThemNguoiDung' form={form} layout='vertical' onFinish={onCreate}>
          <FormNguoiDung form={form} isEditing={false} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemNguoiDung;
