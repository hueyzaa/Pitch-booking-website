import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';

export type BaseDatePickerProps = DatePickerProps;

export const BaseDatePicker = React.forwardRef<React.Component<BaseDatePickerProps>, BaseDatePickerProps>(
  ({ className, size = 'small', ...props }, ref) => (
    <DatePicker ref={ref} size={size} className={className} {...props} style={{ width: '100%' }} />
  )
);
