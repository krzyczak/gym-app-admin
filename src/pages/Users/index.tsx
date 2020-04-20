import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

import apiClient from "../../utils/apiClient";

import UsersList from "./UsersList";

type User = {
  id: string;
  average: number;
  cycleWorkouts: number;
  lastWorkoutDate: Date;
  totalWorkouts: number;
  createdAt: string;
  cycle: number;
  gender: string;
  PlanId: number;
  lastWorkoutDuration: number;
  averageWorkoutDuration: number;
  weight: number;
  height: number;
  active: boolean;
};

function cancellablePromise<T>(promise: T): [T | Promise<{ canceled: boolean }>, () => void] {
  let cancel = () => {};

  const racePromise = Promise.race([
    new Promise((resolve) => {
      cancel = () => resolve({ canceled: true });
    }),
    promise,
  ]);

  return [racePromise as T | Promise<{ canceled: true }>, cancel];
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      maxWidth: "100%",
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  users: User[] | undefined;
}

class UsersPage extends Component<Props, State> {
  state: State = {
    users: undefined,
  };

  unmountCallbacks = new Set<() => void>();

  cancelablePromise(promise: Promise<any>) {
    return new Promise((resolve, reject) => {
      const [responsePromise, cancel]: [Promise<any>, () => void] = cancellablePromise(promise);

      responsePromise
        .then((result) => {
          if (!result.canceled) {
            resolve(result);
          }
        })
        .catch((e) => reject(e))
        .finally(() => {
          this.unmountCallbacks.delete(cancel);
        });
    });
  }

  componentDidMount() {
    this.cancelablePromise(apiClient.get("/admin/users")).then((response: any) => {
      this.setState({
        users: response.data.users as User[],
      });
    });
  }

  componentWillUnmount() {
    this.unmountCallbacks.forEach((callback) => callback());
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    return (
      <div className={classes.root}>
        {/* <Options onAddExercise={this.onShowNewExerciseForm} /> */}

        {users !== undefined ? (
          <UsersList onDelete={(() => {}) as any} onEdit={(() => {}) as any} users={users} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(UsersPage);
