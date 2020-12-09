import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";
import InputFile from "../../components/unform/InputFile/fileinput";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/event.css";

export default function Event() {
  //form
  const formRef = useRef(null);
  //get/post
  const [Event, setEvent] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});

      await schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadEvent(data);

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

  function cadEvent(dataEvent) {
    let formDataEvent = new FormData();

    formDataEvent.append("description", dataEvent.description);
    formDataEvent.append("event_image", dataEvent.event_image);
    formDataEvent.append("link", dataEvent.link);

    fetch("http://localhost:3333/event", {
      method: "post",
      body: formDataEvent,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEvent() {
    fetch("http://localhost:3333/event")
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);

        setEvent(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getEvent();
  }, []);

  function DeleteEvent(id) {
    fetch("http://localhost:3333/event/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getEvent();
        alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message, "Ooops ouve um erro de conexão");
      });
  }

  function getUrl(path) {
    window.open(path, "_blank");
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
                  <span> EVENTOS EM GERAL </span>
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
                        <h2 id="spring-modal-title">CADASTRO EVENTOS</h2>
                        <Input
                          name="description"
                          id="description"
                          label="DESCRIÇÃO"
                          type="text"
                          required
                        />
                        <InputFile
                          name="event_image"
                          id="event_image"
                          label="IMAGEM / BANNER"
                          type="file"
                          required
                        />
                        <Input
                          name="link"
                          id="link"
                          label="LINK FORMULÁRIO DE CADASTRO"
                          type="text"
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
        <div classname="cards-views">
          {Event.length > 0 ? (
            Event.map((event) => (
              <div 
                id="list" 
                class="row" 
                key={event.id}
              >
                <div class="table-responsive col-md-12">
                  <table
                    class="table table-striped"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Imagem / Avatar </th>
                        <th>Link / FormInscrição </th>
                        <th class="actions">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {event.description}
                        </td>
                        <td>
                          <img
                            src={
                              "http://localhost:3333/uploads/images/events/" +
                              event.image
                            }
                            alt="pastor_image"
                            width="200px"
                            height="100px"
                          />
                        </td>
                        <td>
                          <a
                            class="btn btn-success btn-xs"
                            href="#"
                            onClick={() => getUrl(event.link)}
                          >
                            Visualizar
                          </a>
                        </td>
                        <td class="actions">
                          <a 
                            class="btn btn-warning btn-xs" 
                            href="edit.html"
                          >
                            Editar
                          </a>
                          <a
                            class="btn btn-danger btn-xs"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete-modal"
                            onClick={() => DeleteEvent(event.id)}
                          >
                            Excluir
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <p>Nada encontrado</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
