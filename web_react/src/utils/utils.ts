import { BaseBadgeProps } from '@app/components/common/BaseBadge/BaseBadge';
import { NotificationType } from '@app/components/common/BaseNotification/BaseNotification';
import { ones, scales, tens } from '@app/configs/configs';
import { MESSAGE } from '@app/constants/Message';
import { notificationController } from '@app/controllers/notificationController';
import { Severity } from '@app/interfaces/interfaces';
import moment from 'moment';
import { store } from '@app/store/store';
import { readDeviceId } from '@app/services/localStorage.service';
import CryptoJS from 'crypto-js';
//format o nhap number
export const formatter = (value: number | string | undefined): string => {
  if (!value) return '';

  const stringValue = typeof value === 'string' ? value : value.toString();
  const stringValue1 = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (stringValue1.includes('.') && stringValue1.endsWith('00')) {
    return stringValue1.slice(0, -3);
  } else return stringValue1;
};

export const parser = (value: string | undefined): any => {
  if (!value) {
    return undefined;
  }
  const parsedValue = value.replace(/(,*)/g, '');
  if (isNaN(Number(parsedValue))) {
    return undefined;
  }
  return parseInt(parsedValue, 10);
};

//template
export const capitalize = (word: string): string => `${word[0].toUpperCase()}${word.slice(1)}`;

export const hexToRGB = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return `${r}, ${g}, ${b}`;
};

export const normalizeProp = (prop: string | number | [number, number]): string =>
  typeof prop === 'number' ? `${prop}px` : (Array.isArray(prop) && `${prop[0]}px ${prop[1]}px`) || prop.toString();

export const defineColorBySeverity = (severity: NotificationType | undefined, rgb = false): string => {
  const postfix = rgb ? 'rgb-color' : 'color';
  switch (severity) {
    case 'error':
    case 'warning':
    case 'success':
      return `var(--${severity}-${postfix})`;
    case 'info':
    default:
      return `var(--primary-${postfix})`;
  }
};

export const mapBadgeStatus = (status: BaseBadgeProps['status']): Severity => {
  if (!status || status === 'default' || status === 'processing') {
    return 'info';
  }

  return status;
};

/**
 * Hàm tạo query string cho bộ lọc dữ liệu
 * @param {number} index Số thứ tự
 * @param {string} field Tên trường lọc
 * @param {string} operator Toán tử
 * @param {any} value Dữ liệu
 */
export const createFilterQuery = (
  index: number,
  field: string,
  operator: string,
  value: string | number,
  limit: number = 10,
  sortField: string = 'id',
  sortOrder: string = 'desc',
  extraFilters: any[] = []
) => {
  const query: any = {
    [`f[${index}][field]`]: `${field}`,
    [`f[${index}][operator]`]: `${operator}`,
    [`f[${index}][value]`]: `${value}`,
    limit: limit,
    page: index + 1, // Common pattern in this project
    sort_column: sortField,
    sort_direction: sortOrder
  };

  if (extraFilters && extraFilters.length > 0) {
    extraFilters.forEach((filter, i) => {
      const extraIndex = index + 1 + i;
      query[`f[${extraIndex}][field]`] = filter.field;
      query[`f[${extraIndex}][operator]`] = filter.operator;
      query[`f[${extraIndex}][value]`] = filter.value;
    });
  }

  return query;
};

export const createFilterQueryFormObject = (obj: any) => {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return queryString;
};

export const createFilterQueryFromArray = (obj: { field: string; operator: string; value: number | string }[]) => {
  const query: { [key: string]: number | string } = obj.reduce((result: any, item, index) => {
    result[`f[${index}][field]`] = item.field;
    result[`f[${index}][operator]`] = item.operator;
    result[`f[${index}][value]`] = item.value;
    return result;
  }, {});
  return query;
};

