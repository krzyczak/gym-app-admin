import React, { Component, FormEvent, createRef } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: theme.palette.error.dark,
      color: "white",
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  });

interface Props extends WithStyles<typeof styles> {
  plan: object;
  pending: boolean;
  error?: string;
  onSubmit: (plan: object) => void;
}

interface FormElements extends HTMLFormControlsCollection {
  plan: HTMLTextAreaElement;
}

class PlansPage extends Component<Props> {
  textarea = createRef<HTMLTextAreaElement>();

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const elements: FormElements = e.currentTarget.elements as FormElements;
      const plan = elements.plan.value;

      const parsedPlan = JSON.parse(plan);

      this.props.onSubmit(parsedPlan);
    } catch (e) {
      alert("Invalid JSON structure");
    }
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.plan !== this.props.plan) {
      this.textarea.current!.value = JSON.stringify(this.props.plan, null, 2);
    }
  }

  render() {
    const { classes, plan, pending, error } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            id="plan"
            label="Plan"
            inputProps={{
              ref: this.textarea,
            }}
            name="plan"
            rows={30}
            defaultValue={JSON.stringify(plan, null, 2)}
            disabled={pending}
          />
          {error ? <Paper className={classes.error}>{error}</Paper> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={pending}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(PlansPage);
