import React, { useEffect } from 'react';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import { apiInstance } from '@app/api/core.api';
import { apiURL } from '@app/configs/configs';
import { CauHinhTrangData } from '../types';

interface HeaderTabProps {
  configs: CauHinhTrangData[];
  onUpdate: (values: { key: string; value: string }[]) => Promise<void>;
  loading: boolean;
}

export const HeaderTab: React.FC<HeaderTabProps> = ({ configs, onUpdate, loading }) => {
  const [form] = BaseForm.useForm();
  useEffect(() => {
    if (!configs) return;
    const configMap: Record<string, string> = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    form.setFieldsValue({
      HEADER_TITLE: configMap['HEADER_TITLE'] || '',
      HEADER_LOGO: transformToFileList(configMap['HEADER_LOGO'])
    });
  }, [configs, form]);
  const transformToFileList = (path?: string) => {
    if (!path) return [];
    return [{ uid: '-1', name: 'logo.png', status: 'done', url: path.startsWith('http') ? path : `${apiURL}/${path}` }];
  };
  const onFinish = async (values: any) => {
    let logoPath = '';
    if (values.HEADER_LOGO && values.HEADER_LOGO.length > 0) {
      const item = values.HEADER_LOGO[0];
      if (item.originFileObj) {
        const formData = new FormData();
        formData.append('file', item.originFileObj);
        const res = await apiInstance.post('upload', formData);
        logoPath = res.data.path;
      } else {
        logoPath = item.url?.replace(`${apiURL}/`, '') || '';
      }
    }
    const payload = [
      { key: 'HEADER_TITLE', value: values.HEADER_TITLE },
      { key: 'HEADER_LOGO', value: logoPath }
    ];
    await onUpdate(payload);
  };
  return (
    <BaseForm form={form} layout='vertical' onFinish={onFinish}>
      <BaseForm.Item name='HEADER_LOGO' label='Logo Header'>
        <MainImageUpload
          title='Logo'
          showTitle={false}
          helperText='Kích thước 300x100'
          uploadText='Tải lên'
          altText='logo'
        />
      </BaseForm.Item>
      <BaseForm.Item name='HEADER_TITLE' label='Tiêu đề Website' rules={[{ required: true }]}>
        <BaseInput size='small' placeholder='Nhập tiêu đề' />
      </BaseForm.Item>
      <BaseButton type='primary' size='small' htmlType='submit' loading={loading} style={{ marginTop: '1rem' }}>
        Lưu thay đổi
      </BaseButton>
    </BaseForm>
  );
};
