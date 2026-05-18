import { createGlobalStyle } from 'styled-components';
import { resetCss } from './resetCss';
import { BREAKPOINTS, FONT_SIZE, FONT_WEIGHT, media } from './themes/constants';
import {
  antOverrideCssVariables,
  commonThemeVariables,
  darkThemeVariables,
  lightThemeVariables
} from './themes/themeVariables';

export default createGlobalStyle`

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #d3ebff;
  }

  ${resetCss}

  [data-theme='light'],
  :root {
    ${lightThemeVariables}
  }

  [data-theme='dark'] {
    ${darkThemeVariables}
  }

  :root {
    ${commonThemeVariables};
    ${antOverrideCssVariables};
  }

  [data-no-transition] * {
    transition: none !important;
  }

  .range-picker {
    & .ant-picker-panels {
      @media only screen and (${media.xs}) and (max-width: ${BREAKPOINTS.md - 0.02}px) {
        display: flex;
      flex-direction: column;
      }
    }
  }

  .search-overlay {
    box-shadow: var(--box-shadow);

    @media only screen and (${media.xs}) and (max-width: ${BREAKPOINTS.md - 0.02}px)  {
      width: calc(100vw - 16px);
    max-width: 600px;
    }

    @media only screen and (${media.md}) {
      width: 323px;
    }
  }

  a {
    color: var(--primary-color);
    &:hover,:active {
      color: var(--ant-primary-color-hover);
    }
  }

  .ant-picker-cell {
    color: var(--text-main-color);
  }

  .ant-picker-cell-in-view .ant-picker-calendar-date-value {
    color: var(--text-main-color);
    font-weight: ${FONT_WEIGHT.bold};
  }

  .ant-picker svg {
    color: var(--text-light-color);
  }

  // notifications start
  .ant-notification-notice {
    width: 36rem;
    min-height: 4rem;

    .ant-notification-notice-with-icon .ant-notification-notice-message {
      margin-bottom: 0;
      margin-left: 2.8125rem;
    }

    .ant-notification-notice-with-icon .ant-notification-notice-description {
      margin-left: 3.375rem;
      margin-top: 0.5rem;
    }

    .ant-notification-notice-close {
      top: 1.25rem;
      right: 1.25rem;
    }

    .ant-notification-notice-close-x {
      display: flex;
      font-size: 0.9375rem;
    }

    .notification-without-description {
      .ant-notification-notice-close {
        top: 1.875rem;
      }
      .ant-notification-notice-with-icon .ant-notification-notice-description  {
        margin-top: 0.625rem;
      }
    }

    .title {
      font-size: ${FONT_SIZE.xl};
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      font-weight: ${FONT_WEIGHT.medium};
      color: #1D2129;
  }

    .description {
      color: #1D2129;
      font-size: ${FONT_SIZE.md};
      font-weight: ${FONT_WEIGHT.regular};
      line-height: 1.375rem;
    }

    .success-icon {
      color: var(--success-color);
    }

    .info-icon {
      color: var(--primary-color);
    }

    .warning-icon {
      color: var(--warning-color);
    }

    .error-icon {
      color: var(--error-color);
    }
  }

  .ant-menu-inline, .ant-menu-vertical {
    border-right: 0;
  }
  // notifications end
  .typography-title {
    color: var(--primary-color) !important;
    font-weight: ${FONT_WEIGHT.bold} !important;
  }

  .ant-input-number-disabled, .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector, .ant-radio-disabled + span, .ant-input-disabled {
  background-color: #fff !important;
  color: #1D2129 !important;
  border: none !important;
  }

  .ant-input-disabled::-webkit-input-placeholder, .ant-input-number-disabled .ant-input-number-input::-webkit-input-placeholder{
    color: transparent;
  }


  .ant-select-disabled .ant-select-arrow {
  display: none;
  }

  .ant-radio-wrapper-disabled:not(.ant-radio-wrapper-checked).device-radio {
    border: none;
  }

  .ant-form-item-control-input {
    min-height: 32px;
  }

  .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Đảm bảo hiển thị trên tất cả các phần tử khác */
  pointer-events: auto; /* Ngăn người dùng tương tác với phần còn lại của trang */
}

  .overlay-content {
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
`;
