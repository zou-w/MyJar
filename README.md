# 项目介绍

使用 react + ts + json-server + jira-dev-tool + antd + craco + css-in-js + dayjs

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

#### 1.转换请求的 query 参数格式

```
qs:
npm install qs

使用:
qs.stringify(cleanObject(inputValue))

//ts中如果引入类型错误
//安装:
npm install @types/qs -D
```

#### 2.请求异常

fetch 请求只有请求报错的时候才抛出异常
axios 是请求不为 200 时就会抛出异常

### 4.craco 配置

```
安装:
npm install @craco/craco
npm install craco-less

在package.json中

将react-scripts替换为craco
```

### 5.emotion 配置

```
安装:
 npm install @emotion/react @emotion/styled
```

### 6.dayjs

```
处理时间的工具
安装:
npm install dayjs
```

### 7.react-helmet

```
修改title等的配置
安装:
npm install react-helmet
npm i --save-dev @types/react-helmet
```

### 8.react-router

```
安装:
npm install react-router@6 react-router-dom@6
npm install history
npm install @types/react-router-dom
```

### 9.why-did-you-render

判断页面渲染原因

```
安装:
npm install @welldone-software/why-did-you-render --save-dev
```

### 10.react-redux/redux-toolkit

```
安装:
npm install react-redux @reduxjs/toolkit
```

### 11.react-query

数据缓存

```
安装:
npm install react-query

```

### 12.react-beautiful-dnd

拖拽工具

```
安装：
npm install react-beautiful-dnd
npm install @types/react-beautiful-dnd -D
```

## 部署

zou-w.github.io

### 1.spa-github-pages

```
安装：
npm install gh-pages -D
修改指令：
 "predeploy": "npm run build",
 "deploy": "gh-pages -d build -r git@github.com:zou-w/zou-w.github.io.git -b main"
运行：npm run deploy
解决部署路由问题:
添加404.html
添加到head：
<script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script checks to see if a redirect is present in the query string,
      // converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      (function (l) {
        if (l.search[1] === "/") {
          var decoded = l.search
            .slice(1)
            .split("&")
            .map(function (s) {
              return s.replace(/~and~/g, "&");
            })
            .join("?");
          window.history.replaceState(
            null,
            null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      })(window.location);
    </script>
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

### 2.jira-dev-tool

```
The mocking is still enabled, but it's highly recommended that you update your Service Worker by running:

$ npx msw init <PUBLIC_DIR>

This is necessary to ensure that the Service Worker is in sync with the library to guarantee its stability.
If this message still persists after updating, please report an issue: https://github.com/open-draft/msw/issues


//运行 npx msw init ./public 以后错误消失
```

同步和异步混合使用,使用 try catch 进行使用捕获错误
useState 中的 setState 操作是异步,获取更新后的值比正常慢
