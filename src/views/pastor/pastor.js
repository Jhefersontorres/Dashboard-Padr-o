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
import "../../styles/pastor.css";

export default function Pastor() {
  //form
  const formRef = useRef(null);
  //get/post
  const [Pastor, setPastor] = useState([]);

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

      cadPastores(data);

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

  function cadPastores(dataPastor) {
    console.log(dataPastor);
    let formData = new FormData();

    formData.append("name", dataPastor.name);
    formData.append("pastor_image", dataPastor.pastor_image);

    fetch("http://localhost:3333/pastor", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPastor() {
    fetch("http://localhost:3333/pastor", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setPastor(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPastor();
    //setLoading(true);
    //setLoading(false);
  }, []);

  function DeletePastor(id) {
    fetch("http://localhost:3333/pastor/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getPastor();
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
            <div className="paper-hearder-pastor">
              <div id="hearder-pastor">
                <p className="title"> CADASTRO DE PASTORES  </p>
                <div 
                  id="btn-fas-novo" 
                  type="button" 
                  onClick={handleOpen}
                  >
                  <i class="fas fa-save"></i>
                  <p classename="btn-novo">NOVO</p>
                </div>
              </div>
            </div>
            {/* #####################  MODAL CADASTRO DE PASTORES   ##################### */}
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
                    <h2 id="spring-modal-title">CADASTRO DE PASTORES E LIDERES</h2>
                    <Input
                          name="name"
                          id="name"
                          label="NOME PASTOR"
                          type="text"
                          required
                        />
                        <InputFile
                          name="pastor_image"
                          id="pastor_image"
                          label="IMAGEM / AVATAR"
                          type="file"
                          required
                        />
                    <div className="acoes">
                      <button
                        type="submit"
                        id="btn-fas-novo"
                        class="btn btn-success"
                      >
                        <i class="fas fa-save"></i>
                        Salvar
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
          <div className="wrapper-pastor">
            {Pastor.length > 0 ? (
              Pastor.map((postPastor) => (
                <div class="card">
                  <div class="img">
                    <img
                      id="imgevent"
                      src={
                        "http://localhost:3333/uploads/images/pastors/" +
                        postPastor.pastor_image
                      }
                      alt="pastor_image"
                    />
                  </div>
                  <div className="content">
                    <div className="title">{postPastor.name}</div>    
                  </div>
                  <div className="btn-acao">
                      <button 
                         id="btn_acoes"
                         class="btn btn-warning btn-xs"    
                            
                        >
                         <i id="fas_acoes" class="fas fa-edit"></i>
                         Editar
                      </button>
                      <button 
                        id="btn_acoes"
                        class="btn btn-danger btn-xs"
                       
                        >
                        <i id="fas_acoes" class="fas fa-trash-alt"></i>
                        Excluir
                      </button>
                    </div>
                </div>
              ))
            ) : (
              <p>Nada encontrado</p>
            )}
          </div>
           {/* ##########    MODAL EDITAR EVENTOS      ########## 
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
                  <h2 id="spring-modal-title"> EDITAR EVENTO </h2>
                  
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
                      onClick={handleCloseEdit}
                      >
                      Voltar
                    </button>
                  </div>
                </Form>
              </div>
            </Fade>
          </Modal>*/}
        </Grid>
      </div>
    </React.Fragment>
  );
}
