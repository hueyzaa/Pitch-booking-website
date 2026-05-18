import React from 'react';
import { RouteObject } from 'react-router-dom';
import { withLoading } from '@app/hocs/withLoading.hoc';
import { ROUTE_PATHS } from '../constants/routePaths';

const FirstLoginPage = React.lazy(() => import('@app/pages/Auth/FirstLoginPage'));
const Logout = React.lazy(() => import('../components/Logout'));

const FirstLogin = withLoading(FirstLoginPage);
const LogoutFallback = withLoading(Logout);

/**
 * Public routes
 * These routes are accessible without authentication
 */
export const publicRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.FIRST_LOGIN,
    element: <FirstLogin />
  },
  {
    path: ROUTE_PATHS.LOGOUT,
    element: <LogoutFallback />
  }
];
