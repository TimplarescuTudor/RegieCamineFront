// React
import React, { useState, useEffect, useContext } from "react";

// Context
import NavbarTitleContext from "../context/NavbarTitleContext";
import SnackbarContext from "../context/SnackbarContext";

// Material UI
import { Grid, Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";

// Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Axios
import axios from "axios";

// Components
import { CustomTextField } from "../components/CustomTextField";

// Functions
import { formatDate } from "../functions/formatDate";

// Chart
ChartJS.register(ArcElement, Tooltip, Legend);

export const Acasa = () => {
  // API URL endpoint
  const API_URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT;

  // First mount state&logic to prevent the Snackbar from appearing on the first mount
  const [isFirstMount, setIsFirstMount] = useState(true);
  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  // Navbar title
  const { setNavbarTitle } = useContext(NavbarTitleContext);
  useEffect(() => {
    setNavbarTitle("Acasă");
  }, [setNavbarTitle]);

  // Snackbar
  const { setSnackbarState } = useContext(SnackbarContext);

  // Invoices
  const [situationBuildings, setSituationBuildings] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    perioada: new Date().toISOString().substring(0, 7),
  });

  // Handle Perioada change
  const handleInputChange = (event) => {
    setSelectedDate({
      perioada: event.target.value,
    });
  };

  // Invoices Chart
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${API_URL_ENDPOINT}/api/facturi/cladiri/grupat/${selectedDate.perioada.split("-")[1]}/${
          selectedDate.perioada.split("-")[0]
        }`
      )
      .then((res) => {
        setChartData(res.data);
      })
      .catch(() => {
        setChartData({});
      });
  }, [selectedDate]);

  // Situation Buildings
  useEffect(() => {
    axios
      .get(
        `${API_URL_ENDPOINT}/api/situatie/cladiri/${selectedDate.perioada.split("-")[1]}/${
          selectedDate.perioada.split("-")[0]
        }`
      )
      .then((res) => {
        setSituationBuildings(res.data);
      })
      .catch(() => {
        setSituationBuildings([]);
        if (!isFirstMount) {
          setSnackbarState({
            open: true,
            message: `Nu a fost calculata regia pentru cladiri pe luna ${formatDate(selectedDate.perioada)}!`,
            severity: "warning",
          });
        }
      });
  }, [selectedDate]);

  const columnsTable = [
    { field: "id", headerName: "Nr. crt.", flex: 0.5 },
    { field: "nume", headerName: "Nume cladire", flex: 1 },
    { field: "numarPersoane", headerName: "Total persoane cazate", flex: 1 },
    { field: "numarCamere", headerName: "Total camere ocupate", flex: 1 },
    {
      field: "regie1p",
      headerName: (
        <Grid container alignItems="center">
          {"Regie netă - 1 pers"}
          <PersonIcon color="primary" sx={{ marginLeft: "5px" }} />
        </Grid>
      ),
      flex: 1.2,
    },
    {
      field: "regie2p",
      headerName: (
        <Grid container alignItems="center">
          {"Regie netă - 2 pers"}
          <PersonIcon color="primary" style={{ marginLeft: "5px" }} />
        </Grid>
      ),
      flex: 1.2,
    },
    {
      field: "regie3p",
      headerName: (
        <Grid container alignItems="center">
          {"Regie netă - 3 pers"}
          <PersonIcon color="primary" style={{ marginLeft: "5px" }} />
        </Grid>
      ),
      flex: 1.2,
    },
  ];

  return (
    <Grid container item direction="column" justifyContent="center" alignItems="center" sx={{ mt: 2, p: 4 }}>
      <Box alignItems="center" display="flex" margin={3}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Perioada:
        </Typography>
        <CustomTextField
          id="perioada"
          type="month"
          variant="outlined"
          value={selectedDate.perioada}
          InputLabelProps={{ shrink: true }}
          onChange={handleInputChange}
        />
      </Box>

      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Facturile pe luna <b>{formatDate(selectedDate.perioada)}</b>
      </Typography>

      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ width: 1200 }}
      >
        {chartData.length > 0 &&
          chartData.map((cladire, index) => {
            const totalCheltuieli =
              cladire.electricitate +
              cladire.gaze +
              cladire.apa +
              cladire.termoficare +
              cladire.alteCheltuieli;

            return (
              <Grid item xs={4} key={index}>
                <Paper elevation={3} sx={{ my: 2 }}>
                  <Grid container item direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="h6" sx={{ my: 2 }} align="center">
                      {cladire.cladire}
                    </Typography>
                    <Grid container sx={{ width: "70%", my: 2 }}>
                      <Doughnut
                        data={{
                          labels: ["Electricitate", "Gaze", "Apă", "Termoficare", "Alte cheltuieli"],
                          datasets: [
                            {
                              label: "Total",
                              backgroundColor: ["#FF6384", "#FFCD56", "#36A2EB", "#FF9F40", "#4BC0C0"],
                              borderWidth: 0,
                              data: [
                                cladire.electricitate,
                                cladire.gaze,
                                cladire.apa,
                                cladire.termoficare,
                                cladire.alteCheltuieli,
                              ],
                            },
                          ],
                        }}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </Grid>
                    {totalCheltuieli === 0 ? (
                      <Typography variant="body1" sx={{ mt: 4, mb: 2 }} align="center">
                        Nu există date
                      </Typography>
                    ) : (
                      <Typography variant="body1" sx={{ mt: 4, mb: 2 }} align="center">
                        Total cheltuieli: <b>{totalCheltuieli.toFixed(2)} lei</b>
                      </Typography>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
      </Grid>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        {["Electricitate", "Gaze", "Apă", "Termoficare", "Alte cheltuieli"].map((label, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                marginRight: "5px",
                backgroundColor: ["#FF6384", "#FFCD56", "#36A2EB", "#FF9F40", "#4BC0C0"][index],
              }}
            ></span>
            {label}
          </div>
        ))}
      </div>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        Situaţia clădirilor
      </Typography>

      <DataGrid rows={situationBuildings} columns={columnsTable} pageSize={5} style={{ width: 1300 }} />
    </Grid>
  );
};

//--------------------------------------------------------------------------------------------------------------
// import React, { useContext, useEffect } from "react";
// import NavbarTitleContext from "../context/NavbarTitleContext";
// import { Box, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Acasa = () => {
//   const navigate = useNavigate();

//   const { setNavbarTitle } = useContext(NavbarTitleContext);
//   useEffect(() => {
//     setNavbarTitle("Acasa");
//   }, [setNavbarTitle]);

//   return (
//     <div>
//       <Box>Acasa</Box>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => {
//           navigate("/");
//         }}
//       >
//         Go to Login
//       </Button>
//     </div>
//   );
// };

//export default Acasa;
