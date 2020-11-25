import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/grcasa.css";

export default function () {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div classename="container">
        <SideBar />
        <div id="teste">
          <i class="fa fa-user-circle"></i>
          <p>Jheferson torres</p>
        </div>
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className="grid"
          >
            <Grid item xs={12} md={6}>
              <Paper className="paper">
                <div classename="hearder">
                  <button onClick={handleOpen}>NOVO</button>
                  <span>GR EM CASA </span>
                </div>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className="modal"
                  open={open}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{ timeout: 700 }}
                >
                  <div>
                    <button type="submit" variant="contained" color="primary">
                      Salvar
                    </button>
                    <button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                      BackdropProps={{ timeout: 700 }}
                    >
                      Voltar
                    </button>
                  </div>
                </Modal>

                <div classname="cards-views"></div>
              </Paper>
              <Paper>
                <h1>tsteste</h1>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
