import { TwitterOutlined } from '@ant-design/icons';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ClipboardInput } from '@app/components/common/inputs/ClipboardInput/ClipboardInput';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SocialLinksItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item label={t('profile.nav.personalInfo.socialLinks')}>
      <BaseRow gutter={[20, 0]}>
        <BaseCol xs={24} md={12}>
          <BaseButtonsForm.Item shouldUpdate>
            {({ getFieldValue }) => {
              const twitter = getFieldValue('twitter');

              return (
                <div>
                  <BaseButtonsForm.Item name='twitter'>
                    <ClipboardInput valueToCopy={twitter} addonBefore={<TwitterOutlined rev={undefined} />} />
                  </BaseButtonsForm.Item>
                </div>
              );
            }}
          </BaseButtonsForm.Item>
        </BaseCol>
      </BaseRow>
    </BaseButtonsForm.Item>
  );
};
