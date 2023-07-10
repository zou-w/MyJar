import { useEffect, useState } from "react";
import { useMount } from "utils/myHook";

//hook 与 闭包 的关系

//模拟
const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的num值:${num}`;
    return function unmount() {
      console.log(message);
    };
  };

  //将effect返回出去
  return effect;
};

//执行test返回effect函数
const add = test();
//执行effect函数,返回引用了message1的unmount函数
const unmount = add();
//调用＋1
//再执行effect函数,返回引用了message2的unmount函数
add();
//message3
add();
//打印,引用的是message1
unmount(); //所以结果为1

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  //   useMount(() => {
  //     setInterval(() => {
  //       console.log("num in setInterval", num);
  //     }, 1000);
  //   });

  //   //闭包
  //   useEffect(() => {
  //     return () => {
  //       console.log(num);
  //     };
  //   });

  //正确写法

  useEffect(() => {
    const time = setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [num]);

  //闭包
  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);
};
