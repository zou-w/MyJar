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

### 2.git 提交配置
