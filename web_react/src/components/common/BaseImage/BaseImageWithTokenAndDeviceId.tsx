import { useSelector } from 'react-redux';
import { BaseImage, BaseImageProps } from './BaseImage';
import { RootState } from '@app/store/store';
import { readDeviceId } from '@app/services/localStorage.service';
import { generateHashStringAndParamsString } from '@app/utils/utils';
import { useEffect } from 'react';
import { useState } from 'react';

export { Image as BaseImage } from 'antd';
export type { ImageProps as BaseImageProps } from 'antd';

interface BaseImageWithTokenAndDeviceIdProps extends BaseImageProps {
  apiURL: string;
}
const BaseImageWithTokenAndDeviceId = ({ apiURL, src, alt, ...props }: BaseImageWithTokenAndDeviceIdProps) => {
  console.log('src', src);
  
  return (
    <BaseImage
      src={`${apiURL}/${src}?${generateHashStringAndParamsString({ originalUrl: src || '' })}`}
      alt={`${apiURL}/${src}?${generateHashStringAndParamsString({ originalUrl: src || '' })}`}
      {...props}
    />
  );
};

export default BaseImageWithTokenAndDeviceId;
