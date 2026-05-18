import { ARR_LOGOUT_MESSAGE } from '@app/constants/Message';
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import styled from 'styled-components';

const EmptyDescription = styled.div`
  margin-top: -0.75rem;
`;

type NotificationProps = ArgsProps;

const openSuccessNotification = (config: NotificationProps): void => {
  notification.success({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className='description'>{config.description}</div> : <EmptyDescription />,
    className: config.description ? '' : 'notification-without-description',
    duration: 1
  });
};

const openInfoNotification = (config: NotificationProps): void => {
  notification.info({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className='description'>{config.description}</div> : <EmptyDescription />,
    className: config.description ? '' : 'notification-without-description',
    duration: 2
  });
};

const openWarningNotification = (config: NotificationProps): void => {
  notification.warning({
    ...config,
    message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
    description: config.description ? <div className='description'>{config.description}</div> : <EmptyDescription />,
    className: config.description ? '' : 'notification-without-description',
    duration: 2
  });
};

const openErrorNotification = (config: NotificationProps): void => {
  if (!ARR_LOGOUT_MESSAGE.includes(config.message as string)) {
    notification.error({
      ...config,
      message: <div className={`title ${!config.description && `title-only`}`}>{config.message}</div>,
      description: config.description ? <div className='description'>{config.description}</div> : <EmptyDescription />,
      className: config.description ? '' : 'notification-without-description',
      duration: 2
    });
  }
};

export const notificationController = {
  success: openSuccessNotification,
  info: openInfoNotification,
  warning: openWarningNotification,
  error: openErrorNotification
};
