import React from 'react';
import { RouteObject } from 'react-router-dom';
import { withLoading } from '@app/hocs/withLoading.hoc';
import ProfileLayout from '@app/components/profile/ProfileLayout';

// Lazy loaded components
const PersonalInfoPage = React.lazy(() => import('@app/pages/Profile/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/Profile/SecuritySettingsPage'));
const UpdatePasswordPage = React.lazy(() => import('@app/pages/Profile/UpdatePasswordPage'));

// Wrapped with loading HOC
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const UpdatePassword = withLoading(UpdatePasswordPage);

/**
 * Profile routes
 * These routes are nested under the profile layout and handle user profile management
 */
export const profileRoutes: RouteObject[] = [
  {
    path: 'profile',
    element: <ProfileLayout />,
    children: [
      {
        path: 'personal-info',
        element: <PersonalInfo />
      },
      {
        path: 'security-settings',
        element: <SecuritySettings />
      },
      {
        path: 'update-pass-settings',
        element: <UpdatePassword />
      }
    ]
  }
];
