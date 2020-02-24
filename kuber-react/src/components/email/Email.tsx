import React from "react";
import { Wizzy } from "../wysiwyg";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_EMAIL_HTML, SEND_EMAIL } from "./gql";
import { Paper, Typography } from "@material-ui/core";

interface IProps {
  emailId: string;
}
export const Email: React.FC<IProps> = ({ emailId }) => {
  const { data, loading } = useQuery(GET_EMAIL_HTML, {
    variables: { data: emailId }
  });

  React.useEffect(() => {
    console.log("getting: " + emailId);
  }, []);
  if (loading) {
    return <div>Reading Email...</div>;
  }
  if (!data) {
    return <div>Bad Request</div>;
  }
  const email = data.GetEmailHTML;
  return (
    <Paper>
      <div style={{ padding: 20 }}>
        <div style={{ margin: "10px 0" }}>
          <Typography variant="h6">{email.subject}</Typography>
        </div>
        <Typography variant="body2" style={{ marginTop: 10 }}>
          {email.from.name ? <strong>{email.from.name} </strong> : null}
          {`<${email.from.address}>`}
        </Typography>
        <Wizzy html={email.bodyHtml} />
      </div>
    </Paper>
  );
};
