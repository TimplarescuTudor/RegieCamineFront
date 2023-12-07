import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeProvider } from "./context/ColorModeContext";
import { NavbarTitleProvider } from "./context/NavbarTitleContext";
import { LoginProvider } from "./context/LoginContext";
import { SnackbarProvider } from "./context/SnackbarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <NavbarTitleProvider>
        <LoginProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </LoginProvider>
      </NavbarTitleProvider>
    </ColorModeProvider>
  </React.StrictMode>
);
