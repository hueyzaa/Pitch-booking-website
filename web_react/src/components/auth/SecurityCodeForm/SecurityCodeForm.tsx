import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/common/forms/AuthForm';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SecurityCodeFormProps {
  onBack?: () => void;
  onFinish?: () => void;
}

export const SecurityCodeForm: React.FC<SecurityCodeFormProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <BaseRow justify='start'>
      <BaseCol>
        <Auth.FormWrapper style={{ marginLeft: 0 }}>
          <BaseForm layout='vertical' requiredMark='optional'>
            <Auth.BackWrapper onClick={onBack || navigateBack}>
              <Auth.BackIcon />
              {t('common.back')}
            </Auth.BackWrapper>
            <BaseTypography.Title level={4}>Vui lòng kiểm tra hòm thư Email của bạn</BaseTypography.Title>
          </BaseForm>
        </Auth.FormWrapper>
      </BaseCol>
    </BaseRow>
  );
};
