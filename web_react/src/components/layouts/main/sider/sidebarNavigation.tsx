import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  BankOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  WalletOutlined,
  TagsOutlined
} from '@ant-design/icons';

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
    icon: <DashboardOutlined />,
    url: '/'
  },

  {
    title: 'common.tai-khoan',
    key: 'tai-khoan',
    icon: <TeamOutlined />,
    children: [
      {
        title: 'common.vai-tro',
        key: 'roles',
        icon: <UserOutlined />,
        url: '/tai-khoan/vai-tro'
      },
      {
        title: 'common.nguoi-dung',
        key: 'users',
        icon: <UserOutlined />,
        url: '/tai-khoan/nguoi-dung'
      }
    ]
  },

  {
    title: 'common.bang-gia',
    key: 'bang-gia',
    icon: <DollarOutlined />,
    url: '/bang-gia'
  },

  {
    title: 'common.quan-ly-gia',
    key: 'quan-ly-gia',
    icon: <TagsOutlined />,
    url: '/quan-ly-gia'
  },

  {
    title: 'common.thu-chi',
    key: 'thu-chi',
    icon: <WalletOutlined />,
    url: '/thu-chi'
  },

  {
    title: 'common.quan-ly-san',
    key: 'quan-ly-san',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: 'common.loai-san',
        key: 'loai-san',
        icon: <TagsOutlined />,
        url: '/loai-san'
      },
      {
        title: 'common.san',
        key: 'san',
        icon: <BankOutlined />,
        url: '/san'
      },
      {
        title: 'common.trang-thai-san',
        key: 'trang-thai-san',
        icon: <SettingOutlined />,
        url: '/trang-thai-san'
      },
      {
        title: 'common.dat-san',
        key: 'dat-san',
        icon: <ShoppingCartOutlined />,
        url: '/dat-san'
      }
    ]
  },

  {
    title: 'common.quan-ly-khach-hang',
    key: 'quan-ly-khach-hang',
    icon: <TeamOutlined />,
    children: [
      {
        title: 'common.doi-tuong',
        key: 'doi-tuong',
        icon: <TagsOutlined />,
        url: '/doi-tuong'
      },
      {
        title: 'common.khach-hang',
        key: 'khach-hang',
        icon: <UserOutlined />,
        url: '/khach-hang'
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
        icon: <SettingOutlined />,
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
        icon: <AppstoreOutlined />,
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
        icon: <HistoryOutlined />,
        url: '/log-thao-tac'
      }
    ]
  }

  /*new-sidebar-nav-here*/
];