export function calculateTimeDifference(providedTime: string) {
  const now = moment();
  const providedTimeMoment = moment(providedTime);
  const diffMinutes = now.diff(providedTimeMoment, 'minutes');

  switch (true) {
    case diffMinutes >= 60 * 24:
      // eslint-disable-next-line no-case-declarations
      const days = now.diff(providedTimeMoment, 'days');
      return `${days} ngày`;

    case diffMinutes >= 60:
      // eslint-disable-next-line no-case-declarations
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} giờ`;

    default:
      return `${diffMinutes} phút`;
  }
}

export const convertNumberToWords = (num: number) => {
  if (num === 0) {
    return 'không đồng';
  } else {
    let words = '';
    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        let word = convertNumberToWordsUnder1000(num % 1000);
        if (i === 1 && num % 1000 === 110) {
          word = 'một trăm mười';
        }
        words = word + ' ' + scales[i] + ' ' + words;
      }
      num = Math.floor(num / 1000);
      i++;
    }
    return words.trim() + ' đồng';
  }
};

const convertNumberToWordsUnder1000 = (num: number): string => {
  if (num === 0) {
    return '';
  } else if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return 'mười ' + ones[num - 10];
  } else if (num < 100) {
    return tens[Math.floor(num / 10)] + ' ' + convertNumberToWordsUnder1000(num % 10);
  } else if (num < 110) {
    return ones[Math.floor(num / 100)] + ' trăm mười';
  } else {
    return ones[Math.floor(num / 100)] + ' trăm ' + convertNumberToWordsUnder1000(num % 100);
  }
};

export function convertDayOfWeekEnglishToVietnamese(dayOfWeek: string): string {
  const dayMap: { [key: string]: string } = {
    Monday: 'Thứ Hai',
    Tuesday: 'Thứ Ba',
    Wednesday: 'Thứ Tư',
    Thursday: 'Thứ Năm',
    Friday: 'Thứ Sáu',
    Saturday: 'Thứ Bảy',
    Sunday: 'Chủ Nhật'
  };

  return dayMap[dayOfWeek] || dayOfWeek;
}

export function mergeArrays(arr1: any, arr2: any) {
  const merged = JSON.parse(JSON.stringify(arr1));

  // Lặp lại từng mục trong arr2 và merge
  arr2.forEach((item2: any) => {
    const item1 = merged.find((item: any) => item.name === item2.name); // Tìm một mục phù hợp trong arr1
    if (item1) {
      item1.actions = { ...item1.actions, ...item2.actions };
    } else {
      merged.push(JSON.parse(JSON.stringify(item2)));
    }
  });

  return merged;
}

export const numberWithCommas = (x: number | string | undefined): any => {
  if (!x) return undefined;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const ordinalSuffix = (i: number) => {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const camelCasePathUrl = (text: string, capitalizeFirst = true) => {
  return text
    .replace(/^\//, '')
    .split('-')
    .map((word, index) => {
      if (index === 0 && !capitalizeFirst) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};
export const processError = (resp: any, callback?: () => void) => {
  if (resp.message == MESSAGE.INVALID_PARAMS) {
    notificationController.error({
      message: resp.data[0]
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    callback
      ? callback()
      : notificationController.error({
          message: resp.message
        });
  }
};

/**
 * Ví dụ sử dụng hàm tạo URL an toàn ở frontend
 * File này chỉ mang tính chất minh họa, không được sử dụng trực tiếp
 */

// Hàm tạo hash_string bảo mật từ URL gốc
export function generateHashStringAndParamsString({ originalUrl }: { originalUrl: string }) {
  const userId = store.getState().user.user?.id;
  const token = store.getState().auth.token;
  const deviceId = readDeviceId();
  const originalUrlBase64 = btoa(originalUrl);
  // Tạo timestamp (thời gian hiện tại tính bằng giây)
  const timestamp = Math.floor(Date.now() / 1000).toString();
  // Dữ liệu cần hash
  const data = `${userId}_${deviceId}_${originalUrlBase64}_${timestamp}_${token}`;
  const hashHex = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
  const signature = hashHex;
  // URL cơ sở - endpoint xử lý truy cập tài nguyên
  // Trả về URL hoàn chỉnh

  const paramsString = `userId=${userId}&deviceId=${deviceId}&originalUrl=${originalUrlBase64}&timestamp=${timestamp}&signature=${signature}`;
  return paramsString;
}

// Hàm chuẩn hóa chuỗi: bỏ dấu và lowercase
// Hàm chuẩn hóa chuỗi: bỏ dấu, lowercase và thay khoảng trắng bằng "-"
export const normalizeText = (text: string): string => {
  return text
    .normalize('NFD') // tách chữ và dấu
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .toLowerCase() // in thường
    .trim() // bỏ khoảng trắng thừa 2 đầu
    .replace(/\s+/g, '-'); // thay khoảng trắng bằng "-"
};

export const getImageUrl = (baseAppUrl: string, path: string | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = baseAppUrl?.endsWith('/') ? baseAppUrl.slice(0, -1) : baseAppUrl;
  const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');
  return `${baseUrl}/${cleanPath}`;
};

export const setValueFileAnt = (apiURL: string, filePath: string, fileName?: string) => {
  if (!filePath) return undefined;

  // Extract file name from path if not provided
  const displayName = fileName || filePath.split(/[/\\]/).pop() || 'file';

  // Build full URL
  const fullUrl = getImageUrl(apiURL, filePath);

  return [
    {
      uid: Date.now().toString(),
      name: displayName,
      url: fullUrl,
      status: 'done' as const,
      response: { path: filePath } // Keep the original path for the form
    }
  ];
};

/**
 * Automatically calculates the next available sequence number if the current one is taken.
 * Ensures the value starts from at least 1.
 * @param currentVal The number entered by the user
 * @param existingVals Array of numbers already used in the same category
 */
export const handleDuplicateOrder = (currentVal: number, existingVals: number[]): number => {
  // Ensure the starting value is at least 1
  let nextValue = Math.max(1, currentVal);
  const usedValues = new Set(existingVals.map((v) => Number(v)).filter((v) => !isNaN(v)));

  while (usedValues.has(nextValue)) {
    nextValue++;
  }
  return nextValue;
};
