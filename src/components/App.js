import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router, Route } from "react-router-dom";

import green from "@material-ui/core/colors/green";
import history from "../history";

import MainContainer from "../containers/MainContainer";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

function App(props) {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Route exact path="/" component={MainContainer} />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
