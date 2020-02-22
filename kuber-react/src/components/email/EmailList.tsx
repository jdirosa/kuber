import React from "react";
import { useQuery } from "@apollo/react-hooks";
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

interface IProps {
  onEmailSelected: (email: IEmail) => void;
}
export const EmailList: React.FC<IProps> = ({ onEmailSelected }) => {
  // TODO: Refactor out
  const query = gql`
    {
      emails {
        id
        from
        date
        subject
        read
      }
    }
  `;
  const { loading, data } = useQuery<{ emails: IEmail[] }>(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return null;
  }

  const handleRowClick = (email: IEmail) => (e: React.MouseEvent<any>) => {
    onEmailSelected(email);
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
          {data.emails.map((email, idx) => (
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
                {email.from}
              </TableCell>
              <TableCell align="left">{email.subject}</TableCell>
              <TableCell align="left">{getDate(email.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const getDate = (date: any) => {
  const d = new Date(date);
  if (d.getDay() === new Date().getDay()) {
    const time = d.toLocaleTimeString();
    return (
      time.substr(0, time.lastIndexOf(":")) +
      time.substr(time.lastIndexOf(":") + 3) // This is not world safe
    );
  }
  return d.toLocaleDateString();
};
