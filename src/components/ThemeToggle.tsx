import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useThemeContext } from "./ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
// interface ThemeToggleProps {}

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <ToggleButtonGroup
      value={themeMode}
      exclusive
      onChange={toggleTheme}
      aria-label="Theme mode toggle"
    >
      <ToggleButton value="light" aria-label="Light mode">
        <Brightness7Icon />
      </ToggleButton>
      <ToggleButton value="dark" aria-label="Dark mode">
        <Brightness4Icon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
