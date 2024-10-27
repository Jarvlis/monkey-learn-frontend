"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import stores, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";
import { setLoginUser } from "@/stores/loginUser";

/**
 * 全局初始化逻辑
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // 获取当前页面路径
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();

  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    // 登录和注册页不用获取登录信息
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      const res = await getLoginUserUsingGet();
      if (res.data) {
        dispatch(setLoginUser(res.data as API.LoginUserVO));
      }
    }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={stores}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
