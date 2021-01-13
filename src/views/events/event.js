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
import "../../styles/event.css";

export default function Event() {
  //form
  const formRef = useRef(null);
  //get/post
  const [Event, setEvent] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});

      await schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      cadEvent(data);

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

  function cadEvent(dataEvent) {
    let formDataEvent = new FormData();

    formDataEvent.append("description", dataEvent.description);
    formDataEvent.append("event_image", dataEvent.event_image);
    formDataEvent.append("link", dataEvent.link);

    fetch("http://localhost:3333/event", {
      method: "post",
      body: formDataEvent,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEvent() {
    fetch("http://localhost:3333/event")
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setEvent(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getEvent();
  }, []);

  function DeleteEvent(id) {
    fetch("http://localhost:3333/event/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getEvent();
        alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message, "Ooops ouve um erro de conexão");
      });
  }

  function getUrl(path) {
    window.open(path, "_blank");
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
