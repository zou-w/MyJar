import { FormEvent } from "react";

//请求的baseUrl
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPage = () => {
  const login = (data: { username: string; password: string }) => {
    //请求
    fetch(`${apiUrl}/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        console.log(res);
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止自动提交表单
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
