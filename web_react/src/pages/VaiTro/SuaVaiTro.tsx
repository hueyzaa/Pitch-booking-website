import { EditOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Roles } from '@app/interfaces/interfaces';
import { appActions } from '@app/store/slices/appSlice';
import { mergeArrays } from '@app/utils/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormVaiTro from './FormVaiTro';
import { getDsVaiTroMacDinh } from './getDsVaiTroMacDinh';

const SuaVaiTro = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vaiTroMacDinh, setVaiTroMacDinh] = useState<Roles[]>([]);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.phan-quyen').toLowerCase()}`;

  const showModal = async () => {
    const vaiTroMacDinh = await getDsVaiTroMacDinh();
    const data = await getDataById(id, path);
    const resultArray: any = mergeArrays(vaiTroMacDinh, data?.phan_quyen);
    setVaiTroMacDinh(resultArray);

    const values: Record<string, boolean> = {};
    resultArray.forEach((item: Roles) => {
      let allChecked = true;
      Object.entries(item.actions).forEach(([key, val]) => {
        values[`${item.name}_${key}`] = val as boolean;
        if (!val) allChecked = false;
      });
      values[`checkall_${item.name}`] = allChecked;
    });
    form.setFieldsValue(values);
    form.setFieldsValue(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const keysToFilter = ['_index', '_create', '_show', '_edit', '_delete', '_export', '_changePassword'];
  const onUpdate = async (values: any) => {
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
    await patchData(path, id, values, closeModel);
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
        width={1024}
        footer={[
          <BaseButton
            key='submit'
            size='small'
            form={`formSuaVaiTro-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaVaiTro-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormVaiTro form={form} isEditing vaiTroMacDinh={vaiTroMacDinh} setVaiTroMacDinh={setVaiTroMacDinh} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaVaiTro;
