import React from "react";
import {BrowserRouter, Switch, Route, Router} from "react-router-dom";
import {createBrowserHistory} from "history";

import Main from './views/main/Main'
import Login from './views/signin/SignIn'

const customHistory = createBrowserHistory();

export default function Routes (){ 
return(
    <BrowserRouter>
        <Switch>
            <Router history={customHistory} >
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login}/>
            </Router>
        </Switch>
    </BrowserRouter>
);
};