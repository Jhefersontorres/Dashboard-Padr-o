import React, { useRef } from 'react';

import { Form } from "@unform/web";
import * as Yup from 'yup';
import Input from "../../components/unform/Input/input";

import logo from "../../images/logo.jpg"

import '../../styles/Signin.css'


export default function LoginUser() {
  
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required("Campo Obrigatorio"),
        password: Yup.string().required("Campo obrigatório")
      });

      await schema.validate(data, { abortEarly: false, });

      formRef.current.setErrors({});

      loginDashboard(data);

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

  function loginDashboard(dataLogin) {
    console.log(dataLogin )
    fetch('http://localhost:3333/user/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: dataLogin.email,
        password: dataLogin.password
      })
    }).then(response => response.json())
      .then(response => {
        if (response.token) {
          console.log("user", response.user)
  
          sessionStorage.setItem("exp", response.exp)
          sessionStorage.setItem("web_token", response.token)
          sessionStorage.setItem("user", JSON.stringify(response.user))
          window.location.href = "/"
        } else {
          alert("Falha na autenticação.")
        }
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <div id="container">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login" >
            <img src={logo}
            alt="qr_code"
            width="100px"
            height="100px"
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-inner">

            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="field">

                <Input
                  type="text"
                  placeholder="email@example.com"
                  name="email"
                  id="email"
                  required
                />
                
              </div>

              <div className="field">

                <Input
                  type="password"
                  placeholder=""
                  name="password"
                  id="password"
                  required
                />
              
              </div>

              <div className="field btn-signin">
                <div className="btn-layer"></div>
                <input type="submit" value="LOGIN" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}



