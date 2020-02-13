import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";
import { BooksDemo } from "./BooksDemo";
import { Route } from "react-router-dom";
import { RouterFixed } from "./routes/routerFix";
import { ROUTES } from "./routes";
import { Login } from "./components/login";
import { AuthCallback } from "./components/auth/authCallback";
import { useAuth0 } from "./auth/authHook";
import PrivateRoute from "./routes/privateRoute";

const client = new ApolloClient({
  uri: "http://localhost:32000"
});
const App = () => {
  const auth = useAuth0();
  return (
    <ApolloProvider client={client}>
      <RouterFixed>
        <Route path={ROUTES.login} exact component={Login} />
        <Route path="/login/callback" component={AuthCallback} />
        <PrivateRoute path={ROUTES.home} exact component={BooksDemo} />
      </RouterFixed>
    </ApolloProvider>
  );
};

const renderWithAuth = (component: JSX.Element, auth: any) => {
  if (!auth.isAuthenticated) {
    auth.loginWithRedirect({});
  }
  return component;
};
export default App;
