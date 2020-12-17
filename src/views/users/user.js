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
import "../../styles/AliancaUsers.css";

export default function AliancaUsers() {
  const token = sessionStorage.getItem("web_token");
  //form
  const formRef = useRef(null);
  //get/post
  const [AliancaUsers, setAliancaUsers] = useState([]);

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
        username: Yup.string()
          .min(3, "Nome tem que ter mais de 3 letras")
          .required("O nome é obrigatorio"),
        password: Yup.string()
          .min(4, "A senha precisa ter 4 ou mais caracteres")
          .required("Campo obrigatório"),
        confirmapassword: Yup.string().oneOf(
          [Yup.ref("password")],
          "Senha diferente"
        ),
      });

      schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadAliancaUsers(data);

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

  function cadAliancaUsers(dataAliancaUsers) {
    console.log(dataAliancaUsers);
    fetch("http://localhost:3333/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        username: dataAliancaUsers.username,
        email: dataAliancaUsers.email,
        password: dataAliancaUsers.password,
        type: dataAliancaUsers.type,
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

  function getAliancaUsers() {
    fetch("", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setAliancaUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAliancaUsers();
    //setLoading(true);
    //setLoading(false);
  }, []);

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
                  <span> USUARIOS DO SISTEMA </span>
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
                        <h2 id="spring-modal-title">CADASTRO DE USUARIOS</h2>
                        <Input
                          name="username"
                          id="username"
                          label="NOME USUÁRIO"
                          type="text"
                          required
                        />
                        <Input
                          name="email"
                          id="email"
                          label="E-MAIL"
                          type="text"
                          required
                        />
                        <Input
                          name="password"
                          id="password"
                          label="SENHA"
                          type="text"
                          required
                        />
                        <Input
                          name="confirmapassword"
                          id="confirmapassword"
                          label="CONFIRMA SENHA"
                          type="text"
                          required
                        />
                          <Input
                          name="type"
                          id="type"
                          label="TIPO DE USUÁRIO"
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
          <h1>cards</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
