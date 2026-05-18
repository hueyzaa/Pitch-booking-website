import styled from 'styled-components';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput as CommonInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { InputPassword as CommonInputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCheckbox } from '@app/components/common/BaseCheckbox/BaseCheckbox';
import { LeftOutlined } from '@ant-design/icons';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';

/**
 * Shared styled components for authentication forms
 * Used across all auth-related forms (Login, SignUp, ForgotPassword, etc.)
 */

export const FormWrapper = styled.div`
  padding: 2.5rem;
  width: 31.75rem;
  border-radius: 20px;

  @media only screen and (${media.xs}) {
    padding: 1.25rem;
    width: 20.75rem;
    max-height: calc(100vh - 3rem);
  }

  @media only screen and (${media.md}) {
    padding: 2.5rem;
    width: 31.75rem;
    max-height: calc(100vh - 3rem);
  }

  ${import.meta.env.VITE_TYPE_LOGIN === '1' &&
  `.header-login {
    text-align: center;
    &__logo {
      position: unset;
      text-align: center;
      img {
        width: 105;
        height: 105px;
      }
      @media only screen and (${media.xl}) {
        transform: translate(-50%, -50%);
        left: 50%;
        top: 0;
        position: absolute;
        text-align: center;
        img {
          width: 211px;
          height: 211px;
        }
      }
    }
    &__title {
      font-size: 24px;
      @media only screen and (${media.lg}) {
        margin-top: 4rem;
        margin-bottom: 5rem;
        font-size: 32px;
      }
    }
  }`}

  ${import.meta.env.VITE_TYPE_LOGIN === '2' &&
  `.header-login {
    display: flex;
    align-items: flex-start;
    &__logo {
      position: unset;
      text-align: center;
      img {
        width: 105;
        height: 105px;
      }
    }
    &__title {
      font-size: 24px;
      margin-left: 1.5rem;
      flex: 1;
      @media only screen and (${media.lg}) {
        margin-bottom: 5rem;
        font-size: 32px;
      }
    }
  }`}
`;

export const FormTitle = styled.div`
  margin-bottom: 0.625rem;
  font-size: ${FONT_SIZE.xxl};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.5625rem;
  text-align: center;
`;

export const FormCheckbox = styled(BaseCheckbox)`
  display: flex;
  padding-left: 0.125rem;

  & .ant-checkbox-inner {
    border-radius: 3px;
  }
`;

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;
  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
  }

  & label {
    color: var(--primary-color);
    font-size: ${FONT_SIZE.md};
    line-height: 1.25rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`;

export const FormInput = styled(CommonInput)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`;

export const FormInputPassword = styled(CommonInputPassword)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  @media only screen and (${media.xl}) {
    margin-bottom: 2rem;
  }
`;

export const Text = styled.span`
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.regular};
`;

export const LinkText = styled(Text)`
  text-decoration: underline;
  color: var(--primary-color);
`;

export const SubmitButton = styled(BaseButton)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  width: 100%;
`;

export const SocialButton = styled(BaseButton)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export const FooterWrapper = styled.div`
  margin-top: 1.25rem;
  text-align: center;
`;

export const BackIcon = styled(LeftOutlined)`
  font-size: 0.75rem;
  margin-right: 0.75rem;
`;

export const BackWrapper = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.25rem;
`;

export const SocialIconWrapper = styled.div`
  display: flex;
  margin-right: 0.8125rem;
  @media only screen and (${media.xs}) {
    margin-right: 0.625rem;
  }

  @media only screen and (${media.md}) {
    margin-right: 0.8125rem;
  }
`;
