import React from 'react';
import { BaseSpin } from '@app/components/common/BaseSpin/BaseSpin';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * Full page loading overlay component
 * Used for lazy loading routes and async operations
 */
export const PageLoader: React.FC = () => {
  return (
    <div className='overlay'>
      <div className='overlay-content'>
        <BaseSpin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />} />
      </div>
    </div>
  );
};
