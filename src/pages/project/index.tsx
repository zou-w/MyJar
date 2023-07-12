import { Navigate, Route, Routes } from "react-router";

import { KanBanPage } from "pages/kanban";
import { EpicPage } from "pages/epic";
import { Link } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      {/* 配置路由 */}
      <Routes>
        <Route path="kanban" element={<KanBanPage />} />
        <Route path="epic" element={<EpicPage />} />
        <Route index element={<KanBanPage />} />
      </Routes>
    </div>
  );
};
