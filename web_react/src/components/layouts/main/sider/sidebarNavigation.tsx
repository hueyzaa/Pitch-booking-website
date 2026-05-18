import { HistoryOutlined, SettingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'common.bang-dieu-khien',
    key: 'dashboard',
    icon: <StarOutlined />,
    url: '/'
  },
  {
    title: 'common.tai-khoan',
    key: 'tai-khoan',
    icon: <UserOutlined />,
    children: [
      {
        title: 'common.vai-tro',
        key: 'roles',
        url: '/tai-khoan/vai-tro'
      },
      {
        title: 'common.nguoi-dung',
        key: 'users',
        url: '/tai-khoan/nguoi-dung'
      }
    ]
  },
  {
    title: 'common.cau-hinh-he-thong',
    key: 'he-thong',
    icon: <SettingOutlined />,
    children: [
      {
        title: 'common.cau-hinh-thong-tin-he-thong',
        key: 'he-thong',
        url: '/he-thong'
      },
      {
        title: 'common.cau-hinh-chung',
        key: 'cau-hinh-chung',
        icon: <SettingOutlined />,
        url: '/cau-hinh-chung'
      },
      {
        title: 'common.quan-ly-upload',
        key: 'quan-ly-upload',
        icon: <StarOutlined />,
        url: '/quan-ly-upload'
      },
      {
        title: 'common.cau-hinh-trang',
        key: 'cau-hinh-trang',
        icon: <SettingOutlined />,
        url: '/cau-hinh-trang'
      }
    ]
  },
  {
    title: 'common.lich-su',
    key: 'lich-su',
    icon: <HistoryOutlined />,
    children: [
      {
        title: 'common.log-thao-tac',
        key: 'log-thao-tac',
        url: '/log-thao-tac'
      }
    ]
  }
];
