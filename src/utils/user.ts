import { User } from "pages/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./myHook";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUsers = (list?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(list || {}) }));
  }, [list]);

  return result;
};
