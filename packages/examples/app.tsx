import {
  color,
  spacing,
  radius,
  typographyStyles,
  zIndex,
} from "@choiceform/design-tokens";
import Choiceform from "@choiceform/icons-react/Choiceform";
import ThemeMoonDark from "@choiceform/icons-react/ThemeMoonDark";
import ThemeSunBright from "@choiceform/icons-react/ThemeSunBright";
import { styled } from "@linaria/react";
import React, { useMemo } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

// 导入页面

import { css } from "@linaria/core";
import { ThemeContext, useThemeContext } from "./context";
import { useTheme } from "./hooks";
// import AtomicPage from "./pages/atomic";
import BreakpointsPage from "./pages/breakpoints";
import ColorsPage from "./pages/colors";
import HomePage from "./pages/home";
import ShadowsPage from "./pages/shadow";
import SpacingPage from "./pages/spacing";
import TypographyPage from "./pages/typography";
import Github from "@choiceform/icons-react/Github";

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${color("background.default")};
  color: ${color("text.default")};
  ${typographyStyles("body.medium")};
`;

const Container = styled.div`
  max-width: ${spacing("2xl")};
  margin: 0 auto;
  padding: 0 ${spacing(8)};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${zIndex("sticky")};
  border-bottom: 1px solid ${color("border.default")};
  background-color: ${color("background.default")};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
  color: ${color("text.default")};
  text-decoration: none;
  ${typographyStyles("heading.medium")};

  &:hover {
    color: ${color("text.accent")};
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${spacing(2)};
  height: ${spacing(8)};
  padding: 0 ${spacing(2)};
  border-radius: ${radius("md")};
  justify-self: end;

  &:hover {
    background-color: ${color("background.secondary")};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing(2)};
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(2)};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing(2)};
  height: ${spacing(6)};
  padding: 0 ${spacing(2)};
  border-radius: ${radius("md")};
  text-decoration: none;
  cursor: default;

  &[data-active="true"] {
    background-color: ${color("background.accent", 0.1)};
    color: ${color("text.accent")};
  }

  &[data-active="false"]:hover {
    background-color: ${color("background.secondary")};
  }
`;

// 主题切换组件
const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const icon = useMemo(() => {
    if (theme === "dark") {
      return <ThemeMoonDark />;
    }
    if (theme === "light") {
      return <ThemeSunBright />;
    }
  }, [theme]);

  return (
    <Button onClick={toggleTheme}>
      {icon}
      <span>{theme.toUpperCase()}</span>
    </Button>
  );
};

// 导航组件
const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/colors", label: "Colors" },
    { path: "/spacing", label: "Spacing" },
    { path: "/shadows", label: "Shadows" },
    { path: "/breakpoints", label: "Breakpoints" },
    { path: "/typography", label: "Typography" },
    // { path: "/atomic", label: "Atomic" },
  ];

  return (
    <Nav>
      <NavList>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              data-active={location.pathname === item.path}
            >
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </NavList>
    </Nav>
  );
};

// 主应用组件
const App: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AppContainer>
        <Header>
          <Container
            className={css`
              display: grid;
              align-items: center;
              grid-template-columns: auto 1fr auto;
              place-items: center;
              gap: ${spacing(4)};
              height: ${spacing(16)};
            `}
          >
            <Logo to="/">
              <Choiceform width={32} height={32} />
              <span>@choiceform/design-tokens</span>
            </Logo>
            <Navigation />

            <RightContainer>
              <ThemeToggle />
              <Link
                to="https://github.com/choice-form/design-tokens"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Github />
                </Button>
              </Link>
            </RightContainer>
          </Container>
        </Header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/colors" element={<ColorsPage />} />
            <Route path="/spacing" element={<SpacingPage />} />
            <Route path="/shadows" element={<ShadowsPage />} />
            <Route path="/breakpoints" element={<BreakpointsPage />} />
            <Route path="/typography" element={<TypographyPage />} />
            {/* <Route path="/atomic" element={<AtomicPage />} /> */}
          </Routes>
        </main>
      </AppContainer>
    </ThemeContext.Provider>
  );
};

export default App;
