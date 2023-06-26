import { Input, Select } from "antd";

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
    <form>
      <div>
        <Input
          type="text"
          value={inputValue.name}
          onChange={(event) =>
            setInputValue({ ...inputValue, name: event.target.value })
          }
        />
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
      </div>
    </form>
  );
};
