import userReducer from '@app/store/slices/userSlice';
import authReducer from '@app/store/slices/authSlice';
import themeReducer from '@app/store/slices/themeSlice';
import appReducer from '@app/store/slices/appSlice';

export default {
  user: userReducer,
  auth: authReducer,
  app: appReducer,
  theme: themeReducer
};
