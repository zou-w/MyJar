import { useAuth } from "pages/context/auth-context";
import { ProjectList } from "pages/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>退出登录</button>
      <ProjectList />
    </div>
  );
};
