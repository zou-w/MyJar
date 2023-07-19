import { List } from "./list";
import { SearchPanel } from "./search-panel";

//引入自定义hook
import { useDebounce } from "utils/myHook";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";

export const ProjectList = () => {
  const { open } = useProjectModal();

  const [inputValue, setInputValue] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(inputValue, 500));
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        users={users || []}
      />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};

//调试渲染
ProjectList.whyDidYouRender = false;
