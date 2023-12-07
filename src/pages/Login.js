//React
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//Context
import ColorModeContext from "../context/ColorModeContext";
import SnackbarContext from "../context/SnackbarContext";

//Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";

//Assets
import Logo from "../images/logo.svg";

//Axios
import axios from "axios";

export const Login = ({ onLogIn }) => {
  // API URL endpoint
  const API_URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT;
  console.log(API_URL_ENDPOINT);

  //Color mode
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);

  //Redirect
  const navigate = useNavigate();

  //Snackbar
  const { setSnackbarState } = useContext(SnackbarContext);

  //Show/Hide password
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //Loading
  const [loading, setLoading] = useState(false);

  //Login
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    axios
      .get(`${API_URL_ENDPOINT}/users?username=${username}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          const user = res.data[0];
          setLoading(false);
          onLogIn(user.token, user.username, user.tipUtilizator);
          navigate("/acasa");
          setSnackbarState({
            open: true,
            message: "Logarea s-a realizat cu succes",
            severity: "success",
          });
        } else {
          setLoading(false);
          setSnackbarState({
            open: true,
            message: "Invalid credentials.",
            severity: "error",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setSnackbarState({
          open: true,
          message: "Error during login.",
          severity: "error",
        });
      });
  };

  return (
    <Grid container item direction="row" xs>
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        xs={12}
        sm={7}
        sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
      >
        <div>
          <img src={Logo} alt="logo" style={{ marginTop: "2rem" }} />
          <Typography component="h1" variant="h4" color="white" marginTop="5rem" marginBottom="2rem">
            Aplicația de Întreţinere
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Conectare
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Utilizator"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parolă"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              loadingPosition="end"
              endIcon={
                loading === true ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <LoginIcon color="inherit" size={20} />
                )
              }
              sx={{ mt: 3 }}
            >
              Autentificare
            </LoadingButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.primary",
                p: 3,
                marginTop: "3rem",
              }}
            >
              <Brightness4Icon sx={{ marginRight: "1rem" }} />
              Modul întunecat
              <Switch
                checked={colorMode === "dark"}
                onChange={toggleColorMode}
                color="secondary"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};

//*********************************************************************************************************** */

// //React
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// //Context
// import ColorModeContext from "../context/ColorModeContext";
// import SnackbarContext from "../context/SnackbarContext";

// //Material UI
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Avatar from "@mui/material/Avatar";
// import Switch from "@mui/material/Switch";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import LoadingButton from "@mui/lab/LoadingButton";
// import CircularProgress from "@mui/material/CircularProgress";
// import LoginIcon from "@mui/icons-material/Login";

// //Assets
// import Logo from "../images/logo.svg";

// //Axios
// import axios from "axios";

// export const Login = ({ onLogIn }) => {
//   // API URL endpoint
//   const API_URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT;

//   //Color mode
//   const { colorMode, toggleColorMode } = useContext(ColorModeContext);

//   //Redirect
//   const navigate = useNavigate();

//   //Snackbar
//   const { setSnackbarState } = useContext(SnackbarContext);

//   //Show/Hide password
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   //Loading
//   const [loading, setLoading] = useState(false);

//   //Login
//   const handleSubmit = (event) => {
//     setLoading(true);
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     axios
//       .post(`${API_URL_ENDPOINT}/api/authenticate`, {
//         username: data.get("username"),
//         password: data.get("password"),
//       })
//       .then((res) => {
//         if (res.status === 200 && res.data.token && res.data.username && res.data.tipUtilizator) {
//           setLoading(false);
//           onLogIn(res.data.token, res.data.username, res.data.tipUtilizator);
//           navigate("/acasa");
//         } else {
//           setLoading(false);
//           console.error(res.data);
//           setSnackbarState({
//             open: true,
//             message: "Eroare la conectare.",
//             severity: "error",
//           });
//         }
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.error(err);
//         setSnackbarState({
//           open: true,
//           message: "Eroare la conectare.",
//           severity: "error",
//         });
//       });
//   };

//   return (
//     <Grid container item direction="row" xs>
//       <Grid
//         container
//         item
//         alignItems="center"
//         justifyContent="center"
//         xs={7}
//         sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
//       >
//         <div>
//           <img src={Logo} alt="logo" style={{ marginTop: "2rem" }} />
//           <Typography component="h1" variant="h4" color="white" marginTop="5rem" marginBottom="2rem">
//             Aplicația de Întreţinere
//           </Typography>
//         </div>
//       </Grid>
//       <Grid item xs={5} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             {" "}
//             Conectare{" "}
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="username"
//               label="Utilizator"
//               autoComplete="username"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Parolă"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleTogglePasswordVisibility} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <LoadingButton
//               type="submit"
//               fullWidth
//               variant="contained"
//               loading={loading}
//               loadingPosition="end"
//               endIcon={
//                 loading == true ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : (
//                   <LoginIcon color="inherit" size={20} />
//                 )
//               }
//               sx={{ mt: 3 }}
//             >
//               Autentificare
//             </LoadingButton>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "text.primary",
//                 p: 3,
//                 marginTop: "3rem",
//               }}
//             >
//               <Brightness4Icon sx={{ marginRight: "1rem" }} />
//               Modul întunecat
//               <Switch
//                 checked={colorMode === "dark"}
//                 onChange={toggleColorMode}
//                 color="secondary"
//                 inputProps={{ "aria-label": "controlled" }}
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// Login.propTypes = {
//   onLogIn: PropTypes.func.isRequired,
// };
