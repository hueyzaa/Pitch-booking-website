import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import { AppDate } from '@app/constants/Dates';

export const DayjsDatePicker = generatePicker<AppDate>(dayjsGenerateConfig);
