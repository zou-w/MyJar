import { useEffect, useState } from "react";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

//引入自定义hook
import { useDebounce, useMount } from "utils/myHook";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { Button } from "antd";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectList = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);

  const [inputValue, setInputValue] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: lists,
    retry,
  } = useProject(useDebounce(inputValue, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        users={users || []}
      />
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        dataSource={lists || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
