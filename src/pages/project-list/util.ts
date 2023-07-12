import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [inputValue, setInputValue] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...inputValue,
        personId: Number(inputValue.personId) || undefined,
      }),
      [inputValue]
    ),
    setInputValue,
  ] as const;
};
