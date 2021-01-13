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
        <div id="top-bar">
          <i class="fa fa-user-circle"></i>
          <p>Jheferson torres</p>
        </div>

        
      </div>
    </React.Fragment>
  );
}
