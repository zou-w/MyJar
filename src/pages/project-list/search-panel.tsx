// /** @jsx jsx */
// import { jsx } from "@emotion/react";

import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  inputValue: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          defaultOptionName="负责人:"
          value={inputValue.personId}
          onChange={(value) =>
            setInputValue({ ...inputValue, personId: value })
          }
        />
      </Form.Item>
    </Form>
  );
};
