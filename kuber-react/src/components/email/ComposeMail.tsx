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

export const ComposeEmail: React.FC = () => {
  const [sendEmail, { data, error }] = useMutation(SEND_EMAIL);
  const handleSendEmail = async () => {
    const fakeEmail: ISendEmail = {
      subject: "React Email",
      to: ["jdirosa@gmail.com"],
      userId: "1",
      html: "<strong>React</strong> message",
      text: "the text"
    };
    const result = await sendEmail({ variables: { data: { ...fakeEmail } } });
    console.error(result.errors);
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
          <TextField fullWidth label="To" />
          <TextField fullWidth label="Subject" />
          <TextField fullWidth multiline rows={10} />
        </div>
      </div>
      <div className={classes.buttonRow}>
        <Button>Cancel</Button>
        <Button
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
