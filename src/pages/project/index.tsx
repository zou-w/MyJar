import { Route, Routes, useLocation } from "react-router";

import { KanBanPage } from "pages/kanban";
import { EpicPage } from "pages/epic";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          selectedKeys={[routeType]}
          items={[
            {
              key: "kanban",
              label: <Link to={"kanban"}>看板</Link>,
            },
            {
              key: "epic",
              label: <Link to={"epic"}>任务组</Link>,
            },
          ]}
        ></Menu>
      </Aside>
      {/* 配置路由 */}
      <Main>
        <Routes>
          <Route path="kanban" element={<KanBanPage />} />
          <Route path="epic" element={<EpicPage />} />
          <Route index element={<KanBanPage />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
