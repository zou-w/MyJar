import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  //上一次的值
  const [past, setPast] = useState<T[]>([]);
  //当前的值
  const [present, setPresent] = useState(initialPresent);
  //next的值
  const [future, setFuture] = useState<T[]>([]);

  //可以撤回
  const canUndo = past.length !== 0;
  //可以恢复
  const canRedo = future.length !== 0;

  const undo = () => {
    if (!canUndo) return;
    //可以就执行下面操作
    const previous = past[past.length - 1]; //获取上次操作的值
    const newPast = past.slice(0, past.length - 1); //更新数据

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]); //将值加入next
  };

  const redo = () => {
    if (!canRedo) return;

    const next = future[0]; //读取第一个值
    const newFuture = future.slice(1); //去掉当前值

    setPresent(next);
    setPast([...past, present]);
    setFuture(newFuture);
  };

  const set = (newPresent: T) => {
    if (newPresent === present) {
      return;
    }
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  };

  const reset = (newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  };

  return [
    { past, present, future },
    { set, reset, undo, redo, canRedo, canUndo },
  ];
};
