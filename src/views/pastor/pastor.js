import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from '../../components/unform/Input/input';
import InputFile from '../../components/unform/InputFile/fileinput';

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/pastor.css";

export default function Pastor() {
  //form
  const formRef = useRef(null);
  //get/post
  const [Pastor, setPastor] = useState([])

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

      cadPastores(data);

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


  function cadPastores(dataPastor) {
    console.log(dataPastor);
    let formData = new FormData();
    
    formData.append("name", dataPastor.name)
    formData.append("pastor_image", dataPastor.pastor_image)

    fetch('http://localhost:3333/pastor', {
      method: "post",
      body: formData
    }).then(response => response.json())
      .then(response => {
        
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }


  function getPastor() {
    fetch('http://localhost:3333/pastor', {
      method: "GET"
    }).then(response => response.json())
      .then(response => {

        console.log(response)

        setPastor(response);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getPastor();
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
                  <span> PASTORES </span>
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
                        <h2 id="spring-modal-title">CADASTRO DE PASTORES</h2>
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
                    {
                      Pastor.length > 0 ?
                        Pastor.map(postPastor => (
                          <div id="list" class="row" key={postPastor.id}>
                            <div class="table-responsive col-md-12">
                              <table class="table table-striped" cellspacing="0" cellpadding="0">
                                <thead>
                                  <tr>
                                    <th>Nome</th>
                                    <th>Imagem / Avatar </th>
                                    <th class="actions">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                    
                                  <tr>
                                    <td>{postPastor.name}</td>
                                    <td>
                                      <img 
                                        src={"http://localhost:3333/uploads/images/pastors/" + postPastor.pastor_image}
                                        alt="pastor_image"
                                        width="100px"
                                        height="100px"
                                        style={{ borderRadius: '50%' }}
                                      />
                                    </td>
                                    
                                    <td class="actions">
                                      <a class="btn btn-success btn-xs" href="#">Visualizar</a>
                                      <a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
                                      <a class="btn btn-danger btn-xs" href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>
                                    </td>
                                  </tr>
                    
                                </tbody>
                              </table>
                    
                            </div>
                          </div> 
                        ))
                      : (<p>Nada encontrado</p>)
                    }
                </div>
              </Paper>


            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
