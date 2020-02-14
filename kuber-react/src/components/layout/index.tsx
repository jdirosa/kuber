import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  createStyles
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useAuth0 } from "../../auth/authHook";
import { Menu as MenuIcon } from "@material-ui/icons";
export const TopNav: React.FC = ({ children }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1
      }
    })
  );
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            mailcloak
          </Typography>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() =>
                logout({
                  returnTo: "http://localhost:3000/"
                })
              }
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() =>
                loginWithRedirect({
                  redirect_uri: "http://localhost:3000/login/callback"
                })
              }
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
