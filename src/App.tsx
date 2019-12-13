/* eslint-disable import/first */
import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { AxiosRequestConfig } from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme, createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";

import AuthService from "./interfaces/AuthService";
import AuthServiceContext from "./context/authService";
import apiClient from "./utils/apiClient";
import createAuthService from "./services/auth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const theme = createMuiTheme();

interface State {
  loading: boolean;
  loggedIn: boolean;
}

const spinnerStyles = (theme: Theme) =>
  createStyles({
    root: {
      width: "500px",
      height: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "200px auto 0"
    }
  });

const Spinner = withStyles(spinnerStyles)(
  ({ classes }: WithStyles<typeof spinnerStyles>) => {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }
);

class App extends Component<{}, State> {
  authService: AuthService;

  constructor(props: object) {
    super(props);

    this.authService = createAuthService();

    this.state = {
      loading: true,
      loggedIn: false
    };
  }

  async componentDidMount() {
    let token = await this.authService.parseHash();

    if (token === null) {
      try {
        token = await this.authService.checkSession();
      } catch (e) {
        this.setState({
          loading: false
        });
      }
    }

    if (token) {
      apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers["Authorization"] = `Bearer ${token}`;

        return config;
      });

      this.setState({
        loggedIn: true,
        loading: false
      });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return <Spinner />;
    }

    if (this.state.loggedIn) {
      return <Dashboard onLogout={this.authService.logout} />;
    } else {
      return <Login onLogin={this.authService.authorize} />;
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthServiceContext.Provider value={this.authService}>
          <CssBaseline />
          <div className="App">{this.renderContent()}</div>
        </AuthServiceContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
