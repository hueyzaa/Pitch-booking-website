import { readPermission } from '@app/services/localStorage.service';
import { appActions } from '@app/store/slices/appSlice';
import { doLogout } from '@app/store/slices/authSlice';
import { store } from '@app/store/store';

export const getToken = () => {
  const state = store.getState();
  return state.auth?.token || '';
};

export const signOut = () => {
  return store.dispatch(doLogout());
};

export const getRoleUser = () => {
  const state = store.getState();
  return state.auth?.permission;
};

export const getPermissionUser = (path: string) => {
  const userPermission = JSON.parse(readPermission() || '[]');
  return userPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0]?.actions || {};
};

export const showLoading = () => {
  return store.dispatch(appActions.showLoading());
};

export const hideLoading = () => {
  return store.dispatch(appActions.hideLoading());
};
