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
import { Inbox, Archive, DeleteForever, Add } from "@material-ui/icons";
import { EmailList } from "./EmailList";
import { IEmail } from "../../models/Email";
import { Email } from "./Email";
import { ComposeEmail } from "./ComposeMail";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    compose: {
      backgroundColor: "#5d5d5d",
      color: "#fefefe",
      marginBottom: 8
    }
  })
);

export const Emails: React.FC = () => {
  const [activeEmail, setActiveEmail] = React.useState<IEmail>();
  const [composeMail, setComposeMail] = React.useState();
  const handleEmailSelected = (email: IEmail) => setActiveEmail(email);
  const handleComposeEmail = (e: React.MouseEvent<any>) => {
    setComposeMail(true);
    setActiveEmail(undefined);
  };
  const handleViewInbox = (e: React.MouseEvent<any>) => {
    setComposeMail(false);
    setActiveEmail(undefined);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <Fab
            onClick={handleComposeEmail}
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
              onClick={handleViewInbox}
              size="large"
              startIcon={<Inbox />}
            >
              Inbox
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
          {composeMail ? (
            <ComposeEmail />
          ) : activeEmail ? (
            <Email emailId={activeEmail.id} />
          ) : (
            <EmailList onEmailSelected={handleEmailSelected} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
