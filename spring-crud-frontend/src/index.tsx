import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import green from "@mui/material/colors/green";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "http://localhost:8080";

const theme = createTheme({
  palette: {
    primary: { main: "#FF9800" },
    secondary: green,
    contrastThreshold: 2.15605749486653,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <App />
          </Router>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
