# 项目介绍

## 项目配置

### 1.prettier 配置

```
安装:
npm install --save-dev --save-exact prettier

//创建 .prettierrc.json 文件
echo {}> .prettierrc.json
```

//创建 .prettierignore 文件
配置忽略文件内容

```
# Ignore artifacts:
build
coverage
```

在代码提交之前,自动格式化:

```
npx mrm@2 lint-staged

//在package.json文件中修改:
 "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

防止 eslint 和 prettier 冲突

```
安装:
npm install eslint-config-prettier -D

配置package.json:
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

### 2.Mock 数据工具

#### 1.json-server

`json-server`:
rest api 风格
使用说明:

```
安装:
npm install json-server -D

配置package.json:
 "json-server": "json-server __json_server_mock__/db.json --watch --port 3004"

启动;
json-server --watch db.json
```

当请求不为 rest 风格的时候
eg: /login
需要配置中间键

```
//创建middleware.js文件,在里面配置类型

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};

//然后在package.json文件添加启动指令

"json-server": "json-server __json_server_mock__/db.json --watch --port 3004 --middlewares ./__json_server_mock__/middleware.js"

```

#### 2.Service Worker

1. 所有请求被 Service Worker 代理
2. 以 localStorage 为数据库进行 crud 操作
3. 可以对请求进行精准控制

```
安装:
npx imooc-jira-tool
```

### 3.请求相关

转换请求的 query 参数格式

```
qs:
npm install qs

使用:
qs.stringify(cleanObject(inputValue))

//ts中如果引入类型错误
//安装:
npm install @types/qs -D
```

## 错误介绍

### 1.prettier

```
Invalid configuration file `.prettierrc.json`: JSON Error in E:\学习资料\hook-ts项目\myjira\.prettierrc.json:
[error]
[error] > 1 | ��{
[error]     | ^
[error]   2 |
[error]   3 |
[error]   4 |

将编码格式utf-16
更改为utf-8
```
