import { BasePagination } from '@app/components/common/BasePagination/BasePagination';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { FONT_SIZE } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const TableStyle = styled(BaseTable)`
  .ant-form-item-control-input {
    min-height: unset;
  }
  .ant-table-cell {
    padding: 8px;
  }
`;

export const PaginationStyle = styled(BasePagination)`
  margin: 8px 0;
  text-align: center;
  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 8px;
    font-size: ${FONT_SIZE.xxs};
    button {
      border-radius: 2px;
    }
  }
  & .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:focus-visible .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    background-color: #ccc;
  }
  & .ant-pagination-item-active {
    border-radius: 2px;
  }
  & .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 33px;
    border-radius: 2px;
  }
  & .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 32px;
  }
`;
