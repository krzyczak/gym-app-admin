import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
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
    root: {},
    optionsCell: {
      textAlign: "right",
      "& > *": {
        display: "inline-block"
      }
    },

    image: {
      width: 60,
      height: 60
    }
  });

type User = { id: number; email: string; active: boolean; admin: boolean };

interface Props extends WithStyles<typeof styles> {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

class UsersList extends Component<Props> {
  render() {
    const { classes, users, onDelete, onEdit } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">id</TableCell>
            <TableCell padding="checkbox">active</TableCell>
            <TableCell padding="checkbox">admin</TableCell>
            <TableCell>email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell padding="checkbox" scope="row">
                {user.id}
              </TableCell>

              <TableCell scope="row">
                <Checkbox disabled checked={user.active !== null} />
              </TableCell>

              <TableCell scope="row">
                <Checkbox disabled checked={user.admin !== null} />
              </TableCell>
              <TableCell scope="row">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(UsersList);
