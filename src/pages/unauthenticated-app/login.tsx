import { FormEvent } from "react";

//导入请求
import { useAuth } from "pages/context/auth-context";

import { Button, Form, Input } from "antd";
import { LongButton } from ".";

export const LoginPage = () => {
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    //阻止自动提交表单
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      {/* {user ? (
        <div>
          登录成功,用户名:{user?.name}, token:{user?.token}
        </div>
      ) : null} */}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
