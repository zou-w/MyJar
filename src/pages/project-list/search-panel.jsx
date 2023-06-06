export const SearchPanel = ({ inputValue, setInputValue, users }) => {
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
