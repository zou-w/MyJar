import { useEffect, useState } from "react";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

import { cleanObject } from "utils";

//引入自定义hook
import { useDebounce, useMount } from "utils/myHook";
import { useHttp } from "utils/http";

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
  //封装的请求
  const client = useHttp();

  //通过输入框,获取数据,发送请求

  useEffect(() => {
    client("projects", { data: cleanObject(debounceValue) }).then(setList);
  }, [debounceValue]);

  useMount(() => {
    client("users").then(setUsers);
  });

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
