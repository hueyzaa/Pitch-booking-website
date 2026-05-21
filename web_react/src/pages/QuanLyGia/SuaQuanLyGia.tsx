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
import FormQuanLyGia from './FormQuanLyGia';
import moment from 'moment';

const SuaQuanLyGia = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.quan-ly-gia').toLowerCase()}`

  const showModal = async () => {
    const data = await getDataById(id, path);
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (/ngay_bat_dau|ngay_ket_thuc/.test(key)) {
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
      ngay_bat_dau: values.ngay_bat_dau ? moment(values.ngay_bat_dau).format('YYYY-MM-DD') : null,
      ngay_ket_thuc: values.ngay_ket_thuc ? moment(values.ngay_ket_thuc).format('YYYY-MM-DD') : null,
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
            form={`formSuaQuanLyGia-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaQuanLyGia-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormQuanLyGia isEditing/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaQuanLyGia;
