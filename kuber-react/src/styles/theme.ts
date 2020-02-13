import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { COLORS } from "../components/ui/constants";

export const defaultTheme: ThemeOptions = {
  palette: {
    common: { black: "rgba(127, 204, 27, 1)", white: "#fff" },
    background: { paper: "#fff", default: "#FAFAFA" },
    primary: {
      light: COLORS.PRIMARY_LIGHT,
      main: COLORS.PRIMARY,
      dark: COLORS.PRIMARY_DARK,
      contrastText: COLORS.WHITE
    },
    secondary: {
      light: COLORS.SECONDARY_LIGHT,
      main: COLORS.SECONDARY,
      dark: COLORS.SECONDARY_DARK,
      contrastText: COLORS.WHITE
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#eceff1"
    },
    text: {
      primary: "rgba(20, 43, 76, 1)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    subtitle1: {
      fontSize: 28,
      color: "rgba(20, 43, 76, .35)",
      lineHeight: "32px"
    },
    subtitle2: {
      fontSize: 28,
      color: "rgba(0,0,0,.0.87)",
      lineHeight: "46px"
    },
    body1: {
      color: "rgba(20, 43, 76,.8)",
      fontWeight: 100,
      fontSize: 22,
      lineHeight: "36px"
    },
    h1: {
      fontWeight: 100,
      fontSize: "5.5em",
      lineHeight: "90px"
    },
    h2: {
      fontSize: "3.5em",
      fontWeight: 100
    },
    h3: {
      fontWeight: 100
    }
  }
};
