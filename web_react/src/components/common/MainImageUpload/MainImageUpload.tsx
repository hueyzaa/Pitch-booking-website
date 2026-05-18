import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { apiURL } from '@app/configs/configs';
import { getToken } from '@app/utils/redux.utils';
import styled from 'styled-components';

const IMAGE_TILE_SIZE = 180;

const StyledUploadSquare = styled(BaseUpload)`
  width: ${IMAGE_TILE_SIZE}px;
  height: ${IMAGE_TILE_SIZE}px;

  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
    margin: 0;
    border-style: dashed;
    border-color: var(--border-base-color);
    background-color: var(--background-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-upload.ant-upload-select-picture-card > * {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PreviewCard = styled.div`
  position: relative;
  display: inline-block;
  width: ${IMAGE_TILE_SIZE}px;
  height: ${IMAGE_TILE_SIZE}px;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  overflow: hidden;
`;

const PreviewFillLayer = styled.div`
  position: absolute;
  inset: 0;

  .ant-image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .ant-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ant-image-mask {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
  }
`;

const deleteButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 8,
  width: 28,
  height: 28,
  padding: 0,
  borderRadius: 8,
  border: '1px solid var(--error-color)',
  backgroundColor: 'var(--background-color)',
  zIndex: 3,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const getImageUrl = (baseAppUrl: string, path: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');
  return `${baseAppUrl}/${cleanPath}`;
};

export interface MainImageUploadProps {
  id?: string;
  value?: string | any[];
  onChange?: (value: any) => void;
  title: string;
  showTitle?: boolean;
  helperText: string;
  helperHint?: string;
  uploadText: string;
  altText: string;
  aspectRatio?: number;
  previewWidth?: number;
  disabled?: boolean;
}

export const MainImageUpload: React.FC<MainImageUploadProps> = ({
  id,
  value,
  onChange,
  title,
  showTitle = true,
  helperText,
  helperHint,
  uploadText,
  altText,
  aspectRatio = 1,
  previewWidth = IMAGE_TILE_SIZE,
  disabled
}) => {
  const { t } = useTranslation();

  const resolvedImage = React.useMemo(() => {
    if (typeof value === 'string' && value.trim() !== '') {
      return { url: getImageUrl(apiURL, value), objectUrl: undefined as string | undefined };
    }

    if (Array.isArray(value) && value.length > 0) {
      const fileItem = value[0];
      const file = fileItem.originFileObj || fileItem;

      if (file instanceof File || file instanceof Blob) {
        const objectUrl = URL.createObjectURL(file as Blob);
        return { url: objectUrl, objectUrl };
      }

      if (fileItem.url) {
        return { url: fileItem.url, objectUrl: undefined as string | undefined };
      }
    }

    return { url: undefined as string | undefined, objectUrl: undefined as string | undefined };
  }, [value]);

  React.useEffect(() => {
    return () => {
      if (resolvedImage.objectUrl) {
        URL.revokeObjectURL(resolvedImage.objectUrl);
      }
    };
  }, [resolvedImage.objectUrl]);

  const currentImageUrl = resolvedImage.url;

  const handleUpload = (file: RcFile) => {
    const fileList = [
      {
        uid: file.uid || Date.now().toString(),
        name: file.name,
        status: 'done',
        originFileObj: file
      }
    ];

    onChange?.(fileList);
    return false;
  };

  const handleRemove = () => {
    onChange?.(undefined);
  };

  const displayHeight = previewWidth / aspectRatio;

  const uploadComponent = !disabled ? (
    <StyledUploadSquare
      listType='picture-card'
      showUploadList={false}
      beforeUpload={handleUpload}
      accept='image/*'
      style={{ width: previewWidth, height: displayHeight, margin: 0 }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <PlusOutlined style={{ fontSize: 20, color: 'var(--primary-color)' }} />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-main-color)', fontWeight: 600 }}>{uploadText}</div>
      </div>
    </StyledUploadSquare>
  ) : (
    <div
      style={{
        width: previewWidth,
        height: displayHeight,
        border: '1px dashed var(--border-base-color)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-light-color)'
      }}
    >
      {t('common.noImage')}
    </div>
  );

  return (
    <div id={id} style={{ width: '100%' }}>
      {showTitle && (
        <div style={{ marginBottom: 12, color: 'var(--primary-color)', fontSize: 13, fontWeight: 600 }}>{title}</div>
      )}

      {currentImageUrl ? (
        <PreviewCard style={{ width: previewWidth, height: displayHeight }}>
          <PreviewFillLayer>
            <Image
              src={currentImageUrl}
              alt={altText}
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              preview={{ mask: t('common.view') }}
            />
          </PreviewFillLayer>
          {!disabled && (
            <BaseButton
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
              onClick={handleRemove}
              size='small'
              style={deleteButtonStyle}
            />
          )}
        </PreviewCard>
      ) : (
        uploadComponent
      )}

      <div style={{ marginTop: 8, color: 'var(--text-light-color)', fontSize: 12 }}>
        <div>{helperText}</div>
        {Boolean(helperHint) && <div>{helperHint}</div>}
      </div>
    </div>
  );
};

export default MainImageUpload;
