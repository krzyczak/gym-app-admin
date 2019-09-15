import React, { Component, FormEvent } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import withAuthService from "../hoc/withAuthService";
import AuthService from "../interfaces/AuthService";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    error: {
      backgroundColor: theme.palette.error.dark,
      color: "white",
      fontFamily: "monospace",
      textAlign: "left",
      padding: theme.spacing(2),
      "& textarea": {
        width: "100%",
        border: 0,
        background: "transparent",
        color: "white",
        height: "100px",
        resize: "none"
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  authService: AuthService | null;
  onLogin: () => void;
}

interface State {
  error: string | null;
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

class LoginPage extends Component<Props, State> {
  state = {
    error: null
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const elements: FormElements = e.currentTarget.elements as FormElements;

    this.props
      .authService!.login(elements.email.value, elements.password.value)
      .then(this.props.onLogin)
      .catch(err => {
        if (err.response.status) {
          this.setState({
            error: "Invalid credentials"
          });
        } else {
          this.setState({
            error: JSON.stringify(err.response.data, null, 2)
          });
        }
      });

    e.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              defaultValue="pilaas@gmail.com"
            />
            <TextField
              variant="outlined"
              defaultValue="qwerty123"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {this.state.error ? (
              <Paper className={classes.error}>
                <textarea defaultValue={this.state.error || ""}></textarea>
              </Paper>
            ) : null}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(withAuthService(LoginPage));
