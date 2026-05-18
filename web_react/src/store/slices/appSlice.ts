import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './../store';

const initialState = {
  reloadData: {
    default: false
  } as { [key: string]: boolean },
  isLoading: false,
  queryData: null,
  columns: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleReload: (state, action: PayloadAction<string>) => {
      const isOpenModal = state.reloadData[action.payload];
      if (typeof isOpenModal === 'undefined' || isOpenModal === null) {
        state.reloadData[action.payload] = true;
      } else {
        state.reloadData[action.payload] = !isOpenModal;
      }
    },
    saveQuery: (state, action) => {
      state.queryData = action.payload;
    },
    saveColumns: (state, action) => {
      state.columns = action.payload;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    }
  }
});

export const { toggleReload, showLoading, hideLoading } = appSlice.actions;
const appState = (state: RootState) => state.app;
export const appSelector = {
  reloadData: (name: string) => createSelector(appState, (app) => app.reloadData[name]),
  loading: createSelector(appState, (app) => app.isLoading)
};
export const appActions = appSlice.actions;
export default appSlice.reducer;
