import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";
import { Route } from "react-router-dom";
import { RouterFixed } from "./routes/routerFix";
import { ROUTES } from "./routes";
import { AuthCallback } from "./components/auth/authCallback";
import { defaultTheme } from "./styles/theme";
import { TopNav } from "./components/layout";
import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";
import { Home } from "./components/home";
import { Emails } from "./components/email";
import PrivateRoute from "./routes/privateRoute";

const client = new ApolloClient({
  uri: "http://localhost:32000"
});
const theme = createMuiTheme(defaultTheme);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <TopNav />
        <div style={{ padding: 20 }}>
          <RouterFixed>
            <Route path="/login/callback" component={AuthCallback} />
            <Route path={ROUTES.home} exact component={Home} />
            <PrivateRoute path={"/email"} exact component={Emails} />
          </RouterFixed>
        </div>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
