import React from 'react';
import { InputNumberProps as AntdInputNumberProps } from 'antd';
import * as S from './InputNumber.styles';

export interface InputNumberProps extends AntdInputNumberProps {
  block?: boolean;
  noArr?: boolean;
}

export const BaseInputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ children, block, noArr, ...props }, ref) => (
    <S.InputNumber ref={ref} $noArr={noArr} $block={block} {...props}>
      {children}
    </S.InputNumber>
  )
);
