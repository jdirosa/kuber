import React from "react";
import { useAuth0 } from "../../auth/authHook";

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return <div>{JSON.stringify(user)}</div>;
  }
  return <div>home</div>;
};
