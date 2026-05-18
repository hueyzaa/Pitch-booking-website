import { EyeOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Roles } from '@app/interfaces/interfaces';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormVaiTro from './FormVaiTro';

const VaiTroChiTiet = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaiTroMacDinh, setVaiTroMacDinh] = useState<Roles[]>([]);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const title = `Chi tiết vai trò ${t('common.phan-quyen').toLowerCase()}`;

  const showModal = async () => {
    const roleData = await getDataById(id, path);
    const filteredPhanQuyen =
      roleData?.phan_quyen?.filter((item: Roles) => {
        return Object.values(item.actions).some((val) => val === true);
      }) || [];

    setVaiTroMacDinh(filteredPhanQuyen);
    const values: Record<string, boolean> = {};

    filteredPhanQuyen.forEach((item: Roles) => {
      let allChecked = true;
      Object.entries(item.actions).forEach(([key, val]) => {
        values[`${item.name}_${key}`] = val as boolean;
        if (!val) allChecked = false;
      });
      values[`checkall_${item.name}`] = allChecked;
    });

    values.ma_vai_tro = roleData.ma_vai_tro;
    values.ten_vai_tro = roleData.ten_vai_tro;
    form.setFieldsValue(values);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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
        width={1024}
        footer={[]}
      >
        <BaseForm id={`formChiTietVaiTro-${id}`} form={form} layout='vertical' onFinish={() => {}}>
          <FormVaiTro
            form={form}
            isEditing={false}
            isOnlyView={true}
            vaiTroMacDinh={vaiTroMacDinh}
            setVaiTroMacDinh={setVaiTroMacDinh}
          />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default VaiTroChiTiet;
