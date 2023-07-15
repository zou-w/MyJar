import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "pages/context/auth-context";
import { ProjectList } from "pages/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu, MenuProps, Space } from "antd";

import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "pages/project";

import routes from "routes";
import { resetRoute } from "utils";
import { ProjectModal } from "pages/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* 路由配置 */}
        <Routes>
          <Route path={"/projects"} element={<ProjectList />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      dropdownRender={() => (
        <Button type="primary" onClick={logout}>
          登出
        </Button>
      )}
    >
      <Button onClick={(e) => e.preventDefault()}>Hi,{user?.name}</Button>
    </Dropdown>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: gray;
// `;

const Main = styled.main`
  /* display: flex;
  overflow: hidden; */
`;
