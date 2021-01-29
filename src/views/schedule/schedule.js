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
  const formRefEdit = useRef(null);
  //get/post
  const [schedules, setSchedule] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (schedule) => {
    setOpenEdit(true);

    setTimeout(() => {
      formRefEdit.current.setData({
        day: schedule.day_unformated,
        hour: schedule.hour,
        local: schedule.local,
        description: schedule.description,
      });
    }, 100);
  };

  const handleCloseEdit = () => {
    console.log("d");
    setOpenEdit(false);
  };

  async function handleSubmitEdit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});
      await schema.validate(data, { abortEarly: false });
      formRefEdit.current.setErrors({});
      editSchedule(data);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRefEdit.current.setErrors(errorMessages);
      }
    }
  }

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
    fetch("http://localhost:3333/schedule", {
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
        getSchedule();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSchedule() {
    fetch("http://localhost:3333/schedule")
      .then((response) => response.json())
      .then((response) => {
        response.map((schedule) => {
          console.log(response)
          const date = new Date();

          const year = date.getFullYear();
          const day = schedule.day.split("/");

          const day_unformated = `${year}-${day[1]}-${day[0]}`;

          schedule.day_unformated = day_unformated;
        });

        console.log(response);
        setSchedule(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editSchedule(dataSchedule) {
    fetch("http://localhost:3333/schedule/" + dataSchedule.id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        day: dataSchedule.dayedit,
        hour: dataSchedule.houredit,
        local: dataSchedule.localedit,
        description: dataSchedule.descriptionedit,
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

  useEffect(() => {
    getSchedule();
  }, []);

  function DeleteSchedule(id){
    console.log(id)
    fetch("http://localhost:3333/schedule/" + id,{
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((response) => {
      getSchedule();
      alert(response.message);
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message, "Oopps ocorreu um erro de conexão")
    })
  }

  return (
    <React.Fragment>
      <div classename="container">
        <SideBar />
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className="grid"
            >
            <div className="paper-hearder-schedule">
              <div id="hearder-schedule">
                <p className="title"> AGENDA SEMANAL </p>
                <div
                  id="btn-fas-novo"
                  type="button"
                  class="btn btn-success"
                  onClick={handleOpen}
                  >
                  <i class="fas fa-save"></i>
                  <p classename="btn-novo">NOVO</p>
                </div>
              </div>
            </div>
            {/* ###########################    MODAL DE CADASTRAMENTO #################*/}

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
                  <Form ref={formRef} onSubmit={handleSubmit} className="form ">
                    <h2 id="spring-modal-title"> CADASTRO AGENDA SEMANAL </h2>
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
                      <button
                        type="submit"
                        id="btn-fas-novo"
                        class="btn btn-success"
                        >
                        <i class="fas fa-save"></i>
                        <p>Salvar</p>
                      </button>
                      <button
                        id="btn-fas-novo"
                        class="fas fa-reply"
                        class="btn btn-warning btn-xs"
                        onClick={handleClose}
                        BackdropProps={{ timeout: 1000 }}
                        >
                        <i class="fas fa-share"></i>
                        Voltar
                      </button>
                    </div>
                  </Form>
                </div>
              </Fade>
            </Modal>
          </Grid>

          {/* ###########################   GET CARD SCHEDULES #################*/}
          <div class="wrapper-schedule">
            {schedules.length > 0 ? (
              schedules.map((postSchedule) => (
               
                <div class="hourDay">
                  <div id="title-initial">
                   <p> <i id="fas-schedule" class="fas fa-calendar-alt"></i>
                    Agenda</p>
                  </div>
                  <div id="hourday_information">
                    <p id="day_hour" >
                      <i id="fas-schedule" class="fas fa-calendar-check"></i>
                      {postSchedule.day}
                    </p>
                    <p id="day_hour" >
                      <i id="fas-schedule" class="fas fa-clock"></i>
                      {postSchedule.hour}
                    </p>
                  </div>
                  <div id="information">
                    <p id="infor">
                      <i id="fas-schedule" class="fas fa-map-marker-alt"></i>
                      {postSchedule.local}
                    </p>
                    <p id="infor">
                    <i id="fas-schedule" class="fas fa-marker"></i>
                      {postSchedule.description}
                    </p>
                  </div>
                  <div id="btn-acao-schedule">
                    <a
                      id="btn_acoes"
                      class="btn btn-warning btn-xs"
                      href="#"
                      onClick={() => handleOpenEdit(postSchedule)}
                    >
                      <i id="fas_acoes" class="fas fa-edit"></i>
                      Editar
                    </a>
                    <a
                      id="btn_acoes"
                      class="btn btn-danger btn-xs"
                      href="#"
                      data-toggle="modal"
                      data-target="#delete-modal"
                      onClick={() => DeleteSchedule(postSchedule.id)}
                    >
                      <i id="fas_acoes" class="fas fa-trash-alt"></i>
                      Excluir
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Nada encontrado</p>
            )}
          </div>
          
          {/* ##########    MODAL EDITAR AGENDA      ########## */}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={openEdit}
            >
            <Fade in={openEdit}>
              <div className="paper">
                <Form
                  ref={formRefEdit}
                  onSubmit={handleSubmitEdit}
                  className="form "
                  >
                  <h2 id="spring-modal-title"> CADASTRO POTS AGENDA </h2>
                  <div id="date-hour">
                    <Input
                      name="day"
                      id="dayedit"
                      label="DATA"
                      type="date"
                      value="date"
                      required
                    />
                    <Input
                      name="hour"
                      id="houredit"
                      label="HORÁRIO"
                      type="time"
                      required
                    />
                  </div>
                  <Input
                    name="local"
                    id="localedit"
                    label="LOCAL"
                    type="text"
                    placeholder="Ex: IPR Central"
                    required
                  />
                  <Input
                    name="description"
                    id="descriptionedit"
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
                      onClick={handleCloseEdit}
                      >
                      Voltar
                    </button>
                  </div>
                </Form>
              </div>
            </Fade>
          </Modal>
        </Grid>

      </div>
    </React.Fragment>
  );
}
