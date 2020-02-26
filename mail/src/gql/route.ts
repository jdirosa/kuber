export const gqlHost = () =>
  `http://${process.env.KUBER_GQL_SERVICE_HOST}:${process.env.KUBER_GQL_SERVICE_PORT}`;
