import * as auth from "auth-provider";

import React, { ReactNode, useCallback } from "react";
import { useState } from "react";

import { User } from "pages/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils/myHook";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useAsync } from "utils/use-async";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auth.slice";
import { bootstrap, selectUser } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

//初始化user,刷新页面后,数据持久化
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    //请求me可以获取个人信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

//创建组件,将context返回回去
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  const dispatch: (...args: any) => Promise<User> = useDispatch();
  //初始化user
  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

//自定义hook,返回context数据
export const useAuth = () => {
  const dispatch: (...args: any[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
