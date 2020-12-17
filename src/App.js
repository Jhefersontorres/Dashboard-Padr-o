import React, { useEffect, useState } from 'react';
import Login from './views/signin/SignIn';
import Routes from './routes'
//import './App.css';

function App() {
 const [logged, setLogged] = useState();

  useEffect(() => {
    if (sessionStorage.getItem('web_token')) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <>
      {
        logged ? <Routes /> : <Login />
      }
    </>
  );
}

export default App;
