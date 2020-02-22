import React from "react";
import { Grid, ButtonGroup, Button } from "@material-ui/core";
import { Inbox, Archive, DeleteForever } from "@material-ui/icons";
import { EmailList } from "./EmailList";
import { IEmail } from "../../models/Email";
import { Email } from "./Email";

export const Emails: React.FC = () => {
  const [activeEmail, setActiveEmail] = React.useState<IEmail>();
  const handleEmailSelected = (email: IEmail) => setActiveEmail(email);
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <ButtonGroup
            fullWidth
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button
              onClick={() => setActiveEmail(undefined)}
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
          {activeEmail ? (
            <Email emailId={activeEmail.id} />
          ) : (
            <EmailList onEmailSelected={handleEmailSelected} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
