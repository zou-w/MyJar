import { useHttp } from "./http";
import { User } from "types/user";
import { useQuery } from "react-query";

export const useUsers = (list?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", list], () =>
    client("users", { data: list })
  );
};
