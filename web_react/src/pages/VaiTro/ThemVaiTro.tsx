import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Roles } from '@app/interfaces/interfaces';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormVaiTro from './FormVaiTro';
import { getDsVaiTroMacDinh } from './getDsVaiTroMacDinh';

const ThemVaiTro = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vaiTroMacDinh, setVaiTroMacDinh] = useState<Roles[]>([]);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.phan-quyen').toLowerCase()}`;

  const showModal = async () => {
    setIsModalOpen(true);
    const vaiTroMacDinh = await getDsVaiTroMacDinh();
    setVaiTroMacDinh(vaiTroMacDinh);

    // Tạo object values cho form
    const values: Record<string, boolean> = {};
    vaiTroMacDinh.forEach((item: Roles) => {
      let allChecked = true;
      Object.entries(item.actions).forEach(([key, val]) => {
        values[`${item.name}_${key}`] = val as boolean;
        if (!val) allChecked = false;
      });
      values[`checkall_${item.name}`] = allChecked;
    });
    form.setFieldsValue(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const keysToFilter = ['_index', '_create', '_show', '_edit', '_delete', '_export', '_changePassword'];
  const onCreate = async (values: any) => {
    const phanQuyen: Roles[] = Object.entries(values)
      .filter(([key]) => {
        for (let i = 0; i < keysToFilter.length; i++) {
          if (key.includes(keysToFilter[i])) {
            return true;
          }
        }
        return false;
      })
      .reduce((acc: any, [key, value]) => {
        const [name, action] = key.split('_');
        const permissionIndex = acc.findIndex((permission: Roles) => permission.name === name);
        if (permissionIndex === -1) {
          acc.push({ name, actions: { [action]: value } });
        } else {
          acc[permissionIndex].actions[action] = value;
        }
        return acc;
      }, []);
    values = { ten_vai_tro: values.ten_vai_tro, ma_vai_tro: values.ma_vai_tro, phan_quyen: phanQuyen };
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    await postData(path, values, closeModel);
    setIsLoading(false);
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
        centered
        width={1024}
        footer={[
          <BaseButton
            key='submit'
            form='formThemVaiTro'
            type='primary'
            size='small'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemVaiTro' form={form} layout='vertical' onFinish={onCreate}>
          <FormVaiTro form={form} vaiTroMacDinh={vaiTroMacDinh} setVaiTroMacDinh={setVaiTroMacDinh} isEditing={false} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemVaiTro;
