import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from '../constants/routePaths';

// Lazy load auth pages
const LoginPage = React.lazy(() => import('@app/pages/Auth/LoginPage'));
const SignUpPage = React.lazy(() => import('@app/pages/Auth/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('@app/pages/Auth/ForgotPasswordPage'));
const SecurityCodePage = React.lazy(() => import('@app/pages/Auth/SecurityCodePage'));
const NewPasswordPage = React.lazy(() => import('@app/pages/Auth/NewPasswordPage'));
const VerifyOtpPage = React.lazy(() => import('@app/pages/Auth/VerifyOtpPage'));

/**
 * Authentication routes
 * All routes are lazy-loaded for better performance
 * These routes are publicly accessible and handle user authentication flows
 */
export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.AUTH.BASE,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'sign-up',
        element: <SignUpPage />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: 'security-code',
        element: <SecurityCodePage />
      },
      {
        path: 'new-password',
        element: <NewPasswordPage />
      },
      {
        path: 'verify-otp',
        element: <VerifyOtpPage />
      }
    ]
  }
];
