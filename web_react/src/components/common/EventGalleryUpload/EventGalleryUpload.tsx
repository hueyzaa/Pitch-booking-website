import React from 'react';
import { PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { apiURL } from '@app/configs/configs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const IMAGE_TILE_MIN_SIZE = 148;

const GalleryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${IMAGE_TILE_MIN_SIZE}px, 1fr));
  gap: 12px;
  align-items: stretch;
`;

const StyledUploadSquare = styled(BaseUpload)`
  width: 100%;
  aspect-ratio: 1 / 1;

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
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid var(--border-base-color);
  background-color: var(--background-color);
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

const tileActionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: 4,
  width: 24,
  height: 24,
  padding: 0
};

const orderLabelStyle: React.CSSProperties = {
  position: 'absolute',
  left: 8,
  top: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  color: '#fff',
  fontSize: 10,
  padding: '2px 8px',
  borderRadius: 999,
  fontWeight: 600,
  zIndex: 2
};

const normalizeImageUrl = (baseAppUrl: string, url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.includes('http')) return url;
  const cleanPath = url.replace(/\\/g, '/').replace(/^\//, '');
  return `${baseAppUrl}/${cleanPath}`;
};

const isBlobLike = (file: unknown): file is Blob => {
  if (!file) return false;
  if (typeof File !== 'undefined' && file instanceof File) return true;
  if (typeof Blob !== 'undefined' && file instanceof Blob) return true;
  return false;
};

export interface EventGalleryUploadProps {
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
  uploadText?: string;
  disabled?: boolean;
}

export const EventGalleryUpload: React.FC<EventGalleryUploadProps> = ({ value, onChange, uploadText, disabled }) => {
  const { t } = useTranslation();
  const resolvedUploadText = uploadText || 'Tải lên';

  const fileList = React.useMemo<UploadFile[]>(() => (Array.isArray(value) ? value : []), [value]);

  const resolvedFiles = React.useMemo(() => {
    return fileList.map((item: any, index) => {
      // Handle when item is a raw string (e.g. from raw API data)
      if (typeof item === 'string') {
        return {
          key: `gallery-str-${index}`,
          file: { uid: `gallery-str-${index}`, name: item.split('/').pop() || 'image.png', url: item } as any,
          url: normalizeImageUrl(apiURL, item)
        };
      }

      const file = item as UploadFile;
      const rawFile = file.originFileObj;

      if (isBlobLike(rawFile)) {
        const objectUrl = URL.createObjectURL(rawFile);
        return {
          key: file.uid || `${file.name || 'gallery'}-${index}`,
          file,
          url: objectUrl,
          objectUrl
        };
      }

      if (file.url) {
        return {
          key: file.uid || `${file.name || 'gallery'}-${index}`,
          file,
          url: normalizeImageUrl(apiURL, file.url)
        };
      }

      if (file.thumbUrl) {
        return {
          key: file.uid || `${file.name || 'gallery'}-${index}`,
          file,
          url: file.thumbUrl
        };
      }

      return {
        key: file.uid || `${file.name || 'gallery'}-${index}`,
        file
      };
    });
  }, [fileList]);

  React.useEffect(() => {
    return () => {
      resolvedFiles.forEach((item) => {
        if (item.objectUrl) {
          URL.revokeObjectURL(item.objectUrl);
        }
      });
    };
  }, [resolvedFiles]);

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: nextFileList }) => {
    const normalizedFileList = nextFileList.map((file) => ({
      ...file,
      status: file.status || 'done'
    }));

    onChange?.(normalizedFileList);
  };

  const handleRemove = (uid: string) => (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onChange?.(fileList.filter((file) => file.uid !== uid));
  };

  const handleMove =
    (index: number, direction: 'up' | 'down') => (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= fileList.length) return;

      const nextList = [...fileList];
      [nextList[index], nextList[targetIndex]] = [nextList[targetIndex], nextList[index]];
      onChange?.(nextList);
    };

  return (
    <GalleryWrap>
      {resolvedFiles.map((item, index) => (
        <PreviewCard key={item.key}>
          <PreviewFillLayer>
            <Image
              src={item.url || ''}
              alt='gallery-image'
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              preview={{ mask: t('common.view') }}
            />
          </PreviewFillLayer>

          {!disabled && (
            <BaseButton
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
              onClick={handleRemove(item.file.uid)}
              size='small'
              style={deleteButtonStyle}
            />
          )}

          <div style={orderLabelStyle}>Thứ tự: {index + 1}</div>

          {!disabled && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '8px 8px 10px',
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0) 100%)',
                zIndex: 2
              }}
            >
              <div style={{ display: 'flex', gap: 4 }}>
                <BaseButton
                  size='small'
                  icon={<ArrowUpOutlined style={{ fontSize: 12 }} />}
                  onClick={handleMove(index, 'up')}
                  disabled={index === 0}
                  style={tileActionStyle}
                />
                <BaseButton
                  size='small'
                  icon={<ArrowDownOutlined style={{ fontSize: 12 }} />}
                  onClick={handleMove(index, 'down')}
                  disabled={index === resolvedFiles.length - 1}
                  style={tileActionStyle}
                />
              </div>
            </div>
          )}
        </PreviewCard>
      ))}

      {!disabled && (
        <StyledUploadSquare
          listType='picture-card'
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUploadChange}
          accept='image/*'
          multiple
          fileList={fileList}
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
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-main-color)', fontWeight: 600 }}>
              {resolvedUploadText}
            </div>
          </div>
        </StyledUploadSquare>
      )}
    </GalleryWrap>
  );
};

export default EventGalleryUpload;
