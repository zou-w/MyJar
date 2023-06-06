import { useEffect, useState } from "react";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

import qs from "qs";
import { cleanObject } from "utils";

//引入自定义hook
import { useDebounce, useMount } from "utils/myHook";

//请求的baseUrl
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  //input输入框
  const [inputValue, setInputValue] = useState({
    name: "",
    personId: "",
  });
  //使用debounce,useEffect监控debounceValue,调用请求
  const debounceValue = useDebounce(inputValue, 500);
  //option筛选框的人选
  const [users, setUsers] = useState([]);
  //获取的数据列表
  const [list, setList] = useState([]);

  //通过输入框,获取数据,发送请求
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async (res) => {
  //     if (res.ok) {
  //       setUsers(await res.json());
  //     }
  //   });
  // }, [inputValue]);

  //获取表单数据
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(inputValue))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [debounceValue]);

  return (
    <div>
      <SearchPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        users={users}
      />
      <List list={list} users={users} />
    </div>
  );
};
