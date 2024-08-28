# 仿问卷星-前端

该项目基于 `Vite + React` 实现了仿问卷星的前端（B 端）部分，是仿问卷星项目的核心部分。

> 该项目已部署在 vercel 上，可以通过 https://wenjuan-fe.vercel.app/ 访问仿问卷星项目。

## 1. QuickStart - 启动服务 o(*￣▽￣*)ブ

```bash
npm install
npm run dev
```

## 2. 技术栈

### 2.1 开发框架与语言

1. **React** - 前端框架
2. **TypeScript** - 编程语言
3. **Vite** - 构建工具

### 2.2 样式与 UI

1. **Ant Design (Antd)** - UI 组件库
2. **Sass Module** - 样式管理

### 2.3 路由与状态管理

1. **React Router** - 路由管理
2. **Redux** - 状态管理

###  2.4 代码质量与规范

1. **ESLint** - 代码风格检查
2. **Prettier** - 代码格式化
3. **Husky** - Git hooks 管理
4. **Commitlint** - Git commit 风格检查

### 2.5 数据处理与网络请求

1. **Axios** - 网络请求工具

### 2.6 功能扩展

1. **ahooks** - 自定义 Hooks 库
2. **Dnd Kit** - 拖拽排序功能
3. **Recharts** - 图表可视化

### 2.7 测试与分析

1. **Jest** - 单元测试
2. **Storybook** - 组件可视化测试
3. **Vite Bundle Visualizer** - 代码体积分析

## 3 可用脚本

```jsonc
"scripts": {
    "dev": "vite", // 启动开发服务器
    "dev-debug": "vite --debug", // 启动开发服务器并开启调试模式
    "build": "tsc -b && vite build", // 先构建 TypeScript 项目，再进行生产环境打包
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0", // 执行 ESLint 进行代码检查，确保无警告
    "preview": "vite preview", // 预览生产环境的打包结果
    "format": "prettier --write 'src/**/*.{js,ts,jsx,tsx}'", // 使用 Prettier 格式化代码
    "prepare": "husky", // Husky 的准备命令，用于设置 Git hooks
    "test": "jest --watchAll=false", // 运行所有单元测试
    "scss-types": "typed-scss-modules src --watch", // 生成 SCSS 模块的类型定义文件，并开启监听模式
    "visualize-treemap": "vite-bundle-visualizer", // 生成项目打包后的 treemap 可视化
    "visualize-sunburst": "vite-bundle-visualizer -t sunburst", // 生成项目打包后的 sunburst 图可视化
    "visualize-network": "vite-bundle-visualizer -t network", // 生成项目打包后的 network 图可视化
    "visualize-rawdata": "vite-bundle-visualizer -t raw-data", // 生成项目打包后的原始数据可视化
    "storybook": "storybook dev -p 6006", // 启动 Storybook 开发服务器
    "build-storybook": "storybook build" // 构建 Storybook 静态文件
},
```

## 4. 项目结构

```bash
/src
 - /components 组件，即一般组件
 - /hooks 自定义 hook
 - /layouts 页面布局，其中包含 <Outlet/>
 - /pages 页面文件，即路由组件
 - /router 路由器
 - /service 封装的 axios 及请求函数
 - /store Redux 状态管理
 - /stories 组件的可视化
 - /types 类型文件
 - /utils 工具文件
```



