import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalOpen } = useProjectModal();
  return (
    <Drawer width={"100vw"} onClose={close} open={projectModalOpen}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
