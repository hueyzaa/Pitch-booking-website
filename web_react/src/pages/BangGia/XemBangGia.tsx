import { EyeOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormBangGia from './FormBangGia';

const XemBangGia = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const title = `Chi tiết ${t('common.bang-gia').toLowerCase()}`;

  const showModal = async () => {
    const data = await getDataById(id, path);
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
        centered
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>
        ]}
      >
        <BaseForm id={`formXemBangGia-${id}`} form={form} layout='vertical'>
          <FormBangGia disabled />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default XemBangGia;
