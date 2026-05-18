import React from 'react';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import { apiURL } from '@app/configs/configs';
import { CauHinhTrangData } from '../types';

interface FooterTabProps {
  configs: CauHinhTrangData[];
  onUpdate: (values: { key: string; value: string }[]) => Promise<void>;
  loading: boolean;
}

export const FooterTab: React.FC<FooterTabProps> = ({ configs, onUpdate, loading }) => {
  const [form] = BaseForm.useForm();
  React.useEffect(() => {
    if (!configs) return;
    const configMap: Record<string, string> = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    form.setFieldsValue({
      FOOTER_COPYRIGHT: configMap['FOOTER_COPYRIGHT'] || '',
      FOOTER_DESCRIPTION: configMap['FOOTER_DESCRIPTION'] || '',
      FOOTER_LOGO: [{ uid: '-1', name: 'logo.png', status: 'done', url: `${apiURL}/${configMap['FOOTER_LOGO']}` }]
    });
  }, [configs, form]);
  const onFinish = async (values: any) => {
    const payload = [{ key: 'FOOTER_COPYRIGHT', value: values.FOOTER_COPYRIGHT || '' }];
    await onUpdate(payload);
  };
  return (
    <BaseForm form={form} layout='vertical' onFinish={onFinish}>
      <BaseForm.Item name='FOOTER_LOGO' label='Logo Footer'>
        <MainImageUpload
          title='Logo'
          showTitle={false}
          helperText='Kích thước 300x100'
          uploadText='Tải lên'
          altText='logo'
        />
      </BaseForm.Item>
      <BaseForm.Item name='FOOTER_COPYRIGHT' label='Bản quyền'>
        <BaseInput size='small' placeholder='© 2026 Portfolio' />
      </BaseForm.Item>
      <BaseButton type='primary' size='small' htmlType='submit' loading={loading} style={{ marginTop: '1rem' }}>
        Lưu thay đổi
      </BaseButton>
    </BaseForm>
  );
};
