import { notificationController } from '@app/controllers/notificationController';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    notificationController.error({ message: action.payload as ReactNode });
  }

  return next(action);
};
