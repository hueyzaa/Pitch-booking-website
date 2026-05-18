import { LockOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

interface ProfileNavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: 'primary' | 'error' | 'warning' | 'success';
  href: string;
}

export const profileNavData: ProfileNavItem[] = [
  {
    id: 1,
    name: 'profile.nav.personalInfo.title',
    icon: <UserOutlined rev={undefined} />,
    color: 'primary',
    href: 'personal-info'
  },
  {
    id: 2,
    name: 'profile.nav.securitySettings.title',
    icon: <SecurityScanOutlined rev={undefined} />,
    color: 'success',
    href: 'security-settings'
  },
  {
    id: 3,
    name: 'profile.nav.securitySettings.updatePassword',
    icon: <LockOutlined rev={undefined} />,
    color: 'error',
    href: 'update-pass-settings'
  }
  // {
  //   id: 3,
  //   name: 'profile.nav.notifications.title',
  //   icon: <BellOutlined rev={undefined} />,
  //   color: 'error',
  //   href: 'notifications'
  // }
];
