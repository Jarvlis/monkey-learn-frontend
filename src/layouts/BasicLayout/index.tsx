"use client";
import { GithubFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { menus } from "../../../config/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { DEFAULT_USER } from "@/constants/user";
import { setLoginUser } from "@/stores/loginUser";
import SearchInput from "./components/searchInput";

const ProLayout = dynamic(
  () => import("@ant-design/pro-components").then((mod) => mod.ProLayout),
  {
    ssr: false,
  },
);

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录！");
      // 保存用户登录态
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
  };
  const isHideSearchInput = pathname.includes("/question");
  const loginUser = useSelector((state: RootState) => state.loginUser);
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout="top"
        prefixCls="my-prefix"
        bgLayoutImgList={[
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            left: 85,
            bottom: 100,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            bottom: -68,
            right: -45,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
            bottom: 0,
            left: 0,
            width: "331px",
          },
        ]}
        title="大圣面试"
        logo={
          <Image
            src="/assets/logo.png"
            alt={"大圣面试"}
            height={32}
            width={32}
          ></Image>
        }
        location={{
          pathname,
        }}
        token={{
          header: {
            colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
          },
        }}
        siderMenuType="group"
        menu={{
          collapsedShowGroupTitle: true,
        }}
        avatarProps={{
          src:
            loginUser.userAvatar ||
            "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: loginUser.userName || "小吗喽",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div onClick={() => router.push("/user/login")}>{dom}</div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                  ],
                  onClick: async (e: { key: React.Key }) => {
                    if (e.key === "logout") {
                      userLogout();
                    } else if (e.key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            isHideSearchInput ? null : <SearchInput key="search" />,
            <a
              href="https://github.com/Jarvlis/monkey-learn-frontend"
              target="_blank"
              rel="noopener noreferrer"
              key="github"
              style={{ color: "inherit" }}
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={(props) => {
          if (props?.collapsed) return undefined;
          return <GlobalFooter></GlobalFooter>;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
