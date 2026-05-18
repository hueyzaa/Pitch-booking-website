import { Modal as AntModal } from 'antd';
import styled from 'styled-components';

export const Modal = styled(AntModal)`
  .ant-modal-body {
    padding: 1rem;
    max-height: 70vh;
    overflow: scroll;
  }
`;
