import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from '../../components/unform/Input/input';

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/schedule.css";
import CardSchedule from '../../components/cards/Card-Schedule'

import ScheduleContext from "../../components/Contexts/ScheduleContext";
import Pagination from "../../components/pagination/Pagination";
import Posts from "../../components/pagination/Posts";

export default function Schedule() {
  //form
  const formRef = useRef(null);
  //get/post
  const [schedules, setSchedule] = useState([])

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
      const schema = Yup.object().shape({

     });

      await schema.validate(data, { abortEarly: false, });

      formRef.current.setErrors({});

      cadSchedule(data);

      reset();
     }
    catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

<<<<<<< HEAD
  function cadSchedule(dataSchedule) {
    fetch('http://localhost:3333/schedule/', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        day: dataSchedule.day,
        hour: dataSchedule.hour,
        local: dataSchedule.local,
        description: dataSchedule.description
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }

  function getSchedule() {
    fetch('http://localhost:3333/schedule').then(response => response.json())
      .then(response => {
=======
  function getSchedule() {
    fetch('http://localhost:3333/schedule').then(response => response.json())
      .then(response => {
>>>>>>> 9089c84d1dd1525246e228a78859596e9cc36e09
        setSchedule(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <React.Fragment>
      <div classename="container">
          <SideBar />
        <div id="top-bar">
          <i class="fa fa-user-circle"></i>
          <p>Jheferson torres</p>
        </div>
        <Grid 
          container justify="center"
          >
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
                  <button
                    classename="novo"
                    onClick={handleOpen}
                   >
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
                      <Form ref={formRef} onSubmit={handleSubmit} className="form " >
                        <h2 id="spring-modal-title">CADASTRO POTS AGENDA</h2>
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
                          type="text"
                          required
                        />
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
                            >
                            Salvar
                          </button>
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

                <div classname="cards-views">
<<<<<<< HEAD
                  {
                    schedules.length > 0 ?
                      schedules.map(postSchedule => (
                        <div id="list" class="row">

=======
                    {
                      schedules.length > 0 ?
                        schedules.map(postSchedule => (
                          <div id="list" class="row">
    
>>>>>>> 9089c84d1dd1525246e228a78859596e9cc36e09
                          <div class="table-responsive col-md-12">
                            <table class="table table-striped" cellspacing="0" cellpadding="0">
                              <thead>
                                <tr>
                                  <th>Data</th>
                                  <th>horario</th>
                                  <th>local</th>
                                  <th>descricao</th>
                                  <th class="actions">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
<<<<<<< HEAD

=======
                  
>>>>>>> 9089c84d1dd1525246e228a78859596e9cc36e09
                                <tr>
                                  <td>{postSchedule.day}</td>
                                  <td>{postSchedule.hour}</td>
                                  <td>{postSchedule.local}</td>
                                  <td>{postSchedule.description}</td>
                                  <td class="actions">
                                    <a class="btn btn-success btn-xs" href="#">Visualizar</a>
                                    <a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
                                    <a class="btn btn-danger btn-xs" href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>
                                  </td>
                                </tr>
<<<<<<< HEAD

                              </tbody>
                            </table>
                          </div>

                        </div>
                      ))
                      : (<p>Nada encontrado</p>)
                  }
=======
                  
                              </tbody>
                            </table>
                  
                          </div>
                        </div> 
                        ))
                      : (<p>Nada encontrado</p>)
                    }
>>>>>>> 9089c84d1dd1525246e228a78859596e9cc36e09
                </div>
           
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
