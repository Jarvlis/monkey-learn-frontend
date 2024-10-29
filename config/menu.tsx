import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

export const menus = [
  { path: "/", name: "主页" },
  { path: "/banks", name: "题库" },
  { path: "/questions", name: "题目" },
  {
    path: "/user/center",
    name: "个人中心",
    access: !ACCESS_ENUM.NOT_LOGIN,
    hideInMenu: true,
  },
  {
    path: "/admin",
    name: "管理",
    access: ACCESS_ENUM.ADMIN,
    icon: <CrownOutlined></CrownOutlined>,
    children: [
      { path: "/admin/user", name: "用户管理" },
      { path: "/admin/bank", name: "题库管理" },
      { path: "/admin/question", name: "题目管理" },
    ],
  },
] as MenuDataItem[];

// 根据路径查找所有菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};
