import React, { useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from "../../components/Inputs/input";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../Styles/Styles_Sistemas.css'

import SystemContext from '../../components/Contexts/SystemContext';
//import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '1024px',
    Height: '70%'
  },
  form: {
    display: 'Grid',
    '& > *': {
      margin: theme.spacing(1),
    },

  },

  primary: {


  },
  secondary: {
    background: theme.secondary,
    color: 'white',
    marginLeft: 12
  },
  spaceTop: {
    marginTop: 20,
  },

  button: {
    margin: theme.spacing(2)
  },
}));


export default function Cards({ details }) {
  const { getSistemas } = useContext(SystemContext);

  const formEdit = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
  
      });

      await schema.validate(data, { abortEarly: false, });

      formEdit.current.setErrors({});

      editSistym(data);

      reset(); 
    }
    catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formEdit.current.setErrors(errorMessages);
      }
    }
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);

    setTimeout(() => {
      formEdit.current.setData({
        descricao: details.descricao,
        especificacoes: details.especificacoes
      });
    }, 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function editSistym(data){
    fetch('http://localhost:3033/sistemas/editar/' + details.id, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        descricao: data.descricao,
        especificacoes: data.especificacoes
      })
    }).then(response => response.json())
      .then(response => {
        handleClose();
        getSistemas();
      }).catch(error => {
        console.log(error);
      })
  }

  function deletSistym(){
    console.log('sdad')
    fetch('http://localhost:3033/sistemas/deletar/' + details.id, {
      method:"DELETE",
    }).then(response => response.json())
      .then(response => {
        getSistemas();
      }).catch(error => {
        console.log(error.message, 'Ops a algum erro de conexão');
      })
  }

  return (
    <div className="root">
      <Paper className="paper" elevation={3} >
        <div className="itemContainer">
          <div className="baseline">
            <div className="inline">
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
              >
                  Descrição
              </Typography>
              <Typography >
                {details.descricao}
              </Typography>
            </div>
            <div className="inline">
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
              >
                  Especificação
              </Typography>
              <Typography >
                 {details.especificacoes}
              </Typography>
            </div>
          </div>
          <div className="Buttons">
            <div className={classes.spaceTop}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.primary}
                onClick={() => deletSistym() }
                >
                  Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.secondary}
                onClick={handleOpen}
                >
                  Editar
              </Button>



              {/* ############# Modal criado para editar os cadastros sistemas  ############# */}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 700,
                }}>

                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="spring-modal-title">EDITAR CADASTRO DE SISTEMA</h2>
                    <Form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}  ref={formEdit}>
                        <Input type="text" name="descricao" id="descricao" label="DESCRIÇÃO"/>
                        <Input type="text" name="especificacoes" id="especificacoes" label="ESPECIFICAÇÕES" />
                    </Form>
                    <div className={classes.spaceTop}>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.secondary}
                        type="submit"
                        onClick={() => formEdit.current.submitForm()}
                      >
                          salvar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.secondary}
                        onClick={handleClose}
                        BackdropProps={{
                          timeout: 700,
                        }}
                      >
                         Voltar
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

