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
import { apiInstance } from '@app/api/core.api';

const SuaKhachHang = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.khach-hang').toLowerCase()}`

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

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };

    let avatarPath = values.anh_dai_dien;
    if (Array.isArray(avatarPath) && avatarPath.length > 0 && avatarPath[0].originFileObj) {
      try {
        const formData = new FormData();
        formData.append('file', avatarPath[0].originFileObj);
        const uploadRes = await apiInstance.post('upload', formData);
        avatarPath = uploadRes.data?.data?.file_path || uploadRes.data?.file_path || uploadRes.data?.path || null;
      } catch (err) {
        console.error('Avatar upload failed', err);
        avatarPath = null;
      }
    } else if (Array.isArray(avatarPath) && avatarPath.length === 0) {
      avatarPath = null;
    } else if (Array.isArray(avatarPath) && avatarPath.length > 0 && avatarPath[0].url) {
      // Retain existing
      avatarPath = avatarPath[0].url;
    } else if (typeof avatarPath === 'string') {
      // Keep it
    }

    const payload = {
      ...values,
      anh_dai_dien: avatarPath,
      ho_va_ten: `${values.ho || ''} ${values.ten || ''}`.trim(),
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
        size="large"
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
          <FormKhachHang form={form} isEditing/>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaKhachHang;
