import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { SidebarNavigationItem, sidebarNavigation } from '../sidebarNavigation';
import * as S from './SiderMenu.styles';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  []
);

const getPathnameRoot = (pathname: string) => {
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const parts = pathname.split('/');
  return parts.length > 1 ? '/' + parts[1] : pathname;
};

const SiderMenu: React.FC<SiderContentProps> = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const currentMenuItem1 = sidebarNavFlat.find(({ url }) => url === getPathnameRoot(location.pathname));
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];
  const selectedKeys = currentMenuItem1 ? [currentMenuItem1.key] : [currentMenuItem?.key];

  return (
    <S.Menu
      mode='inline'
      defaultSelectedKeys={defaultSelectedKeys}
      selectedKeys={selectedKeys as any}
      items={sidebarNavigation.map((nav: SidebarNavigationItem) => {
        const isSubMenu = nav.children?.length;
        return {
          key: nav.key,
          title: t(nav.title),
          label: isSubMenu ? t(nav.title) : <Link to={nav.url || ''}>{t(nav.title)}</Link>,
          icon: nav.icon,
          children:
            isSubMenu &&
            nav.children &&
            nav.children.map((childNav) => ({
              key: childNav.key,
              label: <Link to={childNav.url || ''}>{t(childNav.title)}</Link>,
              title: t(childNav.title)
            }))
        };
      })}
    />
  );
};

export default SiderMenu;
