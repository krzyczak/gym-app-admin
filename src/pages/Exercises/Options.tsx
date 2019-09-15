import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2),
      marginTop: 0,
      "&:first-child": {
        marginLeft: 0
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  onAddExercise: () => void;
}

class Options extends Component<Props> {
  render() {
    const { classes, onAddExercise } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button} onClick={onAddExercise}>
          Add exercise
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Options);
