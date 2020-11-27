import React, { useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from "../unform/Input/input";

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//import '../../styles/'

import ScheduleContext from '../Contexts/ScheduleContext';
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


export default function CardsSchedule({ dataschedules }) {
  const { getSchedule } = useContext(ScheduleContext);

  const formEdit = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({

      });

      await schema.validate(data, { abortEarly: false, });

      formEdit.current.setErrors({});

      editGRemCasa(data);

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
        descricao: dataschedules.descricao,
        especificacoes: dataschedules.especificacoes
      });
    }, 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function editGRemCasa(data) {
    fetch('http://localhost:3333/gr-casa/editar/' + dataschedules.id, {
      method: "PATCH",
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
        getSchedule();
      }).catch(error => {
        console.log(error);
      })
  }

  function deletGRemCasa() {
    console.log('sdad')
    fetch('http://localhost:3333/gr-casa/deletar/' + dataschedules.id, {
      method: "DELETE",
    }).then(response => response.json())
      .then(response => {
        getSchedule();
      }).catch(error => {
        console.log(error.message, 'Ops a algum erro de conexão');
      })
  }

  return (
    <div className="root">
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
                <td>{dataschedules.day}</td>
                <td>{dataschedules.hour}</td>
                <td>{dataschedules.local}</td>
                <td>{dataschedules.description}</td>
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
  );
}

