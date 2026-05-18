import { SidebarNavigationItem } from '@app/components/layouts/main/sider/sidebarNavigation';

export const flattenMenu = (menus: SidebarNavigationItem[]): SidebarNavigationItem[] => {
  const result: SidebarNavigationItem[] = [];

  //Todo tạo hàm đệ quy lại danh sách menu
  //Điều kiện dừng đến khi hết children
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const recurse = (items: SidebarNavigationItem[], parentKey = '') => {
    items.forEach((item) => {
      if (item.url) {
        result.push(item);
      }
      if (item.children) {
        recurse(item.children, item.key);
      }
    });
  };

  recurse(menus);

  return result;
};
