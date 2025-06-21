import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 导入基础重置样式
import "@choiceform/design-tokens/tokens.css";
import "@choiceform/design-tokens/preflight.css";

// 导入设计令牌的CSS变量 - 如果新包有这个导出的话
// import "@choiceform/design-tokens/style.css";

// 🎉 简化的API设计：
// 方式一：自动导入（推荐）- 导入即自动注入CSS变量
// 现在直接导入源码，wyw-in-js 会按需编译样式
import "@choiceform/design-tokens";

// 方式二：手动调用（仍然支持）
// import { initTokens } from '@choiceform/design-tokens'
// initTokens()

import App from "./app";

// 创建路由配置
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

// 验证 tokens.css 是否正确加载
console.log("✅ Tokens CSS 已导入 - 基础样式重置已应用");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
