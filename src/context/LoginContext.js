import { createContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  // Login state
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== undefined);
  const [username, setUsername] = useState("");
  const [tipUtilizator, setTipUtilizator] = useState("");

  // Handle login action
  const handleLogin = (token, username, tipUtilizator) => {
    localStorage.setItem("token", token);
    setUsername(username);
    setTipUtilizator(tipUtilizator);
    setLoggedIn(true);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setTipUtilizator("");
    setLoggedIn(false);
  };
  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        username,
        setUsername,
        tipUtilizator,
        setTipUtilizator,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider };
export default LoginContext;
