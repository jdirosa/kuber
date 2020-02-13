import React from "react";
import { useAuth0 } from "../../auth/authHook";
import * as qs from "query-string";

/** This endpoint is just a info auth endpoint. Regular users will not see this. */
export const AuthCallback: React.FunctionComponent = ({
  location,
  history
}: any) => {
  const auth = useAuth0();
  if (!auth.user) {
    return null;
  }

  // Check if there is a return url (there always should be)
  if (location) {
    const parsed = qs.parse(location.search);

    // make sure it has the return url and that the return url is not somehow this route (infinite loop)
    if (
      parsed &&
      parsed.retUrl &&
      parsed.retUrl.toString().indexOf("login/callback") === -1
    ) {
      history.push(parsed.retUrl);
    }
  }
  return (
    <div>
      <img src={auth.user.picture} style={{ width: 120, marginBottom: 30 }} />
      <div>
        <p>Here's what we know about you</p>
        {Object.keys(auth.user).map((key, i) => (
          <div key={i}>
            <strong>{parseCustomClaim(key)}</strong>:{" "}
            {auth.user[key].toString()}
          </div>
        ))}
      </div>
    </div>
  );
};

function parseCustomClaim(key: string) {
  if (key.indexOf("https://d2cov4w5ev8qbr.cloudfront.net/") >= 0) {
    return key.replace("https://d2cov4w5ev8qbr.cloudfront.net/claims/", "");
  }
  return key;
}
