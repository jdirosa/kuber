import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { IEmail } from "./models/Email";

export const EmailDemo: React.FC = () => {
  const query = gql`
    {
      emails {
        id
        from
        date
        body
      }
    }
  `;
  const { loading, error, data } = useQuery<{ emails: IEmail[] }>(query);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {data && data.emails
        ? data.emails.map(d => {
            return (
              <React.Fragment>
                <div>
                  <strong>From: </strong> {d.from}
                </div>
                <div>
                  <strong>Subject: </strong> {d.subject}
                </div>
                <div>
                  <strong>Body: </strong> <p>{d.body}</p>
                </div>
              </React.Fragment>
            );
          })
        : JSON.stringify(data, null, 2)}
    </React.Fragment>
  );
};
