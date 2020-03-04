import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { SEND_EMAIL } from "./gql";
import { ISendEmail } from "./gql/models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "#5d5d5d",
      color: "#fefefe",
      width: "100%",
      padding: 10
    },
    body: {
      paddingLeft: 14,
      paddingRight: 14
    },
    buttonRow: {
      "& > *": {
        margin: theme.spacing(1)
      },
      padding: "10px 8px",
      textAlign: "right"
    },
    inputRow: {
      "& > *": {
        marginTop: theme.spacing(1.5)
      }
    }
  })
);

interface IProps {
  onClose: () => void;
}
export const ComposeEmail: React.FC<IProps> = ({ onClose }) => {
  const [to, setTo] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [html, setHtml] = React.useState("");
  const [sendEmail, { data, error, loading }] = useMutation(SEND_EMAIL);
  const handleToUpdated = (e: React.ChangeEvent<any>) => {
    setTo(e.target.value);
  };
  const handleSubjectUpdated = (e: React.ChangeEvent<any>) => {
    setSubject(e.target.value);
  };
  const handleHtmlUpdated = (e: React.ChangeEvent<any>) => {
    setHtml(e.target.value);
  };
  const handleSendEmail = async () => {
    const email: ISendEmail = {
      subject,
      to: [to],
      userId: "1",
      html: html,
      text: ""
    };
    const result = await sendEmail({ variables: { data: { ...email } } });

    handleClose();
  };
  const handleClose = () => {
    setTo("");
    setSubject("");
    setHtml("");
    onClose();
  };
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.header}>
        <Typography variant="h5">Send Email</Typography>
      </div>
      {/* Body */}
      <div className={classes.body}>
        <div className={classes.inputRow}>
          <TextField onChange={handleToUpdated} fullWidth label="To" />
          <TextField
            onChange={handleSubjectUpdated}
            fullWidth
            label="Subject"
          />
          <TextField
            disabled={loading}
            onChange={handleHtmlUpdated}
            fullWidth
            multiline
            rows={10}
          />
        </div>
      </div>
      <div className={classes.buttonRow}>
        <Button disabled={loading} onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleSendEmail()}
          color="primary"
          variant="contained"
          startIcon={<Send />}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};
