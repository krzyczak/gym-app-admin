import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    optionsCell: {
      textAlign: "right",
      "& > *": {
        display: "inline-block"
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  exercises: { id: number; name: string }[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

class ExercisesList extends Component<Props> {
  render() {
    const { classes, exercises, onDelete, onEdit } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">id</TableCell>
            <TableCell>name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map(exercise => (
            <TableRow key={exercise.id}>
              <TableCell padding="checkbox" scope="row">
                {exercise.id}
              </TableCell>
              <TableCell scope="row">{exercise.name}</TableCell>
              <TableCell scope="row" className={classes.optionsCell}>
                <IconButton aria-label="delete" onClick={() => onDelete(exercise.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => onEdit(exercise.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(ExercisesList);
