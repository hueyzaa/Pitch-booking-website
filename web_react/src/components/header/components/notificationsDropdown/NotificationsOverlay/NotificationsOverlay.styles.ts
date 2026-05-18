import styled from 'styled-components';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { media } from '@app/styles/themes/constants';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

export const NoticesOverlayMenu = styled.div`
  max-width: 15rem;

  @media only screen and (${media.md}) {
    max-width: 25rem;
  }
`;

export const UnreadDot = styled.div`
  background: var(--primary-color);
  width: 8px;
  height: 8px;
  borderRadius: 50%;
  boxShadow: 0 0 8px var(--primary-color);
  display: inline-block;
`;

export const NotificationItem = styled.div<{ $isUnread: boolean }>`
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  background-color: ${(props) => (props.$isUnread ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent')};
  border: 1px solid transparent;

  &:hover {
    background-color: rgba(var(--primary-rgb), 0.08);
    border-color: var(--primary-color);
  }
`;

export const DateTimeText = styled.div`
  font-size: 11px;
  color: var(--disabled-color);
`;

export const SeeMoreBtn = styled(BaseButton)`
  color: var(--primary-color);
  font-weight: 500;
`;

export const SplitDivider = styled(BaseDivider)`
  margin: 0 0.5rem;
`;

export const LinkBtn = styled(BaseButton)`
  &.ant-btn {
    padding: 0;
    font-size: 0.875rem;
    height: unset;
    line-height: unset;
  }
`;

export const Btn = styled(BaseButton)`
  width: 100%;
`;

export const Text = styled(BaseTypography.Text)`
  display: block;
  text-align: center;
`;
