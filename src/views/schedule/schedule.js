import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/schedule.css";
import CardSchedule from "../../components/cards/Card-Schedule";

import ScheduleContext from "../../components/Contexts/ScheduleContext";
import Pagination from "../../components/pagination/Pagination";
import Posts from "../../components/pagination/Posts";

export default function Schedule() {
  //form
  const formRef = useRef(null);
  const formRefEdit = useRef(null);
  //get/post
  const [schedules, setSchedule] = useState([]);

  //modal
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (schedule) => {
    setOpenEdit(true);

    setTimeout(() => {
      formRefEdit.current.setData({
        day: schedule.day_unformated,
        hour: schedule.hour,
        local: schedule.local,
        description: schedule.description
      });
    }, 100);
  };

  const handleCloseEdit = () => {
    console.log("d")
    setOpenEdit(false);
  };

  async function handleSubmitEdit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});
      await schema.validate(data, { abortEarly: false });
      formRefEdit.current.setErrors({});
      editSchedule(data);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRefEdit.current.setErrors(errorMessages);
      }
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({});
      await schema.validate(data, { abortEarly: false });
      formRef.current.setErrors({});
      cadSchedule(data);
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

  function cadSchedule(dataSchedule) {
    fetch("http://localhost:3333/schedule", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        day: dataSchedule.day,
        hour: dataSchedule.hour,
        local: dataSchedule.local,
        description: dataSchedule.description,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        getSchedule();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSchedule() {
    fetch("http://localhost:3333/schedule")
      .then((response) => response.json())
      .then((response) => {
        response.map(schedule => {
          const date = new Date();

          const year = date.getFullYear();
          const day = schedule.day.split('/');

          const day_unformated = `${year}-${day[1]}-${day[0]}`;

          schedule.day_unformated = day_unformated;
        });

        console.log(response)
        setSchedule(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editSchedule(dataSchedule) {
    fetch("http://localhost:3333/schedule/" + dataSchedule.id ,  {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        day: dataSchedule.dayedit,
        hour: dataSchedule.houredit,
        local: dataSchedule.localedit,
        description: dataSchedule.descriptionedit,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getSchedule();
  }, []);

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
