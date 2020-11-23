import React, { useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from "../../components/Inputs/input";

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';


import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
  formedit: {
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

export default function ButtonCardSistemas() {

  const formRef = useRef(null);
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 





  return (
  );
}





