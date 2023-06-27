// /** @jsx jsx */
// import { jsx } from "@emotion/react";

import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  inputValue: {
    name: string;
    personId: string;
  };
  setInputValue: (inputValue: SearchPanelProps["inputValue"]) => void;
}

export const SearchPanel = ({
  inputValue,
  setInputValue,
  users,
}: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={inputValue.name}
          placeholder="项目名"
          onChange={(event) =>
            setInputValue({ ...inputValue, name: event.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={inputValue.personId}
          onChange={(value) =>
            setInputValue({ ...inputValue, personId: value })
          }
        >
          <Select.Option value="">负责人:</Select.Option>
          {users.map((item) => {
            return (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
