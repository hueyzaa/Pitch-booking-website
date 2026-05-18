import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import React from 'react';
import { UpdatePasswordForm } from './passwordForm/PasswordForm/UpdatePasswordForm';

export const UpdatePassSetting: React.FC = () => (
  <BaseCard style={{ borderRadius: '20px' }}>
    <BaseRow gutter={[30, 0]}>
      <BaseCol span={24}>
        <UpdatePasswordForm />
      </BaseCol>
    </BaseRow>
  </BaseCard>
);
