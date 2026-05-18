import * as S from './BaseUpload.styles';
import React from 'react';
import { UploadProps } from 'antd';

export const BaseUpload: React.FC<UploadProps> = ({ className, children, ...props }) => {
  return (
    <S.Upload className={className} {...props}>
      {children}
    </S.Upload>
  );
};

export type { UploadProps as BaseUploadProps } from 'antd';
