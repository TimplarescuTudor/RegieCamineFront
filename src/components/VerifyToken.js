import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const VerifyToken = ({ loggedIn, handleLogout, setUsername, setTipUtilizator }) => {
  const API_URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT;
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${API_URL_ENDPOINT}/users?token=${token}`);

          if (response.data.length > 0) {
            const user = response.data[0]; // Assuming the token uniquely identifies the user
            setUsername(user.username);
            setTipUtilizator(user.tipUtilizator);
          } else {
            // Handle case where no user is found with the token
            throw new Error("No user found with the given token");
          }
        } catch (error) {
          console.error("Verification error:", error);
          handleLogout();
          navigate("/");
        }
      };

      verifyToken();

      // Set an interval for token verification (optional)
      const interval = setInterval(verifyToken, 50000);
      return () => clearInterval(interval);
    }
  }, [loggedIn, navigate, handleLogout, setUsername, setTipUtilizator]);

  return null;
};

//********************************************************************************************** */

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const VerifyToken = ({ loggedIn, handleLogout, setUsername, setTipUtilizator }) => {
//   const API_URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loggedIn) {
//       const verifyToken = async () => {
//         try {
//           const response = await axios.post(`${API_URL_ENDPOINT}/api/verify`, {
//             token: localStorage.getItem("token"),
//           });

//           // Assuming successful response updates user info
//           setUsername(response.data.username);
//           setTipUtilizator(response.data.tipUtilizator);
//         } catch (error) {
//           // Error handling, including 401 Unauthorized
//           if (error.response && error.response.status === 401) {
//             // Specific handling for unauthorized
//           }
//           handleLogout();
//           navigate("/");
//         }
//       };

//       verifyToken();

//       const interval = setInterval(verifyToken, 50000);

//       return () => clearInterval(interval);
//     }
//   }, [loggedIn, navigate, handleLogout, setUsername, setTipUtilizator]);

//   return null;
// };
