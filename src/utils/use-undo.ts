import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  //定义状态
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  //可以撤回
  const canUndo = state.past.length !== 0;
  //可以恢复
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (!canUndo) return currentState;
      //可以就执行下面操作
      const previous = past[past.length - 1]; //获取上次操作的值
      const newPast = past.slice(0, past.length - 1); //更新数据

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { present, past, future } = currentState;
      if (!canRedo) return currentState;

      const next = future[0]; //读取第一个值
      const newFuture = future.slice(1); //去掉当前值

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) {
        return currentState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
