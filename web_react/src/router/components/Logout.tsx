import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { IApiSuccess } from '@app/interfaces/interfaces';
import { doLogout } from '@app/store/slices/authSlice';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../constants/routePaths';

/**
 * Logout component
 * Handles user logout and redirects to login page
 */
const Logout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const result: IApiSuccess = await apiInstance.post(`${API_URL.LOGOUT}`);
      if (result.code === 200) {
        dispatch(doLogout());
      }
    } catch (error: any) {
      notificationController.error({ message: error.message });
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />;
};

export default Logout;
