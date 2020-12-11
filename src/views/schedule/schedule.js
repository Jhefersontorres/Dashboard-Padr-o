import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/schedule.css";
import CardSchedule from "../../components/cards/Card-Schedule";

import ScheduleContext from "../../components/Contexts/ScheduleContext";
import Pagination from "../../components/pagination/Pagination";
import Posts from "../../components/pagination/Posts";

export default function Schedule() {
  //form
  const formRef = useRef(null);
  //get/post
  const [schedules, setSchedule] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});

      await schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadSchedule(data);

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  function cadSchedule(dataSchedule) {
    fetch("http://localhost:3333/schedule/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        day: dataSchedule.day,
        hour: dataSchedule.hour,
        local: dataSchedule.local,
        description: dataSchedule.description,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSchedule() {
    fetch("http://localhost:3333/schedule")
      .then((response) => response.json())
      .then((response) => {
        setSchedule(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSchedule();
  }, []);

  function DeleteSchedule(id) {
    fetch("http://localhost:3333/schedule/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getSchedule();
        alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message, "Ooops ouve um erro de conexão");
      });
  }

  return (
    <React.Fragment>
      <div classename="container">
        <SideBar />
        <div id="top-bar">
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
              <div className="paper-hearder">
                <div id="hearder">
                  <span>AGENDA SEMANAL </span>
                  <button classename="novo" onClick={handleOpen}>
                    NOVO
                  </button>
                </div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className="modal"
                  open={open}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{ timeout: 900 }}
                >
                  <Fade in={open}>
                    <div className="paper">
                      <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="form "
                      >
                        <h2 id="spring-modal-title"> CADASTRO POTS AGENDA </h2>
                        <div id="date-hour">
                        <Input
                          name="day"
                          id="day"
                          label="DATA"
                          type="date"
                          required
                        />
                        <Input
                          name="hour"
                          id="hour"
                          label="HORÁRIO"
                          type="time"
                          required
                        />
                        </div>
                        <Input
                          name="local"
                          id="local"
                          label="LOCAL"
                          type="text"
                          placeholder="Ex: IPR Central"
                          required
                        />
                        <Input
                          name="description"
                          id="description"
                          label="DESCRIÇÃO"
                          type="text"
                          placeholder="Ex: CULTO ALIANÇA"
                          required
                        />
                        <div className="acoes">
                          <button type="submit">Salvar</button>
                          <button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                            BackdropProps={{ timeout: 1000 }}
                          >
                            Voltar
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Fade>
                </Modal>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <div id="cards-Schedule-views">
          {schedules.length > 0 ? (
            schedules.map((postSchedule) => (
       
                <div class="card">
                 
               
                  <div class="content">
                    <div>
                    <h4>Data: </h4>
                    <p>{postSchedule.day}</p>
                    </div>
                    <div>
                      <h4>Horário: </h4>
                    <p>{postSchedule.hour}</p>
                    </div>
                    <div>
                      <h4>Local: </h4>
                    <p>{postSchedule.local}</p>
                    </div>
                    <div>
                      <h4>Descrição: </h4>
                    <p>{postSchedule.description}</p>
                    </div>
                    <a class="btn btn-warning btn-xs" href="edit.html">
                      Editar
                    </a>
                    <a
                      class="btn btn-danger btn-xs"
                      href="#"
                      data-toggle="modal"
                      data-target="#delete-modal"
                      onClick={() => DeleteSchedule(postSchedule.id)}
                    >
                      Excluir
                    </a>
                  </div>
                </div>
                
              
            ))
          ) : (
            <p id="without-anything">NÃO FOI ENCONTRADO REGISTROS DE LANÇAMENTO</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
