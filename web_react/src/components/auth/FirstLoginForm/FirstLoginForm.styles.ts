import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { BaseInput as CommonInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { InputPassword as CommonInputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
`;

export const FormWrapper = styled.div`
  padding: 3rem;
  width: 100%;
  max-width: 32rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background-color: var(--background-color);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (${media.xs}) {
    padding: 1.5rem;
    max-width: 100%;
    border-radius: 16px;
  }

  @media only screen and (${media.sm}) {
    padding: 2rem;
    max-width: 24rem;
  }

  @media only screen and (${media.md}) {
    padding: 2.5rem;
    max-width: 28rem;
  }

  @media only screen and (${media.lg}) {
    padding: 3rem;
    max-width: 32rem;
  }
`;

export const Description = styled.div`
  margin-bottom: 2rem;
  color: var(--text-secondary-color);
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.regular};
  line-height: 1.6;
  text-align: center;

  @media only screen and (${media.xs}) {
    font-size: ${FONT_SIZE.xs};
    margin-bottom: 1.5rem;
  }

  @media only screen and (${media.md}) {
    font-size: ${FONT_SIZE.md};
  }
`;

export const FormTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.3;
  text-align: center;
  color: var(--primary-color);
  letter-spacing: -0.02em;

  @media only screen and (${media.xs}) {
    font-size: 1.5rem;
  }

  @media only screen and (${media.lg}) {
    font-size: 2rem;
  }
`;

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 1.25rem;

  & .ant-form-item-control-input {
    min-height: 3.5rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
    margin-top: 0.5rem;
  }

  & label {
    color: var(--text-main-color);
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.semibold};
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`;

export const FormInput = styled(CommonInput)`
  color: var(--text-main-color);
  background: transparent;
  border-radius: 10px;
  height: 3rem;
  font-size: ${FONT_SIZE.md};

  & input.ant-input {
    background: transparent;
    border-radius: 10px;
    font-size: ${FONT_SIZE.md};
  }

  &:hover,
  &:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: var(--primary-color);
  }
`;

export const FormInputPassword = styled(CommonInputPassword)`
  color: var(--text-main-color);
  background: transparent;
  border-radius: 10px;
  height: 3rem;
  font-size: ${FONT_SIZE.md};

  & input.ant-input {
    background: transparent;
    border-radius: 10px;
    font-size: ${FONT_SIZE.md};
  }

  &:hover,
  &:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: var(--primary-color);
  }
`;

export const SubmitButton = styled(BaseButton)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
