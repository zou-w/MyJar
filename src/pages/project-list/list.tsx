import { Dropdown, Menu, Table, TableProps, Tag } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
//react-router 和 react-router-dom的关系,类似于react和react-dom/react-native
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { Pin } from "components/pin";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";

//TODO 把所有id都改成number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();

  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);

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
            return (
              <Dropdown
                dropdownRender={() => (
                  <Menu
                    items={[
                      {
                        key: "edit",
                        label: (
                          <Tag
                            color="#55acee"
                            onClick={editProject(project.id)}
                          >
                            编辑
                          </Tag>
                        ),
                      },
                      {
                        key: "delete",
                        label: <Tag color="#cd201f">删除</Tag>,
                      },
                    ]}
                  ></Menu>
                )}
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
