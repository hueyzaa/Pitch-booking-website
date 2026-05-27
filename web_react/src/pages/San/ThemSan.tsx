import React, { useState } from 'react';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { postData } from '@app/api/postData.api';
import { apiInstance } from '@app/api/core.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { API_URL } from '@app/configs/api-configs';
import FormSan from './FormSan';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const ThemSan = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = BaseForm.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const path = API_URL.SAN;
  const title = `Thêm ${t('common.san').toLowerCase()}`;

  const uploadImage = async (fileObj: any): Promise<string> => {
    if (typeof fileObj === 'string') {
      return fileObj;
    }
    const file = fileObj?.originFileObj || fileObj;
    if (!(file instanceof File || file instanceof Blob)) {
      return fileObj?.url || '';
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiInstance.post('upload', formData);
    return response.data?.path || '';
  };

  const onCreate = async (values: any) => {
    setIsLoading(true);
    try {
      // 1. Upload main image if exists
      let anhChinhPath = '';
      if (values.anh_chinh) {
        const fileList = Array.isArray(values.anh_chinh) ? values.anh_chinh : [values.anh_chinh];
        if (fileList.length > 0) {
          anhChinhPath = await uploadImage(fileList[0]);
        }
      }

      // 2. Upload detailed images if exist
      const anhChiTietPaths: string[] = [];
      if (values.anh_chi_tiet && Array.isArray(values.anh_chi_tiet)) {
        for (const item of values.anh_chi_tiet) {
          const path = await uploadImage(item);
          if (path) {
            anhChiTietPaths.push(path);
          }
        }
      }

      // 3. Prepare payload and submit
      const payload = {
        ...values,
        anh_chinh: anhChinhPath || null,
        anh_chi_tiet: anhChiTietPaths.length > 0 ? anhChiTietPaths : null
      };

      const handleSuccess = () => {
        navigate('/san');
      };

      await postData(path, payload, handleSuccess);
    } catch (error) {
      console.error('Error creating pitch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BaseCard padding='2rem'>
        <BaseRow gutter={[0, 24]}>
          <BaseCol span={24}>
            <div
              onClick={() => navigate('/san')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'var(--primary-color)',
                fontWeight: 700,
                fontSize: '20px',
                transition: 'opacity 0.2s',
                marginBottom: '8px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <ArrowLeftOutlined style={{ marginRight: 12, fontSize: '18px' }} />
              <span>{title.toUpperCase()}</span>
            </div>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm id='formThemSan' form={form} layout='vertical' onFinish={onCreate}>
              <FormSan isEditing={false} form={form} />

              <BaseRow justify='end' style={{ marginTop: '2rem' }}>
                <BaseSpace size={12}>
                  <BaseButton onClick={() => navigate('/san')} disabled={isLoading}>
                    Hủy
                  </BaseButton>
                  <BaseButton type='primary' htmlType='submit' loading={isLoading} icon={<SaveOutlined />}>
                    Lưu
                  </BaseButton>
                </BaseSpace>
              </BaseRow>
            </BaseForm>
          </BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default ThemSan;
