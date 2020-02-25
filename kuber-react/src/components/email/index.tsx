import React from "react";
import {
  Grid,
  ButtonGroup,
  Button,
  Fab,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Inbox, Archive, DeleteForever, Add, Send } from "@material-ui/icons";
import { EmailList } from "./EmailList";
import { IEmail } from "../../models/Email";
import { Email } from "./Email";
import { ComposeEmail } from "./ComposeMail";
import { SentEmailList } from "./SentEmailList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    compose: {
      backgroundColor: "#5d5d5d",
      color: "#fefefe",
      marginBottom: 8
    }
  })
);
enum View {
  compose,
  sent,
  inbox
}
export const Emails: React.FC = () => {
  const [activeEmail, setActiveEmail] = React.useState<IEmail>();
  const [view, setView] = React.useState<View>();
  const handleEmailSelected = (email: IEmail) => setActiveEmail(email);
  const handleChangeView = (view: View) => (e: React.MouseEvent<any>) => {
    setView(view);
    setActiveEmail(undefined);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <Fab
            onClick={handleChangeView(View.compose)}
            className={classes.compose}
            variant="extended"
          >
            <Add />
            Compose
          </Fab>
          <ButtonGroup
            fullWidth
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button
              onClick={handleChangeView(View.inbox)}
              size="large"
              startIcon={<Inbox />}
            >
              Inbox
            </Button>
            <Button
              onClick={handleChangeView(View.sent)}
              size="large"
              startIcon={<Send />}
            >
              Sent
            </Button>
            <Button size="large" startIcon={<Archive />}>
              Archive
            </Button>
            <Button size="large" startIcon={<DeleteForever />}>
              Deleted
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item sm={9}>
          {activeEmail ? (
            <Email emailId={activeEmail.id} />
          ) : view === View.compose ? (
            <ComposeEmail />
          ) : view === View.sent ? (
            <SentEmailList onEmailSelected={() => null} />
          ) : (
            <EmailList onEmailSelected={handleEmailSelected} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
