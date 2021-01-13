import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/unform/Input/input";
import InputFile from "../../components/unform/InputFile/fileinput";

import SideBar from "../../components/sidebar/sidebar";
import "../../styles/bank.css";

export default function Bank() {
  const formRef = useRef(null);
  const formEdit = useRef(null);
  const [Bank, setBank] = useState([]);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
     setInterval(() => {
        formEdit.current.setData({
          bank: Bank.bank,
          agency: Bank.agency,
          account: Bank.account
        })
      }, 1);
    
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object()
      .shape({
            });

      schema.validate(data, { abortEarly: false });

      formEdit.current.setErrors({});

      cadBank(data);

      reset();
    } 
    catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
          err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formEdit.current.setErrors(errorMessages);
      }
    }
  }

  function cadBank(dataBank) {
    let formDataBank = new FormData();

    formDataBank.append("bank", dataBank.bank);
    formDataBank.append("agency", dataBank.agency);
    formDataBank.append("account", dataBank.account);
    formDataBank.append("qr_code", dataBank.qr_code);

    fetch("http://localhost:3333/bank", {
      method: "PATCH",
      body: formDataBank,
    })
      .then((response) => response.json())
      .then((response) => {
          
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBank() {
    fetch("http://localhost:3333/bank", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBank(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBank();
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
