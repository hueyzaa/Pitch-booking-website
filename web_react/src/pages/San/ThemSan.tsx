import React, { useState } from 'react';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { postData } from '@app/api/postData.api';
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

  const onCreate = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Append text fields
      if (values.ten_san) formData.append('ten_san', values.ten_san);
      if (values.id_loai_san) formData.append('id_loai_san', values.id_loai_san);
      if (values.dia_chi) formData.append('dia_chi', values.dia_chi);
      if (values.tinh_id) formData.append('tinh_id', values.tinh_id);
      if (values.xa_id) formData.append('xa_id', values.xa_id);
      if (values.mo_ta) formData.append('mo_ta', values.mo_ta);
      if (values.tien_ich && Array.isArray(values.tien_ich)) {
        values.tien_ich.forEach((item: string) => formData.append('tien_ich', item));
      }

      // Append ảnh chính (file)
      if (values.anh_chinh) {
        const fileList = Array.isArray(values.anh_chinh) ? values.anh_chinh : [values.anh_chinh];
        if (fileList[0]?.originFileObj) {
          formData.append('anh_chinh', fileList[0].originFileObj);
        }
      }

      // Append ảnh chi tiết (files)
      if (values.anh_chi_tiet && Array.isArray(values.anh_chi_tiet)) {
        for (const item of values.anh_chi_tiet) {
          if (item?.originFileObj) {
            formData.append('anh_chi_tiet', item.originFileObj);
          }
        }
      }

      const handleSuccess = () => {
        navigate('/san');
      };

      await postData(path, formData, handleSuccess);
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
