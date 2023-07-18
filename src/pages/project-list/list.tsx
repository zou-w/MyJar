import { Dropdown, Menu, Modal, Table, TableProps, Tag } from "antd";
import dayjs from "dayjs";
//react-router 和 react-router-dom的关系,类似于react和react-dom/react-native
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Pin } from "components/pin";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/project";
import { User } from "types/user";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());

  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, list) {
            return (
              <Pin checked={list.pin} onCheckedChange={pinProject(list.id)} />
            );
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          render(value, list) {
            return <Link to={`/projects/${list.id}`}>{list.name}</Link>;
          },
          //排序
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },

        {
          title: "负责人",
          render(value, list) {
            return (
              <span>
                {users.find((user) => user.id === list.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      dropdownRender={() => (
        <Menu
          items={[
            {
              key: "edit",
              label: (
                <Tag color="#55acee" onClick={editProject(project.id)}>
                  编辑
                </Tag>
              ),
            },
            {
              key: "delete",
              label: (
                <Tag
                  color="#cd201f"
                  onClick={() => confirmDeleteProject(project.id)}
                >
                  删除
                </Tag>
              ),
            },
          ]}
        ></Menu>
      )}
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
