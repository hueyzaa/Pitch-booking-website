import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { apiURL, webName } from '@app/configs/configs';
import React from 'react';
import * as S from './AuthLayout.styles';
import { useSystemConfig } from '@app/hooks/useSystemConfig';

/**
 * AuthLayout component
 * Provides layout wrapper for authentication pages
 * Supports multiple UI variants based on VITE_TYPE_LOGIN environment variable
 */
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const typeUI = import.meta.env.VITE_TYPE_LOGIN;
  const { config } = useSystemConfig();

  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        {typeUI === '3' ? (
          <BaseRow style={{ height: '100%' }}>
            <BaseCol span={12}>
              <div className='header-login'>
                <BaseTypography.Title className='header-login__title'>
                  {config?.name ? config?.name : webName}
                </BaseTypography.Title>
                <div className='header-login__logo'>
                  <BaseImage
                    src={config?.logoUrl ? apiURL + '/' + config?.logoUrl : '/react-icon.svg'}
                    alt='logo'
                    preview={false}
                  />
                </div>
              </div>
            </BaseCol>
            <BaseCol span={12}>
              <S.LoginWrapper>{children}</S.LoginWrapper>
            </BaseCol>
          </BaseRow>
        ) : (
          <>
            <S.LoginWrapper>{children}</S.LoginWrapper>
          </>
        )}
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default AuthLayout;
