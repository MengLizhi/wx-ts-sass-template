# 微信小程序（TS + Sass）开发模板

# 概述

项目技术栈: gulp + Typescript + sass

gulp 作为构建工具

Typescript 作为 JavaScript 的替代

sass 替代 wxss

# 目录结构
- 根目录
  + dist (编译导出文件)
  + node_modules (项目依赖)
  + src (主目录)
    + assets (全局静态资源)
    + components (组件)
    + pages (页面)
    + untils (小程序API公共封装)
  + README.md (项目说明)
  + typings (Typescript 类型声明)
    + $.d.ts (项目全局方法类型声明)
  + gulpfile.js (gulp打包器配置)
  + project.config.json (小程序开发编辑器环境配置)
  + tsconfig.json (typescript 环境配置文件)


## ***安装项目依赖***
```
npm install

||

yarn install
```

### ***启动文件修改实时监听***
```
npm run dev

||

yarn dev
```

### ***编译生产环境包***
```
npm run build

||

yarn build
```
### ***快速创建页面与组件命令***
```
npm run new-file -- [-<p | c> <file name>] | [--<page | component> <file name>]

||

yarn build -- [-<p | c> <file name>] | [--<page | component> <file name>]
```
帮助描述
```
npm run new-file [-h | --help]

||

yarn build [-h | --help]
```