import { useEffect, useState } from "react";
import { useMountedRef } from "utils";

//页面加载数据
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //依赖项里面加上callback,会造成无限循环,与useCallback和useMemo有关系
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
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

interface State<D> {
  error: Error | null;
  data: D | null;
  state: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  state: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

//操作请求状态
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();

  //useState直接传入函数的含义是:惰性初始化;所以用useState保存函数不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      state: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      state: "error",
      data: null,
    });

  // 用来触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    //存储上次请求的状态
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, state: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((error) => {
        //catch之间会消化异常,如果不主动抛出,外面接收不到
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        } else {
          return error;
        }
      });
  };

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    isSuccess: state.state === "success",
    run,
    setData,
    setError,
    //被调用时,重新跑一边run,让state刷新
    retry,
    ...state,
  };
};
