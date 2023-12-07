import { useState, createContext } from "react";
import { getDesign } from "../functions/theme";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { roRO } from "@mui/material/locale";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
  }
  const [colorMode, setColorMode] = useState(localStorage.getItem("theme"));
  const toggleColorMode = () => {
    setColorMode((previousColorMode) => {
      localStorage.setItem("theme", previousColorMode === "light" ? "dark" : "light");
      return previousColorMode === "light" ? "dark" : "light";
    });
  };
  const theme = createTheme(getDesign(colorMode), roRO);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ColorModeProvider };
export default ColorModeContext;
