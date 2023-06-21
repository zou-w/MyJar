import * as auth from "auth-provider";

import React, { ReactNode } from "react";
import { useState } from "react";

import { User } from "pages/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils/myHook";

interface AuthForm {
  username: string;
  password: string;
}

//初始化user,刷新页面后,数据持久化
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    //请求me可以获取个人信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

//创建context
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

//创建组件,将context返回回去
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => setUser(null));

  //初始化user
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

//自定义hook,返回context数据
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvide中使用");
  } else {
    return context;
  }
};
