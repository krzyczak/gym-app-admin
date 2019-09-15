import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 2),
      backgroundColor: theme.palette.error.dark,
      color: "white"
    },
    textarea: {
      fontFamily: "monospace",
      borderWidth: 0,
      fontSize: "12px",
      background: "none",
      width: "100%",
      resize: "none",
      minHeight: "100px",
      color: "white"
    }
  });

interface Props extends WithStyles<typeof styles> {
  message: string;
}

class ErrorPanel extends Component<Props> {
  render() {
    const { classes, message } = this.props;

    return (
      <Paper className={classes.root}>
        <textarea defaultValue={message} className={classes.textarea}></textarea>
      </Paper>
    );
  }
}

export default withStyles(styles)(ErrorPanel);
