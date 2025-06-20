import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import js from "@terrazzo/plugin-js";
import tailwind from "@terrazzo/plugin-tailwind";
import vanillaExtract from "@terrazzo/plugin-vanilla-extract";

export default defineConfig({
  // 输入：W3C Design Tokens 文件
  tokens: [
    "./output/colors-w3c.json",
    "./output/typography-atomic-w3c.json", // 只包含原子类型，不包含复合类型
    "./output/spacing-w3c.json",
    "./output/radius-w3c.json",
    "./output/zindex-w3c.json",
    "./output/breakpoints-w3c.json",
    "./output/shadows-w3c.json",
  ],

  // 输出配置
  outDir: "./dist",

  plugins: [
    css({
      filename: "tokens.css",
      variableName: (token) => {
        // token是一个对象，需要访问其id属性
        const tokenId = token.id || String(token);

        // 特殊处理：spacing.default 应该生成 --cdt-spacing
        if (tokenId === "spacing.default") {
          return "--cdt-spacing";
        }

        return `--cdt-${tokenId.replace(/\./g, "-")}`;
      },
      // 过滤器：跳过复合类型，只导出原子类型到 CSS 变量
      filter: (token) => {
        // 现在 typography 复合类型已经分离到单独文件，只需要跳过其他复合类型
        const skipTypes = [
          "typography",
          "border",
          "transition",
          "gradient",
          "strokeStyle",
        ];
        return !skipTypes.includes(token.$type);
      },
      baseSelector: ":root",
      modeSelectors: [
        { mode: "dark", selectors: [".dark", '[data-theme="dark"]'] },
      ],
      // 自定义颜色转换为RGB组件格式
      transform(token, mode) {
        // 处理直接颜色值
        if (
          token.$type === "color" &&
          token.$value &&
          token.$value.colorSpace === "srgb"
        ) {
          // 检查原始值是否包含引用（如 "{color.blue.500}"）
          const originalValue = token.originalValue?.$value;
          if (
            typeof originalValue === "string" &&
            originalValue.includes("{")
          ) {
            // 这是引用，使用默认转换
            return undefined;
          }

          const [r, g, b] = token.$value.components;
          const red = Math.round(r * 255);
          const green = Math.round(g * 255);
          const blue = Math.round(b * 255);
          return `${red}, ${green}, ${blue}`;
        }

        // 手动处理shadows的模式切换，因为Terrazzo 0.8.1对$extensions.mode支持有限
        if (
          token.$type === "shadow" &&
          mode === "dark" &&
          token.$extensions?.mode?.dark
        ) {
          // 在深色模式下，使用dark模式的shadow值
          const darkShadowValue = token.$extensions.mode.dark;
          if (Array.isArray(darkShadowValue)) {
            const shadowValues = darkShadowValue.map((shadow) => {
              let shadowStr = "";

              // 处理inset
              if (shadow.inset) {
                shadowStr += "inset ";
              }

              // 处理偏移量
              shadowStr += `${shadow.offsetX.value}${shadow.offsetX.unit} `;
              shadowStr += `${shadow.offsetY.value}${shadow.offsetY.unit} `;

              // 处理模糊
              if (shadow.blur) {
                shadowStr += `${shadow.blur.value}${shadow.blur.unit} `;
              }

              // 处理扩散
              if (shadow.spread) {
                shadowStr += `${shadow.spread.value}${shadow.spread.unit} `;
              }

              // 处理颜色 - 转换为rgb格式
              if (shadow.color && shadow.color.colorSpace === "srgb") {
                const [r, g, b] = shadow.color.components;
                const red = Math.round(r * 255);
                const green = Math.round(g * 255);
                const blue = Math.round(b * 255);
                const alpha = shadow.color.alpha;

                if (alpha !== undefined && alpha < 1) {
                  shadowStr += `rgb(${red} ${green} ${blue} / ${alpha})`;
                } else {
                  shadowStr += `rgb(${red}, ${green}, ${blue})`;
                }
              }

              return shadowStr;
            });

            return shadowValues.join(", ");
          }
        }

        // 处理shadow类型，转换其中的颜色格式
        if (token.$type === "shadow" && Array.isArray(token.$value)) {
          const shadowValues = token.$value.map((shadow) => {
            let shadowStr = "";

            // 处理inset
            if (shadow.inset) {
              shadowStr += "inset ";
            }

            // 处理偏移量
            shadowStr += `${shadow.offsetX.value}${shadow.offsetX.unit} `;
            shadowStr += `${shadow.offsetY.value}${shadow.offsetY.unit} `;

            // 处理模糊
            if (shadow.blur) {
              shadowStr += `${shadow.blur.value}${shadow.blur.unit} `;
            }

            // 处理扩散
            if (shadow.spread) {
              shadowStr += `${shadow.spread.value}${shadow.spread.unit} `;
            }

            // 处理颜色 - 转换为rgb格式
            if (shadow.color && shadow.color.colorSpace === "srgb") {
              const [r, g, b] = shadow.color.components;
              const red = Math.round(r * 255);
              const green = Math.round(g * 255);
              const blue = Math.round(b * 255);
              const alpha = shadow.color.alpha;

              if (alpha !== undefined && alpha < 1) {
                shadowStr += `rgb(${red} ${green} ${blue} / ${alpha})`;
              } else {
                shadowStr += `rgb(${red}, ${green}, ${blue})`;
              }
            }

            return shadowStr;
          });

          return shadowValues.join(", ");
        }

        return undefined;
      },
    }),
    sass({
      filename: "tokens.scss",
    }),
    js({
      js: "tokens.js",
      ts: "tokens.d.ts",
      json: "tokens.json", // set to a filename to generate JSON
    }),
    // tailwind({
    //   filename: "tailwind.js",

    //   theme: {
    //     /** @see https://tailwindcss.com/docs/configuration#theme */
    //     colors: ["color.*"],
    //     font: {
    //       sans: "typography.family.base",
    //     },
    //     spacing: ["spacing.*"],
    //     radius: ["borderRadius.*"],
    //   },
    // }),
    // vanillaExtract({
    //   filename: "themes.css.ts",
    //   // Use global CSS vars (recommended). Your Vanilla Extract CSS is still scoped.
    //   globalThemeContract: true,

    //   // Option 1: scoped themes
    //   themes: {
    //     light: { mode: [".", "light"] },
    //     dark: { mode: [".", "dark"] },
    //   },

    //   // Option 2: global themes (in case you have code outside Vanilla Extract)
    //   globalThemes: {
    //     globalLight: {
    //       selector: "[data-color-mode=light]",
    //       mode: [".", "light"],
    //     },
    //     globalDark: { selector: "[data-color-mode=dark]", mode: [".", "dark"] },
    //   },
    // }),
  ],
});
