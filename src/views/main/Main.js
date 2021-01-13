import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SideBar from "../../components/sidebar/sidebar";
import NavBar from "../../components/Navbar/Topbar"
import '../../styles/main.css'

//const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
   // background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 100,
  },
  paper: {
      padding: (10),
      textAlign: "left",
      color: theme.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: 1
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: 1,
    width: 152
  },
  blockCenter: {
    padding: 2,
    textAlign: "center"
  },
  block: {
   padding: 2
  },
  box: {
    padding: 5,
    margin: 5,
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  }
});

class Prospeccao extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <SideBar/>
        <div id="top-bar">
          <i class="fa fa-sign-out fa-2x">rere</i>
          
        </div>
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >


            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Prospeccao);