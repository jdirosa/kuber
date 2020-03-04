import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../auth/authHook";
import ApolloClient, { PresetConfig } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { getEnvar } from "../utils/envars";
import { Envars } from "../constants";

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

const PrivateRoute = ({ component: Component, path, ...rest }: any) => {
  const { loading, isAuthenticated, loginWithRedirect, token } = useAuth0()!;

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  });

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : <div>No auth</div>;

  return (
    <ApolloProvider client={client(token)}>
      <Route path={path} render={render} {...rest} />
    </ApolloProvider>
  );
};

export default PrivateRoute;
