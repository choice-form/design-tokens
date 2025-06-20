import { color } from "@choiceform/design-tokens/helpers";
import { css } from "@linaria/core";
import { memo } from "react";
import { Section } from "..";

export const SectionAtomicAdvantages = memo(function SectionAtomicAdvantages() {
  return (
    <Section
      title="System Advantages"
      content={
        <p>
          Our atomic styling system revolutionizes the traditional approach to
          CSS by providing unprecedented flexibility, type safety, and
          performance benefits while maintaining semantic clarity and developer
          experience.
        </p>
      }
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        `}
      >
        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-accent")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            🚀 Zero Runtime
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            Built with Linaria, all atomic styles are generated at compile time,
            resulting in zero JavaScript runtime overhead and optimal
            performance.
          </p>
        </div>

        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-success")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            🔒 Type Safety
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            Full TypeScript support with intelligent autocomplete and
            compile-time error checking ensures your styling code is always
            correct.
          </p>
        </div>

        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-warning")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            🎨 Unlimited Creativity
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            Break free from traditional color constraints. Use any color from
            any palette for any CSS property with complete semantic flexibility.
          </p>
        </div>

        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-component")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            🧩 Composable Design
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            Each atomic class is independent and composable, enabling rapid
            prototyping and consistent styling across your entire application.
          </p>
        </div>

        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-assistive")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            📏 Consistent Scale
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            Built on a 4px spacing scale with numeric multipliers and semantic
            aliases, ensuring perfect alignment and visual consistency.
          </p>
        </div>

        <div
          className={css`
            padding: 20px;
            border-radius: 8px;
            background: ${color("bg-inverse")};
            color: white;
          `}
        >
          <h3
            className={css`
              margin: 0 0 12px 0;
              font-size: 18px;
              font-weight: 600;
            `}
          >
            🌙 Theme Ready
          </h3>
          <p
            className={css`
              margin: 0;
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
            `}
          >
            All atomic styles automatically adapt to light and dark themes,
            maintaining design consistency across different visual contexts.
          </p>
        </div>
      </div>
    </Section>
  );
});

SectionAtomicAdvantages.displayName = "SectionAtomicAdvantages";
