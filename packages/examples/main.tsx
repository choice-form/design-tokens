import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 导入基础重置样式
import "@choiceform/design-tokens/tokens.css";
import "@choiceform/design-tokens/preflight.css";

// 导入设计令牌
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
