import { IUser } from '@app/interfaces/interfaces';

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const persistUser = (user: IUser): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): IUser | null => {
  const userStr = localStorage.getItem('user');

  return userStr ? JSON.parse(userStr) : null;
};

export const persistPermission = (permission: string): void => {
  localStorage.setItem('permission', permission);
};

export const readPermission = (): string => {
  return localStorage.getItem('permission') || '';
};

export const persistDeviceId = (newDeviceId: string): void => {
  localStorage.setItem('deviceId', newDeviceId);
};

export const readDeviceId = (): string | null => {
  return localStorage.getItem('deviceId');
};

export const persistAccount = (account: string): void => {
  localStorage.setItem('account', account);
};

export const readAccount = (): string | null => {
  return localStorage.getItem('account');
};

export const persistRecaptcha = (recaptcha: boolean): void => {
  localStorage.setItem('recaptcha', recaptcha.toString());
};

export const readRecaptcha = (): boolean => {
  return localStorage.getItem('recaptcha') === 'true';
};

export const persistTimeOut = (timeOut: number): void => {
  localStorage.setItem('timeOut', timeOut.toString());
};

export const readTimeOut = (): number => {
  return parseInt(localStorage.getItem('timeOut') || '0', 10);
};

export const persistRequireOtp = (requireOtp: boolean): void => {
  localStorage.setItem('requireOtp', requireOtp.toString());
};

export const readRequireOtp = (): boolean => {
  return localStorage.getItem('requireOtp') === 'true';
};

export const persistNeedUpdatePassword = (needUpdatePassword: boolean): void => {
  localStorage.setItem('needUpdatePassword', needUpdatePassword.toString());
};

export const readNeedUpdatePassword = (): boolean => {
  return localStorage.getItem('needUpdatePassword') === 'true';
};

export const persistSystemConfig = (systemConfig: any): void => {
  localStorage.setItem('cauHinhHeThong', JSON.stringify(systemConfig));
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
export const deletePermission = (): void => localStorage.removeItem('permission');
export const deleteDeviceId = (): void => localStorage.removeItem('deviceId');
export const deleteAccount = (): void => localStorage.removeItem('account');
export const deleteTimeOut = (): void => localStorage.removeItem('timeOut');
export const deleteRecaptcha = (): void => localStorage.removeItem('recaptcha');
export const deleteRequireOtp = (): void => localStorage.removeItem('requireOtp');
export const deleteNeedUpdatePassword = (): void => localStorage.removeItem('needUpdatePassword');
export const deleteSystemConfig = (): void => localStorage.removeItem('cauHinhHeThong');
