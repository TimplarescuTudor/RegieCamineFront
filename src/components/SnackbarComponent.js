import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import  SnackbarContext  from "../context/SnackbarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarComponent = () => {
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext);
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={() => setSnackbarState({ ...snackbarState, open: false })}
    >
      <Alert
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};
