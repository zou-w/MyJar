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
        <input
          type="text"
          value={inputValue.name}
          onChange={(event) =>
            setInputValue({ ...inputValue, name: event.target.value })
          }
        />
        <select
          value={inputValue.personId}
          onChange={(event) =>
            setInputValue({ ...inputValue, personId: event.target.value })
          }
        >
          <option value="">负责人:</option>
          {users.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
