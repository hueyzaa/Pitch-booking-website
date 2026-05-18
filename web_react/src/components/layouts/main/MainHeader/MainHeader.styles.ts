import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';
import { LAYOUT, media } from '@app/styles/themes/constants';
import styled, { css } from 'styled-components';

interface Header {
  $isTwoColumnsLayoutHeader: boolean;
}

export const Header = styled(BaseLayout.Header)<Header>`
  line-height: 1.5;

  @media only screen and (${media.md}) {
    padding: 0;
    height: ${LAYOUT.desktop.headerHeight};
    box-shadow: var(--box-shadow-hover);
    background-color: #ffffff;
  }

  @media only screen and (${media.md}) {
    ${(props) =>
      props?.$isTwoColumnsLayoutHeader &&
      css`
        padding: 0;
      `}
  }
`;
