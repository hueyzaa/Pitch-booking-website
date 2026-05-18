import { SidebarNavigationItem } from '@app/components/layouts/main/sider/sidebarNavigation';
import { apiURL } from '@app/configs/configs';
import { Roles } from '@app/interfaces/interfaces';
import { readPermission } from '@app/services/localStorage.service';

export const roleCheckRoute = (arrCheck: any) => {
  const roleUser = JSON.parse(readPermission());

  const isKeyValid = (key: string): boolean => {
    return key === 'dashboard';
  };

  const checkRole = arrCheck.map((item: SidebarNavigationItem) => {
    if (item.children) {
      const checkChildren = item.children.filter((child: SidebarNavigationItem) => {
        return roleUser.some((role: Roles) => role.actions.showMenu && role.name === child.key);
      });
      return { ...item, children: checkChildren };
    } else {
      if (!isKeyValid(item.key)) {
        const data = roleUser.filter((role: Roles) => role.actions.showMenu && role.name === item.key);
        return data.length > 0 ? item : null;
      } else {
        return item;
      }
    }
  });
  return checkRole.filter((item: SidebarNavigationItem) => (item?.children ? item.children.length > 0 : item !== null));
};

export const checkExistFile = (file: any[]) => {
  if (file && file.length > 0) {
    return file.map((item: any) => {
      console.log('item', item);
      if (item.response)
        return {
          url: item.response.path,
          name: item.response.originalname
        };
      else {
        return {
          url: item.url.replace(`${apiURL}/`, ''),
          name: item.name
        };
      }
    });
  }
  return null;
};
