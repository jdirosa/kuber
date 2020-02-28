import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { IEmail } from "../../models/Email";
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
import { DELETE_EMAIL } from "./gql";

interface IProps {
  onEmailSelected: (email: IEmail) => void;
  onEmailChecked: (email: IEmail) => void;
  selectedEmails: string[];
  emails?: IEmail[];
}
export const EmailList: React.FC<IProps> = ({
  onEmailSelected,
  selectedEmails,
  onEmailChecked,
  emails
}) => {
  if (!emails) {
    return <div>Loading...</div>;
  }
  if (!emails.length) {
    return null;
  }

  const handleRowClick = (email: IEmail) => (e: React.MouseEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
    onEmailSelected(email);
  };
  const handleCheck = (email: IEmail) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onEmailChecked(email);
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
          {emails.map((email, idx) => (
            <TableRow
              onClick={handleRowClick(email)}
              hover
              key={idx}
              style={{ cursor: "pointer" }}
            >
              <TableCell component="th" scope="row">
                <Checkbox
                  checked={selectedEmails.some(e => e === email.id)}
                  onClick={handleCheck(email)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {email.from}
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
