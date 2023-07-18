import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { User } from "types/user";

export const useUsers = (list?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(list || {}) }));
  }, [list]);

  return result;
};
