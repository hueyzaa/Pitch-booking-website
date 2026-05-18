import React, { useEffect } from 'react';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import { apiInstance } from '@app/api/core.api';
import { apiURL } from '@app/configs/configs';
import { CauHinhTrangData } from '../types';
import { Col, Row } from 'antd';

interface HomeTabProps {
  configs: CauHinhTrangData[];
  onUpdate: (values: { key: string; value: string }[]) => Promise<void>;
  loading: boolean;
}

export const HomeTab: React.FC<HomeTabProps> = ({ configs, onUpdate, loading }) => {
  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (!configs) return;
    const configMap: Record<string, string> = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

    form.setFieldsValue({
      HOME_HERO_BADGE: configMap['HOME_HERO_BADGE'] || '',
      HOME_HERO_TITLE_MAIN: configMap['HOME_HERO_TITLE_MAIN'] || '',
      HOME_HERO_TITLE_ACCENT: configMap['HOME_HERO_TITLE_ACCENT'] || '',
      HOME_HERO_TITLE_SUFFIX: configMap['HOME_HERO_TITLE_SUFFIX'] || '',
      HOME_HERO_DESC: configMap['HOME_HERO_DESC'] || '',
      HOME_HERO_IMG: transformToFileList(configMap['HOME_HERO_IMG'])
    });
  }, [configs, form]);

  const transformToFileList = (path?: string) => {
    if (!path) return [];
    // If it's a relative path starting with src/ (like our default seed), we might need to handle it
    const url = path.startsWith('http') ? path : `${apiURL}/${path}`;
    return [{ uid: '-1', name: 'hero.png', status: 'done', url }];
  };

  const onFinish = async (values: any) => {
    let imgPath = '';
    if (values.HOME_HERO_IMG && values.HOME_HERO_IMG.length > 0) {
      const item = values.HOME_HERO_IMG[0];
      if (item.originFileObj) {
        const formData = new FormData();
        formData.append('file', item.originFileObj);
        const res = await apiInstance.post('upload', formData);
        imgPath = res.data.path;
      } else {
        imgPath = item.url?.replace(`${apiURL}/`, '') || '';
      }
    }

    const payload = [
      { key: 'HOME_HERO_BADGE', value: values.HOME_HERO_BADGE },
      { key: 'HOME_HERO_TITLE_MAIN', value: values.HOME_HERO_TITLE_MAIN },
      { key: 'HOME_HERO_TITLE_ACCENT', value: values.HOME_HERO_TITLE_ACCENT },
      { key: 'HOME_HERO_TITLE_SUFFIX', value: values.HOME_HERO_TITLE_SUFFIX },
      { key: 'HOME_HERO_DESC', value: values.HOME_HERO_DESC },
      { key: 'HOME_HERO_IMG', value: imgPath }
    ];

    await onUpdate(payload);
  };

  return (
    <BaseForm form={form} layout='vertical' onFinish={onFinish}>
      <Row gutter={[24, 0]}>
        <Col span={24}>
          <BaseForm.Item name='HOME_HERO_BADGE' label='Hero Badge (Text nhỏ phía trên)'>
            <BaseInput size='small' placeholder='Ví dụ: UI Designer' />
          </BaseForm.Item>
        </Col>

        <Col span={8}>
          <BaseForm.Item name='HOME_HERO_TITLE_MAIN' label='Tiêu đề chính (Dòng 1)' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='Ví dụ: NGUYÊN' />
          </BaseForm.Item>
        </Col>
        <Col span={8}>
          <BaseForm.Item
            name='HOME_HERO_TITLE_ACCENT'
            label='Tiêu đề nhấn mạnh (In nghiêng)'
            rules={[{ required: true }]}
          >
            <BaseInput size='small' placeholder='Ví dụ: Digital' />
          </BaseForm.Item>
        </Col>
        <Col span={8}>
          <BaseForm.Item name='HOME_HERO_TITLE_SUFFIX' label='Tiêu đề hậu tố (Dòng 3)' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='Ví dụ: EXPERIENCE' />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <BaseForm.Item name='HOME_HERO_DESC' label='Mô tả ngắn Hero' rules={[{ required: true }]}>
            <BaseInput.TextArea rows={4} placeholder='Nhập mô tả giới thiệu...' />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <BaseForm.Item name='HOME_HERO_IMG' label='Hình ảnh Hero (Visual)'>
            <MainImageUpload
              title='Hero Image'
              showTitle={false}
              helperText='Kích thước gợi ý: 1000x1000 (Tỉ lệ 1:1)'
              uploadText='Tải lên'
              altText='hero visual'
            />
          </BaseForm.Item>
        </Col>
      </Row>

      <BaseButton type='primary' size='small' htmlType='submit' loading={loading} style={{ marginTop: '1rem' }}>
        Lưu thay đổi trang chủ
      </BaseButton>
    </BaseForm>
  );
};
