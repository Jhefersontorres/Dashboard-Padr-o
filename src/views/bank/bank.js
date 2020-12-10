import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/bank.css";

export default function Bank() {
  //form
  const formRef = useRef(null);
  //get/post
  const [Bank, setBank] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        descricao: Yup.string()
          .min(3, "Nome tem que ter mais de 3 letras")
          .required("O nome é obrigatorio"),
        especificacao: Yup.string().required("CNPJ é obrigatorio"),
      });

      schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadBank(data);

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

  function cadBank(dataBank) {
    fetch("", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        descricao: dataBank.descricao,
        especificacoes: dataBank.especificacao,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        handleClose();
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBank() {
    fetch("http://localhost:3333/bank", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBank(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBank();
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
                  <span> GR EM CASA </span>
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
                        <h2 id="spring-modal-title"> CONTA BANCÁRIA </h2>
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
        <div classname="cards-bank-views">
          {Bank.length > 0 ? (
            Bank.map((postBank) => (
              <div id="list" class="row">

                <div class="card">
                  <div class="content">
                  <div>
                    <h4>Banco: </h4>
                    <p>{postBank.bank}</p>
                    </div>
                    <div>
                    <h4>Agência: </h4>
                    <p>{postBank.agency}</p>
                    </div>
                    <div>
                    <h4>Conta:</h4>
                    <p>{postBank.account}</p>
                    </div>
                    <p>
                    <img
                            src={
                              "http://localhost:3333/uploads/images/qr_code/" +
                              postBank.qr_code
                            }
                            alt="qr_code"
                            width="250px"
                            height="300px"
                          />
                    </p>

                    <a
                            class="btn btn-warning btn-xs"
                            href="#"
                            onClick={handleOpenEdit}
                          >
                            Editar
                          </a>   
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nada encontrado</p>
          )}

          {/* MODAL EDITAR BANK */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={openEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 900 }}
          >
            <Fade in={openEdit}>
              <div className="paper">
                <Form ref={formRef} onSubmit={handleSubmit} className="form ">
                  <h2 id="spring-modal-title">EDITAR CONTA</h2>
                  <Input
                    name="bank"
                    id="bank"
                    label="BANCO"
                    type="text"
                    required
                  />
                  <Input
                    name="agency"
                    id="agency"
                    label="AGÊNCIA"
                    type="text"
                    required
                  />
                  <Input
                    name="account"
                    id="account"
                    label="CONTA"
                    type="text"
                    required
                  />
                  <div className="acoes">
                    <button type="submit">Salvar</button>
                    <button
                      variant="contained"
                      color="primary"
                      onClick={handleCloseEdit}
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
      </div>
    </React.Fragment>
  );
}
