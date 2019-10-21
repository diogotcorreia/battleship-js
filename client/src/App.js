import React from "react";
import Board from "./Board/Board";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#039be5" },
    secondary: { main: "#d32f2f" }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Board size={10} />
    </ThemeProvider>
  );
};

export default App;
