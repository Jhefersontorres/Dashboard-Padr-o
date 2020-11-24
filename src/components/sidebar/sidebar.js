import React from "react";
import '../../styles/sidebar.css'

export default function sidebar() {
  return (
    <div>
      <input type="checkbox" id="check" />
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
      <div class="sidebar">
        <header>Aliança IPR</header>
        <a href="/" class="active">
          <i class="fas fa-qrcode"></i>
          <span>Dashboard</span>
        </a>
        <a href="/gr_em_casa">
          <i class="fas fa-link"></i>
          <span>GR em Casa</span>
        </a>
        <a href="/agenda">
          <i class="fa fa-address-book"></i>
          <span>Agenda</span>
        </a>
        <a href="/evento">
          <i class="fa fa-calendar" aria-hidden="true"></i>
          <span>Eventos</span>
        </a>
        <a href="/pastores">
          <i class="far fa-question-circle"></i>
          <span>Pastores</span>
        </a>
        <a href="/contas">
          <i class="fa fa-money" aria-hidden="true"></i>
          <span>Contas</span>
        </a>
        <a href="/usuarios">
          <i class="fa fa-user-circle"></i>
          <span>Perfil</span>
        </a>
      </div>
    </div>
  );
}
