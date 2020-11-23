import React, { useState ,useEffect ,useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ScreenShareRoundedIcon from '@material-ui/icons/ScreenShareRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ProspectionContext from '../../components/Contexts/ProspectionContext';

import '../Styles/stylesProspeccao.css'



export default function CardProspeccao ({props}) {
  const [descStatus, setStatus] = useState('');

  useEffect(() => {
    switch (props.status) {
      case 1: 
        setStatus("Em Prospecção");
        break;
      case 2: 
        setStatus("Em Negociação");
        break;
      case 3: 
        setStatus("Contrado fechado");
        break;
      default: 
        setStatus("Indefinido");
        break;
    }
  }, [props.status]);

  const { getProspeccao } = useContext(ProspectionContext);

  function negociaProsp(){
    fetch('http://localhost:3033/prospeccao/negociacao/' + props.id, {
      method:"PATCH",
      body: JSON.stringify({
      })
    }).then(response => response.json())
      .then(response => {
        getProspeccao();
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }

  function fechadoProsp(){
    fetch('http://localhost:3033/prospeccao/contrato/' + props.id, {
      method:"PATCH",
      body: JSON.stringify({
      })
    }).then(response => response.json())
      .then(response => {
        getProspeccao();
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }

 function deletProsp(){
  fetch('http://localhost:3033/prospeccao/deletar/' + props.id, {
    method:"DELETE",
  }).then(response => response.json())
    .then(response => {
      getProspeccao();
      console.log(response);
    }).catch(error => {
      console.log(error);
    })

} 

return (
      <div className="Prospec_root">
        <Paper className="Prospec_paper">
          <div className="Prospec_itemContainer">
            <div className="Prospec">
              <div id="one">
              <div className="Prospec_inline">
                <Typography  color='primary'>
                  CLIENTE
                </Typography>
                <Typography id="cliente" >
                  {props.cliente}
                </Typography>
              </div>
              <div className="Prospec_inline">
                <Typography  color='primary'>
                  FONE
                </Typography>
                <Typography >
                  {props.fone}
                </Typography>
              </div>
              </div>
              <div id="two">
              <div className="Prospec_inline">
                <Typography color='primary'>
                  SISTEMAS
                </Typography>
                <Typography >
                  {props.sistema}
                </Typography>
              </div>
              </div>
              <div id="two">
              <div className="Prospec_inline">
                <Typography color='primary'>
                  STATUS
                </Typography>
                <Typography >
                  {descStatus}
                </Typography>
              </div>
              </div>
            </div>
            <div className="Prospec_Buttons">

            <Button 
              disabled={props.status === 1 ? false : true}
              variant="outlined" 
              size="small" 
              color="primary" 
              alt="exlcuir"
              startIcon={
                <ScreenShareRoundedIcon />
              }
              onClick={() => negociaProsp()}
            >
              Em negociação
            </Button>

            <Button 
              disabled={props.status === 3 && props.status !== 1 && props.status !== 2 ? true : false}
              variant="outlined" 
              size="small" 
              color="primary" 
              alt="exlcuir"
              startIcon={
                <AddShoppingCartRoundedIcon />
              }
              onClick={() => fechadoProsp()}
            >
              Contrato fechado
            </Button>

            <Button
              variant="outlined" 
              size="small" 
              color="primary" 
              startIcon={
                <DeleteRoundedIcon />
              }
              onClick={() => deletProsp()}
            >
              excluir
            </Button>

            </div>
          </div>
        </Paper>
      </div>
    );
  };


