import React, { useEffect, useState, useRef } from "react";
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


//import CardPostGrcasa from '../../components/cards/Card-GRemCasa'

//import GRemCasaContext from '../../components/Contexts/GRemCasaContext';
//import Pagination from "../../components/pagination/Pagination";
//import Posts from "../../components/pagination/Posts";

import "../../styles/grcasa.css";

export default function Grcasa() {
  //form
  const formRef = useRef(null);
  //get/post
  const [GRCasa, setGrCasa] = useState([]);
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
      const schema = Yup.object().shape({
       
      });

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
    let formDataGrCasa = new FormData();

      formDataGrCasa.append("id_pastor", dataGrCasa.id_pastor);
      formDataGrCasa.append("message", dataGrCasa.message);
      formDataGrCasa.append("material", dataGrCasa.material)

    fetch("http://localhost:3333/gr-casa", {
      method: "POST",
      body: formDataGrCasa,
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
  }, []);

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
                        <h2 id="spring-modal-title">
                          {" "}
                          CADASTRO POTS GR EM CASA{" "}
                        </h2>
                        <Input
                          name="id_pastor"
                          id="id_pastor"
                          label="PASTOR"
                          type="text"
                          required
                        />
                        <Input
                          name="message"
                          id="message"
                          label="MENSSAGEM"
                          type="text"
                          required
                        />
                        <InputFile
                          name=" material"
                          id=" material"
                          label="ARQUIVO PDF"
                          type="file"
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
        <div id="cards-grcasa-views">
          {GRCasa.length > 0 ? (
            GRCasa.map((postGrcasa) => (
              <div id="list" class="row">
                <div class="table-responsive col-md-12">
                  <table
                    class="table table-striped"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <thead>
                      <tr>
                        <th>Pastor</th>
                        <th>Messagem</th>
                        <th>Arquivo</th>
                        <th class="actions">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={
                              "http://localhost:3333/uploads/images/pastors/" +
                              postGrcasa.pastor_image
                            }
                            alt="pastor_image"
                            width="100px"
                            height="100px"
                            style={{ borderRadius: "50%" }}
                          />
                          {postGrcasa.name}
                        </td>
                        <td width="350">{postGrcasa.message}</td>
                        <td>
                          <a
                            class="btn btn-success btn-xs"
                            href="#"
                            onClick={() =>
                              getUrlPdf(
                                "http://localhost:3333/uploads/images/gr_casa/" +
                                  postGrcasa.document_src
                              )
                            }
                            file={
                              "http://localhost:3333/uploads/images/gr_casa/" +
                              postGrcasa.document_src
                            }
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
                            onClick={() => DeleteGrCasa(postGrcasa.id)}
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
