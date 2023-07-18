import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useKanBans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () => {
    return client("kanbans", { data: param });
  });
};
