import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#121212",
    },
  },
  shape: { borderRadius: 12 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);