import React, { useState, useEffect } from 'react';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
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
import { Loading } from '@app/components/common/Loading/Loading';

const SuaSan = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const [form] = BaseForm.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const path = API_URL.SAN;
  const title = `Sửa ${t('common.san').toLowerCase()}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsFetching(true);
        const data = await getDataById(numericId, path);
        if (data) {
          // Normalize anh_chi_tiet
          let anhChiTiet: string[] = [];
          if (data.anh_chi_tiet) {
            if (Array.isArray(data.anh_chi_tiet)) {
              anhChiTiet = data.anh_chi_tiet.filter(Boolean);
            } else if (typeof data.anh_chi_tiet === 'string') {
              anhChiTiet = data.anh_chi_tiet
                .split(',')
                .map((s: string) => s.trim())
                .filter(Boolean);
            }
          }

          // Normalize tien_ich
          let tienIch: string[] = [];
          if (data.tien_ich) {
            if (Array.isArray(data.tien_ich)) {
              tienIch = data.tien_ich.filter(Boolean);
            } else if (typeof data.tien_ich === 'string') {
              tienIch = data.tien_ich
                .split(',')
                .map((s: string) => s.trim())
                .filter(Boolean);
            }
          }

          form.setFieldsValue({
            ...data,
            anh_chinh: data.anh_chinh || undefined,
            anh_chi_tiet: anhChiTiet,
            tien_ich: tienIch
          });
        }
      } catch (error) {
        console.error('Error fetching pitch data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (numericId) {
      loadData();
    }
  }, [numericId, path, form]);


  const onUpdate = async (values: any) => {
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

      // Append ảnh chính
      if (values.anh_chinh) {
        const fileList = Array.isArray(values.anh_chinh) ? values.anh_chinh : [values.anh_chinh];
        const item = fileList[0];
        if (item?.originFileObj) {
          // File mới - gửi file
          formData.append('anh_chinh', item.originFileObj);
        } else if (typeof item === 'string') {
          // Ảnh cũ (Base64 hoặc path) - giữ nguyên
          formData.append('anh_chinh', item);
        } else if (item?.url) {
          formData.append('anh_chinh', item.url);
        }
      }

      // Append ảnh chi tiết
      if (values.anh_chi_tiet && Array.isArray(values.anh_chi_tiet)) {
        const existingBase64: string[] = [];
        for (const item of values.anh_chi_tiet) {
          if (item?.originFileObj) {
            // File mới
            formData.append('anh_chi_tiet', item.originFileObj);
          } else if (typeof item === 'string') {
            // Ảnh cũ (Base64)
            existingBase64.push(item);
          }
        }
        // Gửi ảnh cũ dạng JSON string qua field text
        if (existingBase64.length > 0) {
          formData.append('anh_chi_tiet', JSON.stringify(existingBase64));
        }
      }

      const handleSuccess = () => {
        navigate('/san');
      };

      await patchData(path, numericId, formData, handleSuccess);
    } catch (error) {
      console.error('Error updating pitch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

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
            <BaseForm id='formSuaSan' form={form} layout='vertical' onFinish={onUpdate}>
              <FormSan isEditing={true} form={form} />

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

export default SuaSan;
