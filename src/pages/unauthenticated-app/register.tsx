import { FormEvent } from "react";

//导入请求
import { useAuth } from "pages/context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from ".";
import Password from "antd/es/input/Password";
import { useAsync } from "utils/use-async";

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确定两次密码"));
      return;
    }
    try {
      await run(register(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={"username"}>
        <Input type="text" id="username" placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input type="password" id="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name={"cpassword"}>
        <Input type="password" id="cpassword" placeholder="请确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
