import { useEffect, useState } from "react";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

//引入自定义hook
import { useAsync, useDebounce, useMount } from "utils/myHook";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";

export const ProjectList = () => {
  //input输入框
  // const [, setInputValue] = useState({
  //   name: "",
  //   personId: "",
  // });

  const [inputValue, setInputValue] = useUrlQueryParam(["name", "personId"]);
  //使用debounce,useEffect监控debounceValue,调用请求
  const debounceValue = useDebounce(inputValue, 500);

  //请求
  const { isLoading, error, data: lists } = useProject(debounceValue);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      <SearchPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        users={users || []}
      />
      <List loading={isLoading} dataSource={lists || []} users={users || []} />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
