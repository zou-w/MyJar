import { useEffect, useState } from "react";

//页面加载数据
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //value变化时,定义一个定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //在上一个useEffect处理完以后运行,收尾工作
    return () => clearTimeout(timer);
  }, [value, delay]);

  //返回更新后的value值
  return debouncedValue;
};
