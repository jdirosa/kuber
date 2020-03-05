import React from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
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
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
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
      <div style={{ width: "100%" }}>
        <div style={{ paddingTop: 20, maxWidth: 1200, margin: "0 auto" }}>
          <Router history={history}>
            <RouterFixed>
              <Switch>
                <Route path="/login/callback" exact component={AuthCallback} />
                <Route path={ROUTES.home} exact component={Home} />
                <Route
                  path="/email"
                  exact
                  render={props => (
                    <ApolloProvider client={client(auth.token)}>
                      <AuthWrapper auth={auth}>
                        <Emails />
                      </AuthWrapper>
                    </ApolloProvider>
                  )}
                />
              </Switch>
            </RouterFixed>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

interface IAuthWrapProps {
  auth: any;
}
const AuthWrapper: React.FunctionComponent<IAuthWrapProps> = ({
  auth,
  children
}): React.ReactElement => {
  if (auth.loading || auth.isAuthenticated === undefined) {
    return <div>Checking Auth...</div>;
  }
  if (!auth.isAuthenticated && !auth.loading) {
    console.log("Login required");
    auth.getTokenSilently().then((r: any) => console.log(JSON.stringify(r)));
    auth.loginWithRedirect({});
  }

  return <div>{children}</div>;
};

export default App;
