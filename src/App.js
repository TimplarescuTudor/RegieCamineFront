//React
import { useState, useContext, useEffect } from "react";

//React Router
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

//Material UI
import { Grid } from "@mui/material";

//Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Components
import { SnackbarComponent } from "./components/SnackbarComponent";
import { Navbar } from "./components/Navbar";
import { VerifyToken } from "./components/VerifyToken";

//Pages
import { Login } from "./pages/Login";
import { Acasa } from "./pages/Acasa";

//Context
import ColorModeContext from "./context/ColorModeContext";
import NavbarTitleContext from "./context/NavbarTitleContext";
import LoginContext from "./context/LoginContext";

// Axios
import axios from "axios";

function App() {
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

  const { navbarTitle } = useContext(NavbarTitleContext);
  const { loggedIn, handleLogin, handleLogout, setUsername, username, setTipUtilizator, tipUtilizator } =
    useContext(LoginContext);

  return (
    <Router>
      <VerifyToken
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        setUsername={setUsername}
        setTipUtilizator={setTipUtilizator}
      />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ height: "100vh", overflow: "auto" }}
      >
        {loggedIn && (
          <Navbar
            title={navbarTitle}
            onLogout={handleLogout}
            username={username}
            tipUtilizator={tipUtilizator}
          />
        )}
        <Grid
          item
          container
          overflow="auto"
          sx={{ height: loggedIn ? "calc(100% - 64px)" : "100%", py: loggedIn ? 4 : 0, px: loggedIn ? 8 : 0 }}
        >
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/acasa" /> : <Navigate to="/login" />} />
            {!loggedIn && <Route path="/login" element={<Login onLogIn={handleLogin} />} />}
            {loggedIn && <Route path="/acasa" element={<Acasa />} />}
            {/* <Route path="/acasa" element={<Acasa />} /> */}
          </Routes>
        </Grid>
        <SnackbarComponent />
      </Grid>
    </Router>
  );
}

export default App;
