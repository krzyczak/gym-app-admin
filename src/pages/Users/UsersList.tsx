import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      "& td, & th": {
        border: "1px solid black",
        padding: "1em",
      },
      "& td": {
        whiteSpace: "nowrap",
      },
    },
    optionsCell: {
      textAlign: "right",
      "& > *": {
        display: "inline-block",
      },
    },
  });

type User = {
  id: string;
  average: number;
  cycleWorkouts: number;
  lastWorkoutDate: Date;
  totalWorkouts: number;
  cycle: number;
  createdAt: string;
  PlanId: number;
  gender: string;
  lastWorkoutDuration: number;
  averageWorkoutDuration: number;
  weight: number;
  height: number;
  active: boolean;
};

interface Props extends WithStyles<typeof styles> {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

class UsersList extends Component<Props> {
  render() {
    const { users, classes } = this.props;

    return (
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">position</TableCell>
            <TableCell padding="checkbox">id</TableCell>
            <TableCell padding="checkbox">average</TableCell>
            <TableCell>last workout at</TableCell>
            <TableCell>last workout duration</TableCell>
            <TableCell>average workout duration</TableCell>
            <TableCell>cycle workouts</TableCell>
            <TableCell>total workouts</TableCell>
            <TableCell>plan ID</TableCell>
            <TableCell>cycle</TableCell>
            <TableCell>registered at</TableCell>
            <TableCell>weight</TableCell>
            <TableCell>height</TableCell>
            <TableCell>gender</TableCell>
            <TableCell>active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell padding="checkbox" scope="row">
                {index + 1}
              </TableCell>
              <TableCell padding="checkbox" scope="row">
                {user.id.slice(0, 15)}
              </TableCell>
              <TableCell scope="row">{parseFloat(user.average.toFixed(3))}</TableCell>
              <TableCell scope="row">{user.lastWorkoutDate}</TableCell>
              <TableCell scope="row">
                {user.lastWorkoutDuration !== undefined && `${Math.floor(user.lastWorkoutDuration / 60)} mins`}
              </TableCell>
              <TableCell scope="row">
                {user.averageWorkoutDuration !== undefined && `${Math.floor(user.averageWorkoutDuration / 60)} mins`}
              </TableCell>
              <TableCell scope="row">{user.cycleWorkouts}</TableCell>
              <TableCell scope="row">{user.totalWorkouts}</TableCell>
              <TableCell scope="row">{user.PlanId}</TableCell>
              <TableCell scope="row">{user.cycle}</TableCell>
              <TableCell scope="row">{user.createdAt.slice(0, 10)}</TableCell>
              <TableCell scope="row">{user.weight !== undefined && user.weight / 100}</TableCell>
              <TableCell scope="row">{user.height !== undefined && user.height / 100}</TableCell>
              <TableCell scope="row">{user.gender}</TableCell>
              <TableCell padding="checkbox" scope="row">
                <Checkbox disabled checked={user.active} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(UsersList);
