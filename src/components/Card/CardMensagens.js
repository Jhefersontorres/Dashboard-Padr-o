import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import '../Styles/stylesMensagem.css'


export default function cardMensagens({ props }) {

  function   previewMessage(){
  
    fetch('http://localhost:3033/mensagens/visualizado/' + props.id,{
      method:"DELETE"
    }).then(response => response.json())
      .then(response => {
        window.location.reload();
        console.log(response);
      }).catch(error => {
        console.log(error.message, 'Ops a algum erro de conexão');
      })
  }

  return (
    <div className="Posts_rootme">
      <Paper className="Posts_paper">
        <div className="Posts_itemContainer">
          <div className="conteudo">
          <div className="Posts_baseline_Mensag">
                <div className="Posts_inline_Mensag">
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                  >
                    Nome
                  </Typography>
                  <Typography >
                    {props.nome}
                  </Typography>
                </div>
                </div>
                <div className="Posts_baseline_Mensag">
                <div className="Posts_inline_Mensag">
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                  >
                    E-mail
                  </Typography>
                  <Typography >
                    {props.email}
                  </Typography>
                </div>
          </div>
          <div className="Posts_baseline_Mensag">
            <div className="Posts_inline_Mensag">
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
              >
                Assunto
              </Typography>
              <Typography >
                {props.assunto}
              </Typography>
            </div>
          </div>
          </div>
          <div className="Posts_baseline_Mensag2">
            <div className="text_inline_Mensag2">
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
              >
                 Mensagem
              </Typography>
              <Typography>
                {props.mensagem}
              </Typography>
            </div>
          </div>


          <div className="Posts_Buttons">
            <Button
              variant="contained"
              color="primary"             
              onClick={() => previewMessage()}
            >
              Marcar com lida
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}



