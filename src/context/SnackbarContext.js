import { createContext, useState } from "react";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <SnackbarContext.Provider value={{ snackbarState, setSnackbarState }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
export default SnackbarContext;
