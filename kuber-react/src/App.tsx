import React from "react";
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
import { useAuth0 } from "./auth/authHook";
import ApolloClient, { PresetConfig } from "apollo-boost";
import { getEnvar } from "./utils/envars";
import { Envars } from "./constants";
import { ApolloProvider } from "@apollo/react-hooks";

const theme = createMuiTheme(defaultTheme);
const cnfg = (token: string) => {
  const config: PresetConfig = {
    uri: getEnvar(Envars.GqlClient),
    request: (operation: any) => {
      operation.setContext((context: Record<string, any>) => ({
        headers: {
          ...context.headers,
          authorization: token
        }
      }));
    }
  };
  return config;
};
const client = (token: any) => new ApolloClient(cnfg(token));
const App = () => {
  const auth = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopNav />
      <div style={{ padding: 20 }}>
        <RouterFixed>
          <Route path="/login/callback" component={AuthCallback} />
          <Route path={ROUTES.home} exact component={Home} />
          <Route
            path="/email"
            exact
            render={props =>
              renderWithAuth(
                <ApolloProvider client={client(auth.token)}>
                  <Emails />
                </ApolloProvider>,
                auth
              )
            }
          />
        </RouterFixed>
      </div>
    </ThemeProvider>
  );
};

const renderWithAuth = (component: JSX.Element, auth: any) => {
  if (!auth.isAuthenticated) {
    auth.loginWithRedirect({ appState: { targetUrl: "/email" } });
  }

  return component;
};

export default App;
