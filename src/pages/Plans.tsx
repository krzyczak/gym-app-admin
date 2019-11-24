import React, { Component, FormEvent, ChangeEvent } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import apiClient from "../utils/apiClient";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      maxWidth: "100%"
    },
    form: {},
    error: {
      backgroundColor: theme.palette.error.dark,
      color: "white",
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  error?: string;
  plan?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  plan: HTMLTextAreaElement;
}

function cancellablePromise<T>(promise: T): [T | Promise<{ canceled: boolean }>, () => void] {
  let cancel = () => {};

  const racePromise = Promise.race([
    new Promise(resolve => {
      cancel = () => resolve({ canceled: true });
    }),
    promise
  ]);

  return [racePromise as T | Promise<{ canceled: true }>, cancel];
}

class PlansPage extends Component<Props, State> {
  state: State = {};
  unmountCallbacks = new Set<() => void>();

  cancelablePromise(promise: Promise<any>) {
    return new Promise((resolve, reject) => {
      const [responsePromise, cancel]: [Promise<any>, () => void] = cancellablePromise(promise);

      responsePromise
        .then(result => {
          if (!result.canceled) {
            resolve(result);
          }
        })
        .catch(e => reject(e))
        .finally(() => {
          this.unmountCallbacks.delete(cancel);
        });
    });
  }

  componentDidMount() {
    this.cancelablePromise(apiClient.get("/admin/plans")).then((response: any) => {
      this.setState({ plan: JSON.stringify(response.data, undefined, 2) });
    });
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements: FormElements = e.currentTarget.elements as FormElements;

    const plan = elements.plan.value;

    this.setState({
      error: undefined
    });

    try {
      const parsedPlan = JSON.parse(plan);

      this.cancelablePromise(apiClient.put("/admin/plans", { scheme: parsedPlan }))
        .then((response: any) => {
          this.setState({ plan: JSON.stringify(response.data, undefined, 2) });
        })
        .catch(e => {
          this.setState({
            error: e.response.data.message || e.response.data.error
          });
        });
    } catch (e) {
      this.setState({
        error: "Invalid JSON structure"
      });
    }
  };

  onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      plan: e.currentTarget.value
    });
  };

  render() {
    const { classes } = this.props;
    const { error, plan } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Default plan</Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            id="plan"
            label="Plan"
            name="plan"
            rows={10}
            onChange={this.onInputChange}
            value={plan}
          />
          {error ? <Paper className={classes.error}>{error}</Paper> : null}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(PlansPage);
