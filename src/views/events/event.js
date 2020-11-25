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
import "../../styles/grcasa.css";

export default function Event() {
//form
  const formRef = useRef(null);
//get/post
  const [Event, setEvent] = useState([])

//modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        descricao: Yup.string()
          .min(3, "Nome tem que ter mais de 3 letras")
          .required("O nome é obrigatorio"),
        especificacao: Yup.string()
          .required("CNPJ é obrigatorio"),
      });

      schema.validate(data, { abortEarly: false, });

      formRef.current.setErrors({});

      cadEvent(data);

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

  function cadEvent (dataEvent){
    fetch('', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({
        descricao: dataEvent.descricao,
        especificacoes: dataEvent.especificacao
      })
    }).then(response => response.json())
      .then(response => {
        handleClose();
        window.location.reload();
        console.log(response);
      }).catch(error => {
        console.log(error);
    })
  }


  function getEvent() {
    fetch('http://localhost:3033/sistemas/', {
      method: "GET"
    }).then(response => response.json())
      .then(response => {

        console.log(response)
      
        setEvent(response.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getEvent();
    //setLoading(true);
    //setLoading(false);
  }, []);

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
                  <Fade in={open}>
                    <div className="paper">
                      <h2 id="spring-modal-title">CADASTRO DE SISTEMA</h2>
                      <Form ref={formRef} onSubmit={handleSubmit} className= "form " >
                        <Input
                          name="descricao"
                          id="descricao"
                          label="DESCRIÇÃO"
                          type="text"
                          required
                        />
                        <Input
                          name="especificacao"
                          id="especificacao"
                          label="ESPECIFICAÇÃO"
                          type="text"
                          required
                        />

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
                      </Form>
                    </div>
                  </Fade>
                </Modal>

                <div classname="cards-views"></div>
              </Paper>
              <Paper>
                <h1>cards</h1>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
