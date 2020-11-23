import React, {useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MailIcon from '@material-ui/icons/Mail';

import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function logoff(){
 sessionStorage.clear();
  window.location.href = '/dashboard';
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer'  
  },
  
  menu:{
    
    
  },
  listitens:{
    margin: theme.spacing(0, 8),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    cursor: 'pointer'  
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const[ContMensagen, setContMensagems] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //const handleProfileMenuOpen = (event) => {
    //setAnchorEl(event.currentTarget);
//  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => window.location.href = "/mensagens"}>
        <IconButton aria-label="show 4 new mails" color="inherit" >
          <Badge badgeContent={ContMensagen.length} color="secondary" >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
    </Menu>
  );


  function contMensagem(){
    fetch('http://localhost:3033/mensagens/',{
      method: "GET"
    }).then(response => response.json())
      .then(response => {
          console.log(response)
          setContMensagems(response.data)
      })
        .catch(err => {
          console.log(err)
        })
  }

  useEffect(() => {
    contMensagem();
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography className={classes.title} variant="h6" noWrap onClick={() => window.location.href = "/"}>
           Ecommerce NPD
          </Typography>
          <div className={classes.menu}>
          <ListItem className={classes.listitens}> 
            <ListItemText primary="Dashboard" onClick={() => window.location.href = "/"} />
            <ListItemText primary="Sistemas" onClick={() => window.location.href = "/sistemas"} />
            <ListItemText primary="Prospecção" onClick={() => window.location.href = "/prospeccao"} />
          </ListItem>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton  color="inherit">
              <Badge badgeContent={ContMensagen.length} color="secondary">
                <MailIcon  onClick={() => window.location.href = "/mensagens"} />
              </Badge>
            </IconButton>            
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton  color="inherit">
              <Badge color="secondary">
                <ExitToApp  onClick={() => logoff()} />
              </Badge>
            </IconButton>            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

