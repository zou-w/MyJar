import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const { projectModalOpen } = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      width={"100vw"}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      open={projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
