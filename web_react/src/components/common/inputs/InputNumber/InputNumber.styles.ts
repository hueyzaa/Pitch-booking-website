import { InputNumber as AntInputNumber } from 'antd';
import styled from 'styled-components';

interface InputNumberProps {
  $block?: boolean;
  $noArr?: boolean;
}

export const InputNumber = styled(AntInputNumber)<InputNumberProps>`
  width: 100%;
  ${(props) => props.$block && 'display: block; width: 100%'};
  input::-webkit-input-placeholder {
    color: #c6c6c6;
  }
  input::-moz-input-placeholder {
    color: #c6c6c6;
  }
  .ant-input-number-handler-wrap {
    ${(props) => props.$noArr && 'display: none;'}
  }
`;
