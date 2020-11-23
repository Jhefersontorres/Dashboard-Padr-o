import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Topbar from "../../components/Navbar/Topbar";
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
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid  item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      Sistemas 
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Lista de sistemas desenvolvidos pela NPD
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                      onClick={() => window.location.href = "/sistemas"}
                    >
                      ver todos
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      Prospecção
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Lista de clientes futura vendas
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                      onClick={() => window.location.href = "/prospeccao"}
                    >
                      ver todos
                    </Button>
                  </div>
                </Paper>
              </Grid>
              
         
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <Typography color="secondary" gutterBottom>
                          Mensagens 
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Centra de mensagens contato clientes
                        </Typography>
                      </div>
                      <div className={classes.alignRight}>
                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.actionButtom}
                          onClick={() => window.location.href = "/mensagens"} 
                        >
                          ver mensagens
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Prospeccao);