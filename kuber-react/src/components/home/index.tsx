import React from "react";
import { useAuth0 } from "../../auth/authHook";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        {JSON.stringify(user)}
        <div>
          {" "}
          <Link to="/email">Email</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      home
      <Link to="/email">Email</Link>
    </div>
  );
};
