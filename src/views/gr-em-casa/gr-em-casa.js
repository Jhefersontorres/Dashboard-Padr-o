import React, { useEffect, useState, useRef } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import SideBar from "../../components/sidebar/sidebar";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";
import InputFile from "../../components/unform/InputFile/fileinput";
import Select from "../../components/unform/Select/Select";

import "../../styles/grcasa.css";

export default function Grcasa() {
  //form
  const formRef = useRef(null);
  //get/post
  const [GRCasa, setGrCasa] = useState([]);
  const [Pastores, setPastores] = useState([]);
  const [DeleteGRCasa, setDeleteGrCasa] = useState([]);
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getUrlPdf(path) {
    window.open(path, "_blank");
  }

  function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});

      schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadGrCasa(data);

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

  function cadGrCasa(dataGrCasa) {
    console.log('sadas', dataGrCasa);
    let formDataGrCasa = new FormData();

    formDataGrCasa.append("id_pastor", dataGrCasa.id_pastor);
    formDataGrCasa.append("message", dataGrCasa.message);
    formDataGrCasa.append("material", dataGrCasa.material);

    fetch("http://localhost:3333/gr-casa", {
      method: "POST",
      body: formDataGrCasa,
    })
      .then((response) => response.json())
      .then((response) => {
        handleClose();
        getGrCasa();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getGrCasa() {
    fetch("http://localhost:3333/gr-casa", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setGrCasa(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getGrCasa();
    getPastores();
  }, []);

  function getPastores(id) {
    fetch("http://localhost:3333/pastor")
      .then((response) => response.json())
      .then((response) => {
        const options = [];

        response.map(pastor => {
          options.push({
            value: pastor.id, label: pastor.name
          });

        })
  
        setPastores(options);
      })
      .catch((err) => {
        console.log(err.message, "Ooops ouve um erro de conexão");
      });
  }

  function DeleteGrCasa(id) {
    fetch("http://localhost:3333/gr-casa/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getGrCasa();
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
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className="grid"
            >
            <div className="paper-hearder">
              <div id="hearder-gremcasa">
                <p className="title"> GR EM CASA </p>
                <div
                  id="btn-fas-novo"
                  type="button"
                  class="btn btn-success"
                  onClick={handleOpen}
                  >
                  <i class="fas fa-save"></i>
                  <p classename="btn-novo">Novo</p>                  
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
                    <h2 id="spring-modal-title"> CADASTRO POST GR EM CASA </h2>
                    <Select  
                      name="id_pastor" 
                      id="id_pastor" 
                      options={Pastores} 
                      required
                      >
                    </Select>
                    <Input
                      name="message"
                      id="message"
                      label="MENSSAGEM"
                      type="text"
                      required
                      />
                    <InputFile
                      name="material"
                      id="material"
                      label="ARQUIVO PDF"
                      type="file"
                      required
                      />
                    <div className="acoes">
                      <button 
                        type="submit"
                        id="btn-fas-novo"
                        class="btn btn-success">
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

          {/* ###########################   GET CARD GR EM CASA #################*/}
          <div class="wrapper-grcasa">
            {GRCasa.length > 0 ? (
              GRCasa.map((postGrcasa) => (
                <div class="box">
                  <i class="fas fa-quote-left quote"></i>
                  <p>{postGrcasa.message}</p>
                  <div id="anexo">
                    <a
                      class="fas fa-external-link-square-alt"
                      href="#"
                      onClick={() =>
                        getUrlPdf( "http://localhost:3333/uploads/images/gr_casa/" + postGrcasa.document_src )}
                        file={"http://localhost:3333/uploads/images/gr_casa/" + postGrcasa.document_src }>
                    </a>
                    <p id="btn-visualizar">Visualizar Anexo</p>
                  </div>
                  <div class="content">
                    <div class="info">
                      <div class="name">Autor</div>
                      <div class="job">YouTuber | Blogger</div>
                    </div>
                    <div class="image">
                      <img
                        src={"http://localhost:3333/uploads/images/pastors/" + postGrcasa.pastor_image}
                        alt="pastor_image"
                      />
                    </div>
                  </div>
                  <div id="btn-acao">
                    <a 
                      id="btn_acoes" 
                      class="btn btn-warning btn-xs" 
                      href="#">
                      <i id="fas_acoes" class="fas fa-edit"></i>
                      Editar
                    </a>
                    <a
                      id="btn_acoes"
                      class="btn btn-danger btn-xs"
                      href="#"
                      data-toggle="modal"
                      data-target="#delete-modal"
                      onClick={() => DeleteGrCasa(postGrcasa.id)}
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
        </Grid>
      </div>
    </React.Fragment>
  );
}
