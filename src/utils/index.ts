import { useEffect } from "react";

//unknown是强化版any,传入的值不能使用
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在一个函数里,改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//动态修改title
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  //老的title
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
