import styled from 'styled-components';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { BaseMenu } from '@app/components/common/BaseMenu/BaseMenu';

export const Menu = styled(BaseMenu)`
  background: transparent;
  border-right: 0;
  .ant-menu-item,
  .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-left > .ant-menu-item,
  .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-right > .ant-menu-item,
  .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical > .ant-menu-item,
  .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 32px;
    line-height: 32px;
    margin-bottom: 2px !important;
    margin-top: 2px;
  }

  a {
    width: 100%;
    display: block;
  }

  .ant-menu-item,
  .ant-menu-submenu,
  .ant-menu-submenu-title {
    font-size: ${FONT_SIZE.xs};
    font-weight: ${FONT_WEIGHT.medium};
    .ant-menu-sub.ant-menu-inline {
      margin: 2px 0;
      /* .ant-menu-item-selected {
        .ant-menu-submenu-expand-icon,
        .ant-menu-submenu-arrow,
        span[role='img'],
        .ant-menu-item-icon,
        a {
          color: var(--primary-color);
          fill: var(--primary-color);
        }
      } */
    }
  }

  .ant-menu-item-icon {
    width: 1.25rem;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow,
  span[role='img'],
  a,
  .ant-menu-item,
  .ant-menu-submenu {
    color: var(--text-sider-secondary-color);
    fill: var(--text-sider-secondary-color);
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a,
    .ant-menu-item-icon,
    .ant-menu-title-content {
      color: var(--text-sider-primary-color);
      fill: var(--text-sider-primary-color);
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      color: var(--text-sider-primary-color);
      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'] {
        color: var(--text-sider-primary-color);
        fill: var(--text-sider-primary-color);
      }
    }
  }

  .ant-menu-item-selected {
    background-color: transparent !important;
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    .ant-menu-item-icon,
    a {
      color: var(--text-sider-primary-color);
      fill: var(--text-sider-primary-color);
    }
  }
`;
