import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { BaseInput as CommonInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  padding: 2.5rem;
  width: 31.75rem;
  border-radius: 20px;
  box-shadow: var(--box-shadow-login);
  border-radius: 20px;
  background-color: var(--background-color);

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
`;

export const Description = styled.div`
  margin-bottom: 1.875rem;
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.regular};

  @media only screen and (${media.xs}) {
    font-size: ${FONT_SIZE.xxs};
  }

  @media only screen and (${media.md}) {
    font-size: ${FONT_SIZE.xs};
  }
`;

export const FormTitle = styled.div`
  margin-bottom: 0.625rem;
  font-size: ${FONT_SIZE.xxl};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.5625rem;
  text-align: center;
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

export const SubmitButton = styled(BaseButton)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  width: 100%;
`;

export const ResendWrapper = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    color: #bfbfbf;
    cursor: not-allowed;
  }
`;
