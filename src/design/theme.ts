import { createTheme } from "@mui/material/styles";

const primary = {
  dark: "#005894",
  main: "#0073c6",
  light: "#3391d4",
};

const secondary = {
  dark: "#cc5f39",
  main: "#ff7847", 
  light: "#ff956f",
};

export const Colors = {
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#f2f2f2", 
  darkGray: "#4A4A4A",
  accent: "#7fc241",
  success: "#03BB50",
  error: "#D9534F",
  textPrimary: "#212121",
  textSecondary: "#494747",
  primary,
  secondary,
};

const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      color: Colors.primary.dark,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.75rem", 
      color: Colors.secondary.main,
    },
    body1: {
      fontSize: "1rem",
      color: Colors.textPrimary,
    },
    body2: {
      fontSize: "0.875rem",
      color: Colors.textSecondary,
    },
  },
});

export default theme;
