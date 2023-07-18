import { User } from "types/user";

//请求的baseUrl
const apiUrl = process.env.REACT_APP_API_URL;

//真实环境中,使用firebase第三方auth服务,不需要开发本文件
const localStorageKey = "__auth__provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handlerUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  //请求
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  //请求
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
