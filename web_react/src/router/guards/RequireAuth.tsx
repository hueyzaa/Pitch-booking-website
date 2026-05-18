import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WithChildrenProps } from '@app/types/generalTypes';
import { ROUTE_PATHS } from '../constants/routePaths';

/**
 * Authentication guard component
 * Redirects to login page if user is not authenticated
 */
const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <>{children}</> : <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />;
};

export default RequireAuth;
