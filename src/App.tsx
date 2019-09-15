/* eslint-disable import/first */
import React, { Component, FormEvent } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import AuthService from "./interfaces/AuthService";
import AuthServiceContext from "./context/authService";
import apiClient from "./utils/apiClient";
import createAuthService from "./services/auth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const theme = createMuiTheme();

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface State {
  loading: boolean;
  loggedIn: boolean;
}

class App extends Component<{}, State> {
  authService: AuthService;

  constructor(props: object) {
    super(props);

    this.authService = createAuthService(apiClient);

    this.state = {
      loading: false,
      loggedIn: this.authService.isLoggedIn()
    };
  }

  onSubmit = (e: FormEvent<FormElements>) => {
    e.preventDefault();

    if (this.state.loading) {
      return;
    }

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    this.setState({
      loading: true
    });

    axios
      .post(process.env.REACT_APP_API_URL + "/auth/login", {
        email,
        password
      })
      .then(() => {
        this.setState({
          loggedIn: true,
          loading: false
        });
      });
  };

  onLogin = () => {
    this.setState({
      loggedIn: this.authService.isLoggedIn()
    });
  };

  onLogout = () => {
    this.authService.logout().then(() => {
      this.setState({
        loggedIn: false
      });
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthServiceContext.Provider value={this.authService}>
          <CssBaseline />
          <div className="App">
            {this.state.loggedIn ? <Dashboard onLogout={this.onLogout} /> : <Login onLogin={this.onLogin} />}
          </div>
        </AuthServiceContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
