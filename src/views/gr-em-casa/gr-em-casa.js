import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import SideBar from "../../components/sidebar/sidebar";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from '../../components/unform/Input/input';

import CardPostGrcasa from '../../components/cards/Card-GRemCasa'

import GRemCasaContext from '../../components/Contexts/GRemCasaContext';
import Pagination from "../../components/pagination/Pagination";
import Posts from "../../components/pagination/Posts";

import "../../styles/grcasa.css";


export default function Grcasa() {
  //pagination
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  //form
  const formRef = useRef(null);
  //get/post
  const [GRCasa, setGrCasa] = useState([])

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

      cadGrCasa(data);

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

  function cadGrCasa(dataGrCasa) {
    fetch('', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({
        descricao: dataGrCasa.descricao,
        especificacoes: dataGrCasa.especificacao
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


  function getGrCasa() {
    fetch('http://localhost:3333/gr-casa', {
      method: "GET"
    }).then(response => response.json())
      .then(response => {

        console.log(response)

        setGrCasa(response.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getGrCasa();
    setLoading(true);
    setLoading(false);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = GRCasa.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
                  <span>GR EM CASA </span>
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
                        <h2 id="spring-modal-title">CADASTRO POTS GR EM CASA</h2>
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
                          <button type="submit">
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
              <Paper>
                <div classname="cards-views">
                  
                  
                    
                      <div id="list" class="row">

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
              
                            <tr>
                              <td>20/112002</td>
                              <td>20:00</td>
                              <td>IPR central</td>
                              <td>culto de celebração</td>
                              <td class="actions">
                                <a class="btn btn-success btn-xs" href="view.html">Visualizar</a>
                                <a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
                                <a class="btn btn-danger btn-xs" href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>
                              </td>
                            </tr>
              
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
