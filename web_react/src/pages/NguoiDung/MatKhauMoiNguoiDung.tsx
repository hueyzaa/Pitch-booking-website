import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword.styles';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiLockPasswordLine } from 'react-icons/ri';

const MatKhauMoiNguoiDung = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.tai-khoan').toLowerCase()}`;

  const showModal = async () => {
    setIsModalOpen(true);
    const data = await getDataById(id, path);
    form.setFieldsValue(data.nguoiDung);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    const closeModel = () => {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
    };
    patchData('users/change-password', id, { ...values }, closeModel);
    setIsLoading(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<RiLockPasswordLine />} />
      <BaseModal open={isModalOpen} onCancel={handleCancel} maskClosable={false} size='small' centered footer={false}>
        <BaseForm id={`formSuaNguoiDung-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <BaseRow gutter={[10, 10]}>
            <BaseCol span={24}>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <BaseTypography.Title level={3}>Tạo mật khẩu mới</BaseTypography.Title>
                <BaseTypography.Text>Vui lòng nhập mật khẩu mới cho người dùng</BaseTypography.Text>
              </div>
            </BaseCol>
            <BaseCol span={24}>
              <BaseForm.Item
                name='mat_khau'
                label='Mật khẩu mới'
                rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}
              >
                <InputPassword placeholder='Nhập mật khẩu' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={24}>
              <BaseForm.Item
                name='xac_nhan_mat_khau'
                label='Xác nhận mật khẩu mới'
                dependencies={['mat_khau']}
                rules={[
                  { required: true, message: 'Xác nhận mật khẩu không được bỏ trống' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('mat_khau') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Hai mật khẩu không khớp'));
                    }
                  })
                ]}
              >
                <InputPassword placeholder='Nhập xác nhận mật khẩu' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={12}>
              <br />
              <BaseButton block type='ghost' onClick={handleCancel}>
                Huỷ
              </BaseButton>
            </BaseCol>
            <BaseCol span={12}>
              <br />
              <BaseForm.Item name=' '>
                <BaseButton block type='primary' htmlType='submit' loading={isLoading}>
                  Xác nhận
                </BaseButton>
              </BaseForm.Item>
            </BaseCol>
          </BaseRow>
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default MatKhauMoiNguoiDung;
