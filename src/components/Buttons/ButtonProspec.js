import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import AvTimerRoundedIcon from '@material-ui/icons/AvTimerRounded';
import ScreenShareRoundedIcon from '@material-ui/icons/ScreenShareRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const useStyles = makeStyles((theme) => ({

  primary: {
    marginRight: 2
  },
  secondary: {
    background: theme.secondary,
    color: 'white'
  },
  spaceTop: {
    marginTop: 20
  }
}));

export default function ButtonCardProspeccao() {

  const classes = useStyles();

  return (
    <div className={classes.spaceTop}>
      <IconButton
        aria-label="delete"
        variant="contained">
         <DeleteRoundedIcon/>
      </IconButton>
      <IconButton
        aria-label="delete"
        variant="contained">
         <AvTimerRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        variant="contained">
        <ScreenShareRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        variant="contained">
        <AddShoppingCartRoundedIcon />
      </IconButton>


    </div>
  );
}
