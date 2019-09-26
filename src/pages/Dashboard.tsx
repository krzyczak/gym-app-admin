import React, { Component } from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, createStyles } from "@material-ui/core/styles";

import ExercisesPage from "./Exercises";
import PlansPage from "./Plans";
import UsersPage from "./Users";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      textAlign: "left"
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
    container: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingTop: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: {
      paddingRight: 24
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth
    }
  });

const pages = [
  {
    id: "exercises",
    label: "Exercises",
    Component: ExercisesPage
  },
  {
    id: "plans",
    label: "Plans",
    Component: PlansPage
  },
  {
    id: "users",
    label: "Users",
    Component: UsersPage
  }
];

interface Props extends WithStyles<typeof styles> {
  onLogout: () => void;
}

interface State {
  activePage: string;
}

class DashboardPage extends Component<Props, State> {
  state = {
    activePage: "plans"
  };

  changePage = (id: string) => {
    this.setState({
      activePage: id
    });
  };

  render() {
    const { classes, onLogout } = this.props;

    const ActivePageComponent = pages.find(({ id }) => id === this.state.activePage)!.Component;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={cx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton color="inherit" title="Logout" onClick={onLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={true}
        >
          <div className={classes.appBarSpacer} />
          <Divider />
          <List>
            {pages.map(({ id, label }) => (
              <ListItem button key={id} selected={this.state.activePage === id} onClick={() => this.changePage(id)}>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.container}>
            <ActivePageComponent />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardPage);
