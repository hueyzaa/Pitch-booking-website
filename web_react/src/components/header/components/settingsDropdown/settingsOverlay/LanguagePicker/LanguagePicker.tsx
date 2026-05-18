import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { useLanguage } from '@app/hooks/useLanguage';
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReactCountryFlag from 'react-country-flag';
import { RadioBtn } from '../SettingsOverlay/SettingsOverlay.styles';

export const LanguagePicker: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <BaseRadio.Group defaultValue={language} onChange={(e) => setLanguage(e.target.value)}>
      <BaseSpace direction='vertical'>
        <RadioBtn value='en'>
          <BaseSpace align='center'>
            English
            <ReactCountryFlag svg countryCode='GB' />
          </BaseSpace>
        </RadioBtn>
        <RadioBtn value='vi'>
          <BaseSpace align='center'>
            Vietnamese
            <ReactCountryFlag svg countryCode='VN' />
          </BaseSpace>
        </RadioBtn>
      </BaseSpace>
    </BaseRadio.Group>
  );
};
