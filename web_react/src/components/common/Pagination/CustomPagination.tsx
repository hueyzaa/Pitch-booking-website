import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { FONT_SIZE } from '@app/styles/themes/constants';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<Props> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  return (
    <PaginationStyles
      total={totalItems}
      pageSize={itemsPerPage}
      current={currentPage}
      onChange={onPageChange}
      showSizeChanger={false}
      style={{ textAlign: 'center' }}
    />
  );
};

export const PaginationStyles = styled(Pagination)`
  margin: 8px 0;
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
  }
  & .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:focus-visible .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    background-color: #919eab;
  }
`;

export default CustomPagination;
