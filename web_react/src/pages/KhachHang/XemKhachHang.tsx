import { EyeOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormKhachHang from './FormKhachHang';
import moment from 'moment';

const XemKhachHang = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const title = `Chi tiết ${t('common.khach-hang').toLowerCase()}`;

  const showModal = async () => {
    const data = await getDataById(id, path);
    
    // Split ho_va_ten if ho or ten are missing in database record
    if (data.ho_va_ten && (!data.ho || !data.ten)) {
      const parts = data.ho_va_ten.trim().split(/\s+/);
      if (parts.length > 1) {
        data.ho = parts.slice(0, -1).join(' ');
        data.ten = parts[parts.length - 1];
      } else {
        data.ho = '';
        data.ten = data.ho_va_ten;
      }
    }

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

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<EyeOutlined />} />
      <BaseModal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        centered
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>
        ]}
      >
        <BaseForm id={`formXemKhachHang-${id}`} form={form} layout='vertical'>
          <FormKhachHang form={form} disabled isEditing />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default XemKhachHang;
