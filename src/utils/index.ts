import { useEffect, useRef } from "react";

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
  //useRef在整个生命周期内不会改变值
  const oldTitle = useRef(document.title).current;
  // const oldTitle = document.title
  //页面加载时:oldTitle === 旧title 'React App'
  //加载后:oldTitle === 新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖,读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

//重置路由
export const resetRoute = () =>
  (window.location.href = window.location.origin + "/projects");
