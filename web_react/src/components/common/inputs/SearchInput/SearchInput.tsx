import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { BaseSpin } from '../../BaseSpin/BaseSpin';
import { BaseInputProps, BaseInputRef } from '../BaseInput/BaseInput';
import * as S from './SearchInput.styles';

interface SearchInputProps extends BaseInputProps {
  loading?: boolean;
  filter?: React.ReactNode;
  onSearch?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  enterButton?: React.ReactNode;
  inputPrefixCls?: string;
}

export const SearchInput = React.forwardRef<BaseInputRef, SearchInputProps>(({ loading, filter, ...props }, ref) => {
  return (
    <S.SearchInput
      ref={ref}
      prefix={<SearchOutlined rev={undefined} />}
      {...(filter && {
        suffix: (
          <S.Space align='center'>
            {loading && <BaseSpin size='small' />}
            {filter}
          </S.Space>
        )
      })}
      {...props}
    />
  );
});
