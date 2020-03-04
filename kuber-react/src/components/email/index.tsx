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
import { useMutation, useQuery } from "@apollo/react-hooks";
import { DELETE_EMAIL } from "./gql";
import { gql } from "apollo-boost";

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
  const [deleteEmail, { error }] = useMutation(DELETE_EMAIL);
  const [checkedEmails, setCheckedEmails] = React.useState<string[]>([]);
  const [activeEmail, setActiveEmail] = React.useState<IEmail>();
  const [view, setView] = React.useState<View>();
  const [emails, setEmails] = React.useState<IEmail[]>();
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
  React.useEffect(() => {
    if (data) {
      setEmails(data.emails);
    }
  }, [loading]);

  const handleEmailSelected = (email: IEmail) => setActiveEmail(email);
  const handleChangeView = (view: View) => (e?: React.MouseEvent<any>) => {
    setCheckedEmails([]);
    setView(view);
    setActiveEmail(undefined);
  };
  const handleEmailChecked = (email: IEmail) => {
    const cpy = [...checkedEmails];
    const idx = checkedEmails.findIndex(e => email.id === e);
    if (idx < 0) {
      cpy.push(email.id);
    } else {
      cpy.splice(idx, 1);
    }
    setCheckedEmails(cpy);
  };
  const handleDelete = async (e: React.MouseEvent<any>) => {
    // Delete this email
    if (activeEmail) {
      // Remove email from list in UI
      const cpy = emails ? emails.filter(c => c.id !== activeEmail.id) : [];
      setEmails(cpy);

      // Set the view back to default
      handleChangeView(View.inbox)();

      // Actually delete it
      await deleteEmail({
        variables: { data: activeEmail.id }
      });

      return;
    }
    const chkEmailCopy = [...checkedEmails];
    // Remove selected checked emails
    const cpy = emails
      ? emails.filter(c => !chkEmailCopy.some(ce => c.id === ce))
      : [];

    // Clear selections and remove emails
    setEmails(cpy);
    setCheckedEmails([]);

    for (let i = 0; i < chkEmailCopy.length; i++) {
      const response = await deleteEmail({
        variables: { data: chkEmailCopy[i] }
      });
    }
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
            <Button
              size="large"
              onClick={handleDelete}
              startIcon={<DeleteForever />}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item sm={9}>
          {activeEmail ? (
            <Email emailId={activeEmail.id} />
          ) : view === View.compose ? (
            <ComposeEmail onClose={handleChangeView(View.inbox)} />
          ) : view === View.sent ? (
            <SentEmailList onEmailSelected={() => null} />
          ) : (
            <EmailList
              emails={emails}
              onEmailChecked={handleEmailChecked}
              selectedEmails={checkedEmails}
              onEmailSelected={handleEmailSelected}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
