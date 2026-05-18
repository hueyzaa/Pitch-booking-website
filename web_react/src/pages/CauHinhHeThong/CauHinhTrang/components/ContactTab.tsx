import React, { useEffect } from 'react';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CauHinhTrangData } from '../types';

interface ContactTabProps {
  configs: CauHinhTrangData[];
  onUpdate: (values: { key: string; value: string }[]) => Promise<void>;
  loading: boolean;
}

export const ContactTab: React.FC<ContactTabProps> = ({ configs, onUpdate, loading }) => {
  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (!configs) return;
    const configMap: Record<string, string> = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    form.setFieldsValue({
      CONTACT_EMAIL: configMap['CONTACT_EMAIL'] || '',
      CONTACT_PHONE: configMap['CONTACT_PHONE'] || '',
      CONTACT_ADDRESS: configMap['CONTACT_ADDRESS'] || ''
    });
  }, [configs, form]);

  const onFinish = async (values: any) => {
    const payload = Object.entries(values).map(([key, value]) => ({ key, value: String(value) }));
    await onUpdate(payload);
  };

  return (
    <BaseForm form={form} layout='vertical' onFinish={onFinish}>
      <BaseForm.Item name='CONTACT_EMAIL' label='Email liên hệ'>
        <BaseInput size='small' placeholder='Nhập email' />
      </BaseForm.Item>
      <BaseForm.Item name='CONTACT_PHONE' label='Số điện thoại'>
        <BaseInput size='small' placeholder='Nhập số điện thoại' />
      </BaseForm.Item>
      <BaseForm.Item name='CONTACT_ADDRESS' label='Địa chỉ'>
        <BaseInput size='small' placeholder='Nhập địa chỉ' />
      </BaseForm.Item>
      <BaseButton type='primary' size='small' htmlType='submit' loading={loading} style={{ marginTop: '1rem' }}>
        Lưu thay đổi
      </BaseButton>
    </BaseForm>
  );
};
