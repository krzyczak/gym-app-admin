import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    }
  });

interface Props extends WithStyles<typeof styles> {}

class ExercisesEmpty extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h5">No exercises</Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(ExercisesEmpty);
