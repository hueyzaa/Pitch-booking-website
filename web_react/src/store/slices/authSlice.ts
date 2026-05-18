import {
  deleteNeedUpdatePassword,
  deletePermission,
  deleteToken,
  deleteUser,
  persistPermission,
  persistToken,
  readPermission,
  readToken
} from '@app/services/localStorage.service';
import { setUser } from '@app/store/slices/userSlice';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface AuthSlice {
  token: string | null;
  permission: string | null;
}

const initialState: AuthSlice = {
  token: readToken(),
  permission: readPermission()
};

export const setToken = createAction('user/setToken', (newToken) => {
  persistToken(newToken);
  return {
    payload: newToken
  };
});

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: any, { dispatch }) => {
  dispatch(setUser(loginPayload));
  persistPermission(loginPayload.phan_quyen);
  setToken(loginPayload.token);
  return {
    token: readToken(),
    permission: readPermission()
  };
});

export const doLogout = createAsyncThunk('auth/doLogout', () => {
  deleteToken();
  deletePermission();
  deleteUser();
  deleteNeedUpdatePassword();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
      state.permission = '';
    });
  }
});

export default authSlice.reducer;
