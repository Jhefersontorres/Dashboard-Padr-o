import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


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
      <Button
        variant="contained"
        color="primary"
        className={classes.secondary}
      >
        Visualizada
        </Button>
    </div>
  );
}
