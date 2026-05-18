import React from 'react';
import { Modal, ModalProps } from 'antd';
import { modalSizes } from '@app/constants/modalSizes';
import * as S from './BaseModal.styles';

interface BaseModalProps extends ModalProps {
  size?: 'small' | 'medium' | 'large';
}

interface BaseModalInterface extends React.FC<BaseModalProps> {
  info: typeof Modal.info;
  success: typeof Modal.success;
  warning: typeof Modal.warning;
  error: typeof Modal.error;
}

export const BaseModal: BaseModalInterface = ({ size = 'medium', children, ...props }) => {
  const modalSize = Object.entries(modalSizes).find((sz) => sz[0] === size)?.[1];

  return (
    <S.Modal width={modalSize} {...props}>
      {children}
    </S.Modal>
  );
};

BaseModal.info = Modal.info;
BaseModal.success = Modal.success;
BaseModal.warning = Modal.warning;
BaseModal.error = Modal.error;
