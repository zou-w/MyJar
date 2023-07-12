import { Navigate } from "react-router-dom";
// import Login from "../pages/login";

import { ProjectList } from "pages/project-list";
import { ProjectScreen } from "pages/project";

export interface RouteObject {
  path?: string;
  element?: React.ReactNode;
  children?: RouteObject[];
}

//name 和 icon 属性不是必须属性
const routes: RouteObject[] = [
  {
    path: "/projects",
    element: <ProjectList />,
    children: [
      {
        path: ":projectId/*",
        element: <ProjectScreen />,
      },
    ],
  },
  //重定向
  // {
  //   path: "/",
  //   element: <Navigate to="/login" />,
  // },
];

export default routes;
