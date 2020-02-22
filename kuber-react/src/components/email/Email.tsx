import React from "react";
import { Wizzy } from "../wysiwyg";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_EMAIL_HTML } from "./gql";

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
  } else {
    console.log(JSON.stringify(data));
  }
  return <Wizzy html={data.GetEmailHTML.bodyHtml} />;
};
