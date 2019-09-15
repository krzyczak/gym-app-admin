import React, { Component, FormEvent } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

import ErrorPanel from "./ErrorPanel";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface Props extends WithStyles<typeof styles> {
  exercise?: undefined | { id: number; name: string };
  onCancel: () => void;
  onSubmit: (exercise: { id: number; name: string }) => void;
  save: (data: { id?: number; name: string }) => Promise<{ id: number; name: string }>;
}

interface State {
  error?: string | undefined;
  loading: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

class FormDialog extends Component<Props, State> {
  state: State = {
    loading: false
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements: FormElements = e.currentTarget.elements as FormElements;

    this.setState({
      loading: true
    });

    this.props
      .save({ id: this.props.exercise ? this.props.exercise.id : undefined, name: elements.name.value })
      .then(exercise => {
        this.setState({
          loading: false
        });

        this.props.onSubmit(exercise);
      })
      .catch(e => this.setState({ error: e.response.data.errors.message }));
  };

  render() {
    const { onCancel, exercise } = this.props;
    const { error, loading } = this.state;

    return (
      <Dialog
        open={true}
        maxWidth={"xs"}
        fullWidth
        onClose={loading ? undefined : onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{exercise !== undefined ? "Edit exercise" : "Create exercise"}</DialogTitle>
        {error !== undefined && <ErrorPanel message={error} />}
        <form onSubmit={this.onSubmit}>
          <DialogContent>
            <TextField
              defaultValue={exercise ? exercise.name : undefined}
              autoFocus
              margin="dense"
              required
              id="name"
              label="Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} disabled={loading} color="primary">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FormDialog);
