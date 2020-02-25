import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ISentEmail } from "../../models/Email";
import {
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableBody,
  Checkbox
} from "@material-ui/core";
import { getDisplayDate } from "./utils";

interface IProps {
  onEmailSelected: (email: ISentEmail) => void;
}
export const SentEmailList: React.FC<IProps> = ({ onEmailSelected }) => {
  // TODO: Refactor out
  const query = gql`
    {
      sentEmails {
        id
        date
        subject
        to
      }
    }
  `;
  const { loading, data } = useQuery<{ sentEmails: ISentEmail[] }>(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return null;
  }

  const handleRowClick = (email: ISentEmail) => (e: React.MouseEvent<any>) => {
    // onEmailSelected(email);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{""}</TableCell>
            <TableCell>From</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sentEmails.map((email, idx) => (
            <TableRow
              onClick={handleRowClick(email)}
              hover
              key={idx}
              style={{ cursor: "pointer" }}
            >
              <TableCell component="th" scope="row">
                <Checkbox checked={false} />
              </TableCell>
              <TableCell component="th" scope="row">
                {email.to}
              </TableCell>
              <TableCell align="left">{email.subject}</TableCell>
              <TableCell align="left">{getDisplayDate(email.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
